import { createCallbackData } from 'callback-data'

export const selectTicTakData = createCallbackData('game-tik-tak', {
  cell: Number,
  data: String,
})
