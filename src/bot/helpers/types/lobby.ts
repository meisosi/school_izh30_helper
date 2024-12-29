import type { Games } from '#root/bot/helpers/types/index.js'

export interface Player {
  id: number
  name: string
}

export interface Lobby {
  lobbyId: string
  players: Player[]
  game: Games
}
