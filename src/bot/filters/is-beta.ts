import { isUserHasId } from 'grammy-guard'

export const isBetaTester = (ids: number[]) => isUserHasId(...ids)
