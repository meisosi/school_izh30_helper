import type { Context } from '#root/bot/context.js'

export function createLessonsTxt(ctx: Context, schedule: Array<Array<string>>, type: 'current' | 'preliminary'): string {
  const lessons: string[] = []
  const classrooms: string[] = []
  const times: string[] = []
  for (let i = 1; i < schedule.length; i++) {
    times.push(schedule[i][0])
    lessons.push(schedule[i][1])
    classrooms.push(schedule[i][2])
  }
  let scheduleText: string = ''
  for (let i = 0; i < lessons.length; i++) {
    if (type === 'current') {
      scheduleText += `${ctx.t('schedule.lesson_current', { index: i + 1, time: times[i] })}: ${lessons[i]}\n${ctx.t('schedule.classroom')}: ${classrooms[i]}\n\n`
    }
    else {
      scheduleText += `${ctx.t('schedule.lesson_preliminary', { index: i + 1 })}: ${lessons[i]}\n${ctx.t('schedule.classroom')}: ${classrooms[i]}\n\n`
    }
  }
  return scheduleText
}

export function getScheduleForGrade(schedule: Array<Array<string>>, grade: string) {
  let gradeIndex = -1
  const result: Array<Array<string>> = []

  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].includes(grade)) {
      gradeIndex = i
      break
    }
  }

  if (gradeIndex === -1) {
    return result
  }

  const columnIndex = schedule[gradeIndex].indexOf(grade)
  for (let i = gradeIndex + 1; i < schedule.length; i++) {
    if (schedule[i].length >= columnIndex + 1) {
      const time = schedule[i][1] || ''
      const subject = schedule[i][columnIndex] || ''
      const classroom = schedule[i][columnIndex + 1] || ''

      if (!time && !subject && !classroom) {
        continue
      }

      result.push([time, subject, classroom])
    }
  }

  return result
}
