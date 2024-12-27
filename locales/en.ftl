## Commands

start-command-description = Start the bot
language-command-description = Change language
schedule-command-description = Get schedule
lunch-command-description =  Poll lunches
games-command-description = Games
setcommands-command-description = Set bot commands

## Welcome Feature

welcome = 
    .menu = Hii~!

## Language Feature

language = 
  .select = Please, select your language
  .changed = Language successfully changed!

## Games Feature

games = 
  .main = You can play games here!
  I just haven't figured out which ones yet...

tik-tak = 
  .on-beta = Wait until it doesn't work.
  .invalid-game-type = An error occurred, the game could not be started...
  .title = Tic-tac-toe
  .description = Basic Tic-tac-toe game
  First, you need to select the game mode.
  .player = Player
  .computer = Computer
  .winner = Winner: {$winner}
  .draw = Draw

## Schedule Feature

schedule = 
    .fetch = Please wait a little bit
    .fetched = {$day}!
    Classroom {$grade}
    
    {$lessons}
    .fetch-error = Oops... There was a problem, I couldn't get the schedule
    .invalid-schedule-type = An error has occurred, the data source is lost
    .title = Schedule for {$date}:
    .lesson_current = {$index} lesson ({$time})
    .lesson_preliminary = {$index} lesson
    .classroom = Classroom
    .lesson = Lesson
    .preliminary = Check the preliminary schedule
    .current = Check the current schedule

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
