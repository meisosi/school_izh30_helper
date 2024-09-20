## Commands

start-command-description = Start the bot
language-command-description = Change language
schedule-command-description = Get schedule
lunch-command-description =  Poll lunches
setcommands-command-description = Set bot commands

## Welcome Feature

welcome = 
    .menu = Hii~!

## Language Feature

language-select = Please, select your language
language-changed = Language successfully changed!

## Schedule Feature

schedule = 
    .fetch = Please wait a little bit
    .current-fetched = This is the schedule for {$month}.{$day}!
    .preliminary-fetched = This is a tentative schedule for the next day!
    .fetch-error = Oops... There was a problem, I couldn't get the schedule
    .title = Schedule for {$date}:
    .lesson = {$index} lesson) {$lesson}
    .warning =  It's still early, probably the schedule for the next day may be different, please make another request a little later or look at the preliminary inquiry
    .preliminary = Check the preliminary schedule
    .current = Check the current schedule

## Lunch Feature

lunch = 
  .question = We're signing up for lunch
  .with-soup = With soup
  .with-baking = With baking
  .watch = Just to see
  .list = Lunches for {today}:
  In total: {$lunches}
  With bakery: {bakery}
  With soup: {soup}

## Admin Feature

admin-commands-updated = Commands updated.

## Unhandled Feature

unhandled = Unrecognized command. Try /start
