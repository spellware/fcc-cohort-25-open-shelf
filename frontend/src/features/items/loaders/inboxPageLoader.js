import { redirect } from 'react-router'
import { getBorrowRequests } from '../api/getBorrowRequests'
import { getLendingRequests } from '../api/getLendingRequests'

export async function inboxPageLoader() {
  try {
    const [lendingResponse, borrowResponse] = await Promise.all([
      getLendingRequests(),
      getBorrowRequests(),
    ])
    return {
      lendingRequests: lendingResponse.status === 200 ? lendingResponse.data : null,
      borrowRequests: borrowResponse.status === 200 ? borrowResponse.data : null,
    }
  } catch (error) {
    if (error.response?.status === 403) {
      console.warn('Unauthorized - redirecting to login.')
      throw redirect('/login')
    }
    throw error
  }
}
