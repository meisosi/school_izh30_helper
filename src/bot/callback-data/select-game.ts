import { createCallbackData } from 'callback-data'

export const selectTikTakGameData = createCallbackData('games-tik-tak', {})

export const selectTicTakTypeData = createCallbackData('game-tik-tak', {
  type: String,
})

export const entryTikTackData = createCallbackData('game-tik-tak-entry', {
  gameId: Number,
})

export const waitingPlayerData = createCallbackData('game-new-player-entry', {
  lobbyId: Number,
})
