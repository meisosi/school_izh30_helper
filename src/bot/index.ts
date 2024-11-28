import { autoChatAction } from '@grammyjs/auto-chat-action'
import { hydrate } from '@grammyjs/hydrate'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'
import type { BotConfig, StorageAdapter } from 'grammy'
import { Bot as TelegramBot } from 'grammy'
import { sequentialize } from '@grammyjs/runner'

import type { Context, SessionData } from '#root/bot/context.js'
import { createContextConstructor } from '#root/bot/context.js'
import { i18n, isMultipleLocales } from '#root/bot/i18n.js'
import type { Logger } from '#root/logger.js'
import type { Config } from '#root/config.js'

import { updateLogger } from '#root/bot/middlewares/update-logger.js'
import { session } from '#root/bot/middlewares/session.js'

import { errorHandler } from '#root/bot/handlers/error.js'

import { welcomeFeature } from '#root/bot/features/welcome.js'
import { adminFeature } from '#root/bot/features/admin.js'
import { languageFeature } from '#root/bot/features/language.js'
import { scheduleFeature } from '#root/bot/features/schedule.js'
import { lunchFeature } from '#root/bot/features/lunches.js'
import { gamesFeature } from '#root/bot/features/games.js'
import { unhandledFeature } from '#root/bot/features/unhandled.js'

interface Dependencies {
  config: Config
  logger: Logger
}

interface Options {
  botSessionStorage?: StorageAdapter<SessionData>
  botConfig?: Omit<BotConfig<Context>, 'ContextConstructor'>
}

function getSessionKey(ctx: Omit<Context, 'session'>) {
  if (ctx.chat === undefined) {
    const poll_id = ctx.poll?.id.toString() || ctx.pollAnswer?.poll_id.toString()
    return `poll_${poll_id}`
  }

  return ctx.chat?.id.toString()
}

export function createBot(token: string, dependencies: Dependencies, options: Options = {}) {
  const {
    config,
    logger,
  } = dependencies

  const bot = new TelegramBot(token, {
    ...options.botConfig,
    ContextConstructor: createContextConstructor({
      logger,
      config,
    }),
  })
  const protectedBot = bot.errorBoundary(errorHandler)

  // Middlewares
  bot.api.config.use(parseMode('HTML'))

  if (config.isPollingMode)
    protectedBot.use(sequentialize(getSessionKey))
  if (config.isDebug)
    protectedBot.use(updateLogger())
  protectedBot.use(autoChatAction(bot.api))
  protectedBot.use(hydrateReply)
  protectedBot.use(hydrate())
  protectedBot.use(session({ getSessionKey, storage: options.botSessionStorage }))
  protectedBot.use(i18n)

  // Handlers
  protectedBot.use(welcomeFeature)
  protectedBot.use(scheduleFeature)
  protectedBot.use(lunchFeature)
  protectedBot.use(gamesFeature)
  protectedBot.use(adminFeature)
  if (isMultipleLocales)
    protectedBot.use(languageFeature)

  // must be the last handler
  protectedBot.use(unhandledFeature)

  return bot
}

export type Bot = ReturnType<typeof createBot>
