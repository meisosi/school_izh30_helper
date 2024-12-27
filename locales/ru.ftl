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
  .waiting = Ожидание игроков...

tik-tak = 
  .on-beta = Жди, пока не работает
  .invalid-game-type = Произошла ошибка, не удалоcь начать игру...
  .title = Крестики-нолики
  .description = Базовая игра в крестики-нолики
  Для начала, необходимо выбрать режим игры
  .on-play = Игра между {$player1} и {$player2}
  Ход игрока: {$current}
  .player = Игрок
  .computer = Компьютер
  .winner = Победитель: {$winner}
  .draw = Ничья между {$player1} и {$player2}
  .data-lost = Произошла ошибка, игра не актуальна
  .invalid-move = Невозможный ход

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

## Admin Feature

admin-commands-updated = Команды обновлены.

## Unhandled Feature

unhandled = Неизвестное взаимодействие. Используйте /start
