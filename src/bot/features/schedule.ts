import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { getGoogleSheetsContent } from '#root/bot/helpers/google.js'
import { createCurrentScheduleKeyboard, createPreliminaryScheduleKeyboard } from '#root/bot/keyboards/change-schedule.js'
import { changeScheduleTypeData } from '#root/bot/callback-data/change-schedule.js'
import { createLessonsTxt, getScheduleForGrade } from '#root/bot/helpers/schedule.js'

const SHEET_ID = '1QLiuBr4fIylcYXjvn1lGbMUqK5L-3CY4cfxtwaL1lY0'
const CURRENT = 'A1:O40'
const PRELIMINARY = 'P1:AZ40'
const GRADE = '11в'

const composer = new Composer<Context>()

const feature = composer

feature.command('schedule', logHandle('command-schedule'), async (ctx) => {
  if (ctx.message === undefined) {
    return ctx.deleteMessage()
  }
  const msgThread = ctx.message.message_thread_id
  const replyMsg = await ctx.reply(ctx.t('schedule.fetch'), {
    message_thread_id: msgThread,
  })

  const schedule = await getGoogleSheetsContent(SHEET_ID, CURRENT)

  if (!schedule) {
    ctx.reply(ctx.t('schedule.fetch-error'), {
      message_thread_id: msgThread,
    })
    return ctx.deleteMessage()
  }
  else {
    const grade = GRADE
    const currentDay = schedule[0][schedule[0].length - 1]
    const scheduleGrade = getScheduleForGrade(schedule, GRADE)
    const scheduleText = createLessonsTxt(ctx, scheduleGrade, 'current')
    replyMsg.editText(ctx.t('schedule.fetched', { day: currentDay, grade, lessons: scheduleText }), {
      reply_markup: createPreliminaryScheduleKeyboard(ctx),
    })
    return ctx.deleteMessage()
  }
})

feature.callbackQuery(
  changeScheduleTypeData.filter(),
  logHandle('keyboard-schedule.select'),
  async (ctx) => {
    const { type: scheduleType } = changeScheduleTypeData.unpack(
      ctx.callbackQuery.data,
    )
    if (scheduleType !== 'preliminary' && scheduleType !== 'current') {
      return ctx.answerCallbackQuery(ctx.t('schedule.invalid-schedule-type'))
    }
    const schedule = await getGoogleSheetsContent(SHEET_ID, (scheduleType === 'preliminary') ? PRELIMINARY : CURRENT)
    ctx.answerCallbackQuery()
    if (!schedule) {
      return ctx.reply(ctx.t('schedule.fetch-error'))
    }
    else {
      const grade = GRADE
      const currentDay = schedule[0][schedule[0].length - 1]
      const scheduleGrade = getScheduleForGrade(schedule, GRADE)
      const scheduleText = createLessonsTxt(ctx, scheduleGrade, scheduleType)
      return ctx.editMessageText(ctx.t('schedule.fetched', { day: currentDay, grade, lessons: scheduleText }), {
        reply_markup: (scheduleType === 'preliminary') ? createCurrentScheduleKeyboard(ctx) : createPreliminaryScheduleKeyboard(ctx),
      })
    }
  },
)

export { composer as scheduleFeature }
