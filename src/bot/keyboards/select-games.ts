import { InlineKeyboard } from 'grammy'
import { selectTicTakTypeData, selectTikTakGameData } from '#root/bot/callback-data/select-game.js'
import type { Context } from '#root/bot/context.js'

export function createSelectGamesKeyboard(ctx: Context) {
  return InlineKeyboard.from(
    [
      [
        {
          text: ctx.t('tik-tak.title'),
          callback_data: selectTikTakGameData.pack({}),
        },
      ],
    ],
  )
}

export function createSelectTikTakTypeKeyboard(ctx: Context) {
  return InlineKeyboard.from(
    [
      [
        {
          text: ctx.t('tik-tak.single-player'),
          callback_data: selectTicTakTypeData.pack({ type: 'computer' }),
        },
        {
          text: ctx.t('tik-tak.multiplayer'),
          callback_data: selectTicTakTypeData.pack({ type: 'player' }),
        },
      ],
    ],
  )
}
