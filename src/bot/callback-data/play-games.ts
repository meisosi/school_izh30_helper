import { createCallbackData } from 'callback-data'

export const selectTicTakSellData = createCallbackData('tik-tak-move', {
  gameId: String,
  row: Number,
  col: Number,
})
