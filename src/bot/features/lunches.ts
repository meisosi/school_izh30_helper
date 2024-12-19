import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { isLunchMaster } from '#root/bot/filters/is-lunchmaster.js'
import { lunchDay } from '#root/bot/helpers/lunch.js'

const composer = new Composer<Context>()

const feature = composer.chatType('supergroup').filter(ctx => isLunchMaster(ctx.config.lunchMasters)(ctx))

feature.command('lunch', logHandle('command-lunch'), async (ctx) => {
  const today = lunchDay()
  await ctx.replyWithPoll(ctx.t('lunch.question', { today }), [
    {
      text: ctx.t('lunch.with-baking'),
    },
    {
      text: ctx.t('lunch.with-soup'),
    },
    {
      text: ctx.t('lunch.watch'),
    },
  ], { is_anonymous: false, protect_content: true, message_thread_id: ctx.message.message_thread_id,
  })

  return ctx.deleteMessage()
})

export { composer as lunchFeature }
