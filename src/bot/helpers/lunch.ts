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
