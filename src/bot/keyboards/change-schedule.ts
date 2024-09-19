import { InlineKeyboard } from 'grammy'
import { changeScheduleTypeData } from '#root/bot/callback-data/change-schedule.js'
import type { Context } from '#root/bot/context.js'

export function createPreliminaryScheduleKeyboard(ctx: Context) {
  return InlineKeyboard.from(
    [
      [
        {
          text: ctx.t('schedule.preliminary'),
          callback_data: changeScheduleTypeData.pack({ type: 'preliminary' }),

        },
      ],
    ],
  )
}

export function createCurrentScheduleKeyboard(ctx: Context) {
  return InlineKeyboard.from(
    [
      [
        {
          text: ctx.t('schedule.current'),
          callback_data: changeScheduleTypeData.pack({ type: 'current' }),
        },
      ],
    ],
  )
}
