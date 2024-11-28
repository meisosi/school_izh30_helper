import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { getGoogleSheetsContent } from '#root/bot/helpers/google.js'
import { createCurrentScheduleKeyboard, createPreliminaryScheduleKeyboard } from '#root/bot/keyboards/change-schedule.js'
import { changeScheduleTypeData } from '#root/bot/callback-data/change-schedule.js'
import { createLessonsTxt } from '#root/bot/helpers/schedule.js'

const SHEET_ID = '1QLiuBr4fIylcYXjvn1lGbMUqK5L-3CY4cfxtwaL1lY0'
const ELEVEN_B_CURRENT = 'N29:O37'

const composer = new Composer<Context>()

const feature = composer

feature.command('schedule', logHandle('command-schedule'), async (ctx) => {
  if (ctx.message === undefined) {
    return ctx.reply(ctx.t('schedule.fetch-error'))
  }
  const msgThread = ctx.message.message_thread_id
  const replyMsg = await ctx.reply(ctx.t('schedule.fetch'), {
    message_thread_id: msgThread,
  })
  const schedule = await getGoogleSheetsContent(SHEET_ID, ELEVEN_B_CURRENT)
  if (!schedule) {
    return ctx.reply(ctx.t('schedule.fetch-error'), {
      message_thread_id: msgThread,
    })
  }
  else {
    const grade = schedule[0][0]
    const scheduleText = createLessonsTxt(ctx, schedule)
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth() + 1
    return replyMsg.editText(ctx.t('schedule.current-fetched', { day: currentDay, month: currentMonth, grade, lessons: scheduleText }), {
      reply_markup: createPreliminaryScheduleKeyboard(ctx),
    })
  }
})

feature.callbackQuery(
  changeScheduleTypeData.filter(),
  logHandle('keyboard-schedule.select'),
  async (ctx) => {
    const { type: scheduleType } = changeScheduleTypeData.unpack(
      ctx.callbackQuery.data,
    )
    if (scheduleType === 'preliminary') {
      const schedule = await getGoogleSheetsContent(SHEET_ID, 'N29:O37')
      ctx.answerCallbackQuery()
      if (!schedule) {
        return ctx.reply(ctx.t('schedule.fetch-error'))
      }
      else {
        return ctx.editMessageText(ctx.t('schedule.preliminary-fetched'), {
          reply_markup: createCurrentScheduleKeyboard(ctx),
        })
      }
    }

    else {
      const schedule = await getGoogleSheetsContent(SHEET_ID, ELEVEN_B_CURRENT)
      if (!schedule) {
        return ctx.editMessageText(ctx.t('schedule.fetch-error'))
      }
      else {
        const grade = schedule[0][0]
        const scheduleText = createLessonsTxt(ctx, schedule)
        const currentDay = new Date().getDate()
        const currentMonth = new Date().getMonth() + 1
        return ctx.editMessageText(ctx.t('schedule.current-fetched', { day: currentDay, month: currentMonth, grade, lessons: scheduleText }), {
          reply_markup: createPreliminaryScheduleKeyboard(ctx),
        })
      }
    }
  },
)

export { composer as scheduleFeature }
