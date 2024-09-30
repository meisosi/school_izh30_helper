import type { PollAnswer } from 'grammy/types'
import { logger } from '#root/logger.js'

export function lunchAppointment(answer: PollAnswer) {
  if (answer.user === undefined)
    return undefined
  const user = answer.user
  const choose = answer.option_ids[0]
  if (choose !== 0 && choose !== 1)
    return undefined
  return {
    user,
    choose: choose === 0 ? 'bakery' : 'soup',
  }
}

export function lunchDay(): string {
  const now = new Date()
  const hours = now.getHours()

  if (hours >= 9) {
    now.setDate(now.getDate() + 1)
  }

  const day = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const year = now.getFullYear()
  return `${day}.${month}.${year}`
}
