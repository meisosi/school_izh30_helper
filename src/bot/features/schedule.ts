import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { getGoogleSheetsContent } from '#root/bot/helpers/google.js'
import { createCurrentScheduleKeyboard, createPreliminaryScheduleKeyboard } from '#root/bot/keyboards/change-schedule.js'
import { changeScheduleTypeData } from '#root/bot/callback-data/change-schedule.js'
import { isBetaTester } from '#root/bot/filters/is-beta.js'

const SHEET_ID = '1hnxbeX7YvlUsRRGjw8BxxktWBFc3BHeNgj3sJSamZbw'

const composer = new Composer<Context>()

const feature = composer.chatType('private').filter(ctx => isBetaTester(ctx.config.betaTesters)(ctx))

feature.command('schedule', logHandle('command-schedule'), async (ctx) => {
  const replyMsg = await ctx.reply(ctx.t('schedule.fetch'))
  const schedule = await getGoogleSheetsContent(SHEET_ID)
  if (!schedule) {
    return ctx.reply(ctx.t('schedule.fetch-error'))
  }
  else {
    // const _scheduleImage = await createScheduleCanvas(schedule)
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth() + 1
    return replyMsg.editText(ctx.t('schedule.current-fetched', { day: currentDay, month: currentMonth }), {
      reply_markup: await createPreliminaryScheduleKeyboard(ctx),
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
      const schedule = await getGoogleSheetsContent(SHEET_ID)
      ctx.answerCallbackQuery()
      if (!schedule) {
        return ctx.reply(ctx.t('schedule.fetch-error'))
      }
      else {
        return ctx.editMessageText(ctx.t('schedule.preliminary-fetched'), {
          reply_markup: await createCurrentScheduleKeyboard(ctx),
        })
      }
    }

    else {
      const schedule = await getGoogleSheetsContent(SHEET_ID)
      ctx.answerCallbackQuery()
      if (!schedule) {
        return ctx.reply(ctx.t('schedule.fetch-error'))
      }
      else {
        // const _scheduleImage = await createScheduleCanvas(schedule)
        const currentDay = new Date().getDate()
        const currentMonth = new Date().getMonth() + 1
        return ctx.editMessageText(ctx.t('schedule.current-fetched', { day: currentDay, month: currentMonth }), {
          reply_markup: await createPreliminaryScheduleKeyboard(ctx),
        })
      }
    }
  },
)

export { composer as scheduleFeature }
