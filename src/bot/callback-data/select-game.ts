import { createCallbackData } from 'callback-data'

export const selectTikTakGameData = createCallbackData('games-tik-tak', {})

export const selectTicTakTypeData = createCallbackData('game-tik-tak', {
  type: String,
})
