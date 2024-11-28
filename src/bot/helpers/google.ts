import { google } from 'googleapis'

import { logger } from '#root/logger.js'
import { config } from '#root/config.js'

const sheetReadScopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']

const googleAuth = new google.auth.GoogleAuth({
  apiKey: config.googleToken,
  scopes: sheetReadScopes,
})

export async function getGoogleSheetsContent(spreadsheetId: string, range: string) {
  const docs = google.sheets({ version: 'v4', auth: googleAuth })
  try {
    const response = await docs.spreadsheets.values.get({ spreadsheetId, range })
    if (!response.data) {
      return undefined
    }
    const content = response.data.values
    logger.debug(content)

    return content
  }
  catch (error) {
    logger.error('Error getting document content', error)
    return undefined
  }
}
