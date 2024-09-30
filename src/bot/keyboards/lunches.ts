import { InlineKeyboard } from 'grammy'
import { getLunchesListInfoData } from '#root/bot/callback-data/lunches.js'
import type { Context } from '#root/bot/context.js'
import { lunchDay } from '#root/bot/helpers/lunch.js'

export function createLunchesListKeyboard(ctx: Context) {
  return InlineKeyboard.from(
    [
      [
        {
          text: ctx.t('lunch-buttons.list'),
          callback_data: getLunchesListInfoData.pack({ data: lunchDay() }),

        },
      ],
    ],
  )
}
