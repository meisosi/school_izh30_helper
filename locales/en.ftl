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

language = 
  .select = Please, select your language
  .changed = Language successfully changed!

## Schedule Feature

schedule = 
    .fetch = Please wait a little bit
    .fetched = {$day}!
    Classroom {$grade}
    
    {$lessons}
    .fetch-error = Oops... There was a problem, I couldn't get the schedule
    .title = Schedule for {$date}:
    .lesson_current = {$index} lesson ({$time})
    .lesson_preliminary = {$index} lesson
    .classroom = Classroom
    .lesson = Lesson
    .preliminary = Check the preliminary schedule
    .current = Check the current schedule

## Games Feature
games = 
  .select = You can play games here!
  I just haven't figured out which ones yet...

## Lunch Feature

lunch = 
  .question = We're signing up for lunch ({$today})
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
