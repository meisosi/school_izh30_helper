import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { isLunchMaster } from '#root/bot/filters/is-lunchmaster.js'
import { getLunchesListInfoData } from '#root/bot/callback-data/lunches.js'
import { createLunchesListKeyboard } from '#root/bot/keyboards/lunches.js'

const composer = new Composer<Context>()

const feature = composer.chatType('supergroup').filter(ctx => isLunchMaster(ctx.config.lunchMasters)(ctx))

feature.command('lunch', logHandle('command-lunch'), async (ctx) => {
  await ctx.replyWithPoll(ctx.t('lunch.question'), [
    {
      text: ctx.t('lunch.with-baking'),
    },
    {
      text: ctx.t('lunch.with-soup'),
    },
    {
      text: ctx.t('lunch.watch'),
    },
  ], { is_anonymous: false, protect_content: true, reply_markup: createLunchesListKeyboard(ctx), message_thread_id: ctx.message.message_thread_id,
  })

  return ctx.deleteMessage()
})

feature.callbackQuery(
  getLunchesListInfoData.filter(),
  logHandle('keyboard-lunches-diners-select'),
  async (ctx) => {
    const { data: today } = getLunchesListInfoData.unpack(
      ctx.callbackQuery.data,
    )

    if (ctx.msg?.poll === undefined) {
      return ctx.answerCallbackQuery(ctx.t('lunch.data-lost'))
    }
    ctx.answerCallbackQuery()
    const bakery = ctx.msg.poll.options[0].voter_count
    const soup = ctx.msg.poll.options[1].voter_count
    const lunches = bakery + soup
    return ctx.reply(ctx.t('lunch.list', { today, lunches, bakery, soup }), {
      message_thread_id: ctx.update.callback_query.message?.message_thread_id,
    })
  },
)

export { composer as lunchFeature }
