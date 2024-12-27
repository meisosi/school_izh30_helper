export interface Player {
  id: number
  name: string
}

export interface GameState {
  gameId: string
  players: Player[]
  winner: Player | null
  gameEnd: boolean
}
