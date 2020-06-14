export function fetchCampaigns($axios, page = 1) {
  if (Number.isInteger(page) || /^[0-9]+$/.test(page)) {
    return $axios.$get(`/api/campaigns?page=${page}`)
  }
  throw new Error('wrong page')
}

export function fetchCampaign($axios, id) {
  if (Number.isInteger(id) || /^[0-9]+$/.test(id)) {
    return $axios.$get(`/api/campaigns/${id}`)
  }
  throw new Error('wrong id')
}

export async function createCampaign($axios, payload) {
  try {
    const response = await $axios.post(`/api/campaigns`, payload)
    return response.data.message
  } catch (e) {
    const error = new Error(e.message)
    error.code = e.response.status
    error.errors = e.response.data.errors
    throw error
  }
}

export async function updateCampaign($axios, id, payload) {
  try {
    const response = await $axios.put(`/api/campaigns/${id}`, payload)
    return response.data.message
  } catch (e) {
    const error = new Error(e.message)
    error.code = e.response.status
    error.errors = e.response.data.errors
    throw error
  }
}

export function destroyCampaign($axios, id) {
  return $axios.$delete(`/api/campaigns/${id}`)
}
