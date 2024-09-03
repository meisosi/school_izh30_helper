import { google } from 'googleapis'

import { logger } from '#root/logger.js'
import { config } from '#root/config.js'

const sheetReadScopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']

const googleAuth = new google.auth.GoogleAuth({
  apiKey: config.googleToken,
  scopes: sheetReadScopes,
})

export async function getGoogleSheetsContent(spreadsheetId: string) {
  const docs = google.sheets({ version: 'v4', auth: googleAuth })
  try {
    const response = await docs.spreadsheets.values.get({ spreadsheetId, range: 'A1:A7' })
    if (!response.data) {
      return undefined
    }
    const content = response.data.values

    return content
  }
  catch (error) {
    logger.error('Error getting document content', error)
    return undefined
  }
}
