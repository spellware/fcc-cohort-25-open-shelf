import { redirect } from 'react-router'
import { getProfile } from '../../profile/api/getProfile'
import { getItemDetails } from '../api/getItemDetails'
import { getLendingRequests } from '../api/getLendingRequests'

export async function detailPageLoader({ params }) {
  try {
    const [itemResponse, profileResponse, lendingResponse] = await Promise.all([
      getItemDetails(params.itemId),
      getProfile(),
      getLendingRequests(),
    ])

    return {
      item: itemResponse.data,
      profile: profileResponse.status === 403 ? null : profileResponse.data,
      lendingRequests: lendingResponse.status === 200 ? lendingResponse.data : null,
    }
  } catch (error) {
    if (error.response?.status === 403) {
      console.warn('Unauthorized - redirecting to login.')
      throw redirect('/login')
    }
    throw error
  }
}
