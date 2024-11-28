import type { BotCommand, LanguageCode } from '@grammyjs/types'
import type { CommandContext } from 'grammy'
import { i18n, isMultipleLocales } from '#root/bot/i18n.js'
import type { Context } from '#root/bot/context.js'

function getLanguageCommand(localeCode: string): BotCommand {
  return {
    command: 'language',
    description: i18n.t(localeCode, 'language-command-description'),
  }
}

function getPrivateChatCommands(localeCode: string): BotCommand[] {
  return [
    {
      command: 'start',
      description: i18n.t(localeCode, 'start-command-description'),
    },
    {
      command: 'schedule',
      description: i18n.t(localeCode, 'schedule-command-description'),
    },
  ]
}

function getPrivateChatAdminCommands(localeCode: string): BotCommand[] {
  return [
    {
      command: 'setcommands',
      description: i18n.t(localeCode, 'setcommands-command-description'),
    },
  ]
}

function getPrivateChatBetaCommands(localeCode: string): BotCommand[] {
  return [
    {
      command: 'games',
      description: i18n.t(localeCode, 'games-command-description'),
    },
  ]
}

function getGroupChatCommands(localeCode: string): BotCommand[] {
  return [
    {
      command: 'lunch',
      description: i18n.t(localeCode, 'lunch-command-description'),
    },
    {
      command: 'schedule',
      description: i18n.t(localeCode, 'schedule-command-description'),
    },
  ]
}

export async function setCommandsHandler(ctx: CommandContext<Context>) {
  const DEFAULT_LANGUAGE_CODE = 'ru'

  // set private chat commands
  await ctx.api.setMyCommands(
    [
      ...getPrivateChatCommands(DEFAULT_LANGUAGE_CODE),
      ...(isMultipleLocales ? [getLanguageCommand(DEFAULT_LANGUAGE_CODE)] : []),
    ],
    {
      scope: {
        type: 'all_private_chats',
      },
    },
  )

  if (isMultipleLocales) {
    const requests = i18n.locales.map(code =>
      ctx.api.setMyCommands(
        [
          ...getPrivateChatCommands(code),
          ...(isMultipleLocales
            ? [getLanguageCommand(DEFAULT_LANGUAGE_CODE)]
            : []),
        ],
        {
          language_code: code as LanguageCode,
          scope: {
            type: 'all_private_chats',
          },
        },
      ),
    )

    await Promise.all(requests)
  }

  // set group chat commands
  await ctx.api.setMyCommands(getGroupChatCommands(DEFAULT_LANGUAGE_CODE), {
    scope: {
      type: 'all_group_chats',
    },
  })

  if (isMultipleLocales) {
    const requests = i18n.locales.map(code =>
      ctx.api.setMyCommands(getGroupChatCommands(code), {
        language_code: code as LanguageCode,
        scope: {
          type: 'all_group_chats',
        },
      }),
    )

    await Promise.all(requests)
  }

  // set private chat commands for beta testers
  ctx.config.betaTesters.forEach(async (tester) => {
    await ctx.api.setMyCommands(
      [
        ...getPrivateChatCommands(DEFAULT_LANGUAGE_CODE),
        ...getPrivateChatBetaCommands(DEFAULT_LANGUAGE_CODE),
        ...(isMultipleLocales ? [getLanguageCommand(DEFAULT_LANGUAGE_CODE)] : []),
      ],
      {
        scope: {
          type: 'chat',
          chat_id: Number(tester),
        },
      },
    )
  })

  // set private chat commands for owner
  ctx.config.botAdmins.forEach(async (admin) => {
    await ctx.api.setMyCommands(
      [
        ...getPrivateChatCommands(DEFAULT_LANGUAGE_CODE),
        ...getPrivateChatBetaCommands(DEFAULT_LANGUAGE_CODE),
        ...getPrivateChatAdminCommands(DEFAULT_LANGUAGE_CODE),
        ...(isMultipleLocales ? [getLanguageCommand(DEFAULT_LANGUAGE_CODE)] : []),
      ],
      {
        scope: {
          type: 'chat',
          chat_id: Number(admin),
        },
      },
    )
  })

  return ctx.reply(ctx.t('admin-commands-updated'))
}
