import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { lunchAppointment } from '#root/bot/helpers/lunch.js'

const composer = new Composer<Context>()

const feature = composer.chatType('supergroup')

feature.on('poll_answer', logHandle('poll-answer'), async (ctx: Context) => {
  if (ctx.pollAnswer === undefined)
    return undefined

  if (ctx.session.pools?.includes(ctx.pollAnswer.poll_id)) {
    const lunchUser = lunchAppointment(ctx.pollAnswer)
    if (lunchUser === undefined)
      return undefined
  }
})

export { composer as poolsFeature }
