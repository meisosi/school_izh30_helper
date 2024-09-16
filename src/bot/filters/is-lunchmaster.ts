import { isUserHasId } from 'grammy-guard'

export const isLunchMaster = (ids: number[]) => isUserHasId(...ids)
