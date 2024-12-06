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
  .select = Тут можно поиграть в игры!
  Только я не придумал в какие пока что...

## Schedule Feature

schedule = 
    .fetch = Пожалуйста подождите чуть-чуть
    .current-fetched = Это расписание на {$day}.{$month}!
    Класс {$grade}
    {$lessons}
    .preliminary-fetched = Это предварительное расписание на следующий день!
    .fetch-error = Упс... Произошла неувязка, я не смог получить рассписание
    .title = Расписание на {$date}:
    .lesson = {$index} урок
    .classroom = Кабинет
    .warning = Ещё рано, вероятно рассписание на следующий день может отличатся, пожалуйста сделайте ещё один запрос чуть позже или посмотрите предварительное рассписание 
    .preliminary = Проверить предварительное рассписание
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
