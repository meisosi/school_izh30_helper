## Commands

start-command-description = Старт
language-command-description = Язык
schedule-command-description = Расписание
lunch-command-description = Обеды
games-command-description = Игры
setcommands-command-description = Обновить команды

## Welcome Feature

welcome = 
    .menu = Приветик!


## Language Feature

language = 
  .select = Пожалуста выберите язык из нижеуказанных
  .changed = Язык успешно изменен

## Games Feature
games = 
  .main = Тут можно поиграть в игры!
  Только я не придумал в какие пока что...

tik-tak = 
  .invalid-game-type = Произошла ошибка, не удалоcь начать игру...
  .title = Крестики-нолики
  .description = Базовая игра в крестики-нолики
  Для начала, необходимо выбрать режим игры
  .single-player = Бот
  .multiplayer = Игрок

## Schedule Feature

schedule = 
    .fetch = Пожалуйста подождите чуть-чуть
    .fetched = {$day}!
    Класс {$grade}
    
    {$lessons}
    .fetch-error = Упс... Произошла неувязка, я не смог получить расписание
    .invalid-schedule-type = Произошла ошибка, источник данных потерян
    .title = Расписание на {$date}:
    .lesson_current = {$index} урок ({$time})
    .lesson_preliminary = {$index} урок
    .classroom = Кабинет
    .lesson = Урок
    .preliminary = Проверить предварительное расписание
    .current = Проверить текущее расписание

## Lunch Feature

lunch = 
  .question = Записываемся на обед ({$today})
  .with-soup = С супом
  .with-baking = С выпечкой
  .watch = Просто посмотреть
  .list = Обеды на {$today}:
  Всего: {$lunches}
  С выпечкой: {$bakery}
  С супом: {$soup}
  .data-lost = Данные потеряны. Проверьте результаты вручную

lunch-buttons = 
  .list = Получить обедающих

## Admin Feature

admin-commands-updated = Команды обновлены.

## Unhandled Feature

unhandled = Неизвестное взаимодействие. Используйте /start
