import { redirect } from 'react-router'
import { getProfile } from '../api/getProfile'

export async function profilePageLoader() {
  try {
    const response = await getProfile()
    return { profile: response.data }
  } catch (error) {
    if (error.response?.status === 403) {
      console.warn('User unauthorized - redirecting to login.')
      throw redirect('/login')
    }
    throw new Response('Failed to load profile', { status: error.response?.status || 500 })
  }
}
