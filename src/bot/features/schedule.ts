import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { getGoogleSheetsContent } from "#root/bot/helpers/google.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("schedule", logHandle("command-schedule"), async (ctx) => {
  ctx.reply(ctx.t("schedule-fetch"));
  const schedule = await getGoogleSheetsContent(
    "1hnxbeX7YvlUsRRGjw8BxxktWBFc3BHeNgj3sJSamZbw"
  );
  if (!schedule) {
    return ctx.reply(ctx.t("schedule-fetch-error"));
  }
  else {
    ctx.reply(schedule.toString())
    return ctx.reply(ctx.t("schedule-fetched"));
  }
});

export { composer as scheduleFeature };
