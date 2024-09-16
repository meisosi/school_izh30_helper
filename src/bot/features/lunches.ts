import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { isLunchMaster } from '#root/bot/filters/is-lunchmaster.js'

const composer = new Composer<Context>()

const feature = composer.chatType('supergroup').filter(ctx => isLunchMaster(ctx.config.lunchMasters)(ctx))

feature.command('lunch', logHandle('command-lunch'), async (ctx) => {
  ctx.replyWithPoll(ctx.t('lunch.question'), [
    {
      text: ctx.t('lunch.with-soup'),
    },
    {
      text: ctx.t('lunch.with-baking'),
    },
    {
      text: ctx.t('lunch.watch'),
    },
  ])
  return ctx.deleteMessage()
})

export { composer as lunchFeature }
