import { InlineKeyboard } from 'grammy'
import ISO6391 from 'iso-639-1'
import { changeScheduleTypeData } from '#root/bot/callback-data/change-schedule.js'
import type { Context } from '#root/bot/context.js'

export async function createPreliminaryScheduleKeyboard(ctx: Context) {
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

export async function createCurrentScheduleKeyboard(ctx: Context) {
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
