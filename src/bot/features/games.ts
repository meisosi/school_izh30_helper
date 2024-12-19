import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { isBetaTester } from '#root/bot/filters/is-beta.js'
import { selectTicTakTypeData, selectTikTakGameData } from '#root/bot/callback-data/select-game.js'
import { createSelectGamesKeyboard, createSelectTikTakTypeKeyboard } from '#root/bot/keyboards/select-games.js'

const composer = new Composer<Context>()

const feature = composer.filter(ctx => isBetaTester(ctx.config.betaTesters)(ctx))

feature.command('games', logHandle('command-game'), async (ctx) => {
  return ctx.reply(ctx.t('games.main'), { reply_markup: createSelectGamesKeyboard(ctx), message_thread_id: ctx.message?.message_thread_id })
})

feature.callbackQuery(
  selectTikTakGameData.filter(),
  logHandle('keyboard-tik-tak-game-select'),
  async (ctx) => {
    ctx.editMessageText(ctx.t('tik-tak.description'), { reply_markup: createSelectTikTakTypeKeyboard(ctx) })
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
  },
)

export { composer as gamesFeature }
