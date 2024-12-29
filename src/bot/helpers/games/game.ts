import { v4 as uuidv4 } from 'uuid'
import type { GameState, Player } from '#root/bot/helpers/types/game.js'

export class Game {
  protected state: GameState

  constructor(players: Player[]) {
    const gameId = uuidv4()

    this.state = {
      gameId,
      players,
      winner: null,
      gameEnd: false,
    }
  }

  public getState() {
    return this.state
  }
}
