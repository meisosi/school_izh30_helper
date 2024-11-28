import type { Context } from '#root/bot/context.js'

export function createLessonsTxt(ctx: Context, schedule: Array<Array<string>>): string {
  const lessons: string[] = []
  const classrooms: string[] = []
  for (let i = 1; i < schedule.length; i++) {
    lessons.push(schedule[i][0])
    classrooms.push(schedule[i][1])
  }
  let scheduleText: string = ''
  for (let i = 0; i < lessons.length; i++) {
    scheduleText += `${ctx.t('schedule.lesson', { index: i + 1 })}: ${lessons[i]}\n${ctx.t('schedule.classroom')}: ${classrooms[i]}\n\n`
  }
  return scheduleText
}
