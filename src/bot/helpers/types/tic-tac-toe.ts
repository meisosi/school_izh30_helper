import type { GameState, Player } from '#root/bot/helpers/types/game.js'

export interface TicTakPlayer extends Player {
  id: number
  name: string
  symbol: 'X' | 'O'
}

export interface TicTacState extends GameState {
  board: (TicTakPlayer['symbol'] | null)[][]
  currentPlayer: TicTakPlayer
  players: [TicTakPlayer, TicTakPlayer]
  winner: TicTakPlayer | null
  gameEnd: boolean
}

export interface Message {
  text: string
  chatId: number
  messageId: number
}
