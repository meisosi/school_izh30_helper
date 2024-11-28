import { Composer } from 'grammy'
import { changeLanguageData } from '#root/bot/callback-data/change-language.js'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { i18n } from '#root/bot/i18n.js'
import { createChangeLanguageKeyboard } from '#root/bot/keyboards/change-language.js'
import { isBetaTester } from '#root/bot/filters/is-beta.js'

const composer = new Composer<Context>()

const feature = composer.filter(ctx => isBetaTester(ctx.config.betaTesters)(ctx))

feature.command('games', logHandle('command-game'), async (ctx) => {
  return ctx.reply(ctx.t('games.select'))
})

export { composer as gamesFeature }
