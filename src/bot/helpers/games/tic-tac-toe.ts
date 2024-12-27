import { InlineKeyboard } from 'grammy'
import { v4 as uuidv4 } from 'uuid'
import { selectTicTakSellData } from '#root/bot/callback-data/play-games.js'
import type { TicTacToeTypes } from '#root/bot/helpers/types/index.js'

export class TicTacToe {
  private state: TicTacToeTypes.TicTacState

  constructor(players: [TicTacToeTypes.TicTakPlayer, TicTacToeTypes.TicTakPlayer]) {
    const gameId = uuidv4()
    const startingPlayerIndex = Math.floor(Math.random() * 2)

    this.state = {
      gameId,
      board: Array(3).fill(null).map(() => Array(3).fill(null)),
      currentPlayer: players[startingPlayerIndex],
      players,
      winner: null,
      gameEnd: false,
    }

    if (!this.state.gameEnd && this.state.currentPlayer.id === 0) {
      this.makeComputerMove()
    }
  }

  public getState() {
    return this.state
  }

  public generateBoardKeyboard(): InlineKeyboard {
    const keyboard = []
    const gameId = this.state.gameId
    for (let row = 0; row < 3; row++) {
      const rowButtons = []
      for (let col = 0; col < 3; col++) {
        const sell = this.state.board[row][col] || ' '
        rowButtons.push({
          text: sell,
          callback_data: selectTicTakSellData.pack({ gameId, row, col }),
        })
      }
      keyboard.push(rowButtons)
    }
    return InlineKeyboard.from(keyboard)
  }

  public makeMove(row: number, col: number, playerId: number): boolean {
    if (this.state.currentPlayer.id !== playerId) {
      return false
    }
    if (
      !this.state.board
      || row < 0 || row >= this.state.board.length
      || !this.state.board[row]
      || col < 0 || col >= this.state.board[row].length
      || this.state.board[row][col]
      || this.state.winner
    ) {
      return false
    }
    this.state.board[row][col] = this.state.currentPlayer.symbol
    this.checkWinner()
    this.state.currentPlayer = this.state.currentPlayer.symbol === 'X' ? this.state.players[1] : this.state.players[0]

    if (!this.state.gameEnd && this.state.currentPlayer.id === 0) {
      this.makeComputerMove()
    }

    return true
  }

  private makeComputerMove() {
    if (this.tryToWinOrBlock('O'))
      return
    if (this.tryToWinOrBlock('X'))
      return
    this.makeRandomMove()
  }

  private tryToWinOrBlock(symbol: 'X' | 'O'): boolean {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],

      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],

      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ]

    for (const line of lines) {
      const [a, b, c] = line
      if (this.state.board[a[0]][a[1]] === symbol && this.state.board[b[0]][b[1]] === symbol && !this.state.board[c[0]][c[1]]) {
        this.state.board[c[0]][c[1]] = this.state.currentPlayer.symbol
        this.checkWinner()
        this.state.currentPlayer = this.state.players[0]
        return true
      }
      if (this.state.board[a[0]][a[1]] === symbol && !this.state.board[b[0]][b[1]] && this.state.board[c[0]][c[1]] === symbol) {
        this.state.board[b[0]][b[1]] = this.state.currentPlayer.symbol
        this.checkWinner()
        this.state.currentPlayer = this.state.players[0]
        return true
      }
      if (!this.state.board[a[0]][a[1]] && this.state.board[b[0]][b[1]] === symbol && this.state.board[c[0]][c[1]] === symbol) {
        this.state.board[a[0]][a[1]] = this.state.currentPlayer.symbol
        this.checkWinner()
        this.state.currentPlayer = this.state.players[0]
        return true
      }
    }
    return false
  }

  private makeRandomMove() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (!this.state.board[row][col]) {
          this.state.board[row][col] = this.state.currentPlayer.symbol
          this.checkWinner()
          this.state.currentPlayer = this.state.players[0]
          return
        }
      }
    }
  }

  private isBoardFull(): boolean {
    return this.state.board.every(row => row.every(cell => cell !== null))
  }

  private checkWinner() {
    const lines = [
      [this.state.board[0][0], this.state.board[0][1], this.state.board[0][2]],
      [this.state.board[1][0], this.state.board[1][1], this.state.board[1][2]],
      [this.state.board[2][0], this.state.board[2][1], this.state.board[2][2]],

      [this.state.board[0][0], this.state.board[1][0], this.state.board[2][0]],
      [this.state.board[0][1], this.state.board[1][1], this.state.board[2][1]],
      [this.state.board[0][2], this.state.board[1][2], this.state.board[2][2]],

      [this.state.board[0][0], this.state.board[1][1], this.state.board[2][2]],
      [this.state.board[0][2], this.state.board[1][1], this.state.board[2][0]],
    ]

    for (const line of lines) {
      if (line[0] && line[0] === line[1] && line[0] === line[2]) {
        this.state.winner = this.state.players.find(player => player.symbol === line[0]) || null
        this.state.gameEnd = true
        return
      }
    }

    if (this.isBoardFull()) {
      this.state.gameEnd = true
    }
  }
}
