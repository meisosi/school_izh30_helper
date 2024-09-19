import { InlineKeyboard } from 'grammy'
import { getLunchesListInfoData } from '#root/bot/callback-data/lunches.js'
import type { Context } from '#root/bot/context.js'

export function createLunchesListKeyboard(ctx: Context) {
  const now = new Date()
  const hours = now.getHours()

  if (hours >= 9) {
    now.setDate(now.getDate() + 1)
  }

  const day = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const year = now.getFullYear()
  return InlineKeyboard.from(
    [
      [
        {
          text: ctx.t('lunch-buttons.list'),
          callback_data: getLunchesListInfoData.pack({ data: `${day}.${month}.${year}` }),

        },
      ],
    ],
  )
}
