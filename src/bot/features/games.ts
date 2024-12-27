import { Composer } from 'grammy'
import { TicTacToe } from '#root/bot/helpers/games/tic-tac-toe.js'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { isBetaTester } from '#root/bot/filters/is-beta.js'
import { selectTicTakTypeData, selectTikTakGameData } from '#root/bot/callback-data/select-game.js'
import { createSelectGamesKeyboard, createSelectTikTakTypeKeyboard } from '#root/bot/keyboards/select-games.js'
import { selectTicTakSellData } from '#root/bot/callback-data/play-games.js'
import type { TicTacToeTypes } from '#root/bot/helpers/types/index.js'

const composer = new Composer<Context>()
const games = new Map<string, TicTacToe>()

const feature = composer

feature.command('games', logHandle('command-game'), async (ctx) => {
  await ctx.reply(ctx.t('games.main'), {
    reply_markup: createSelectGamesKeyboard(ctx),
    message_thread_id: ctx.message?.message_thread_id,
  })
  return ctx.deleteMessage()
})

feature.callbackQuery(
  selectTikTakGameData.filter(),
  logHandle('keyboard-tik-tak-game-select'),
  async (ctx) => {
    ctx.editMessageText(ctx.t('tik-tak.description'), {
      reply_markup: createSelectTikTakTypeKeyboard(ctx),
    })
  },
)

feature.callbackQuery(
  selectTicTakTypeData.filter(),
  logHandle('keyboard-tik-tak-type-select'),
  async (ctx) => {
    const { type: tikTakType } = selectTicTakTypeData.unpack(
      ctx.callbackQuery.data,
    )

    if (tikTakType !== 'computer' && tikTakType !== 'player') {
      return ctx.answerCallbackQuery(ctx.t('tik-tak.invalid-game-type'))
    }

    const firstPlayer: TicTacToeTypes.TicTakPlayer = {
      id: ctx.from.id,
      name: ctx.from.first_name,
      symbol: 'X',
    }

    if (tikTakType === 'computer') {
      const computerPlayer: TicTacToeTypes.TicTakPlayer = {
        id: 0,
        name: ctx.t('tik-tak.computer'),
        symbol: 'O',
      }
      const game = new TicTacToe([firstPlayer, computerPlayer])
      const gameState = game.getState()
      games.set(gameState.gameId, game)

      return await ctx.editMessageText(ctx.t('tik-tak.on-play', {
        player1: gameState.players[0].name,
        player2: gameState.players[1].name,
        current: gameState.currentPlayer.name,
      }), {
        reply_markup: game.generateBoardKeyboard(),
      })
    }
    else {
      await ctx.editMessageText(ctx.t('tik-tak.on-beta'))
    }
  },
)

feature.callbackQuery(
  selectTicTakSellData.filter(),
  logHandle('keyboard-tik-tak-select'),
  async (ctx) => {
    const { gameId, row, col } = selectTicTakSellData.unpack(ctx.callbackQuery.data)

    const game = games.get(gameId)
    if (!game)
      return ctx.answerCallbackQuery(ctx.t('tik-tak.data-lost'))

    if (game.makeMove(row, col, ctx.from.id)) {
      const gameState = game.getState()
      if (gameState.gameEnd) {
        if (gameState.winner === null) {
          await ctx.editMessageText(ctx.t('tik-tak.draw', {
            player1: gameState.players[0].name,
            player2: gameState.players[1].name,
          }), {
            reply_markup: game.generateBoardKeyboard(),
          })
        }
        else {
          await ctx.editMessageText(ctx.t('tik-tak.winner', { winner: gameState.winner.name }), {
            reply_markup: game.generateBoardKeyboard(),
          })
        }
        games.delete(gameId)
        return
      }
      return await ctx.editMessageText(ctx.t('tik-tak.on-play', {
        player1: gameState.players[0].name,
        player2: gameState.players[1].name,
        current: gameState.currentPlayer.name,
      }), {
        reply_markup: game.generateBoardKeyboard(),
      })
    }
    else {
      return await ctx.answerCallbackQuery(ctx.t('tik-tak.invalid-move'))
    }
  },
)

export { composer as gamesFeature }
