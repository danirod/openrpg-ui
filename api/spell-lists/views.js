import * as dto from './dto'

export const fetchSpellLists = (axios) => {
  const url = `/api/spell-lists/`

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data.data.map(dto.SpellListAdapter))
      })
      .catch((err) => reject(err))
  })
}

export const createSpellList = (payload, axios) => {
  const o = dto.CreateSpellListAdapter(payload)
  console.log('rsult dto', o)
  return new Promise((resolve, reject) => {
    axios
      .post('/api/spell-lists/', dto.CreateSpellListAdapter(payload))
      .then((res) => resolve(res))
      .catch((err) => {
        const error = new Error(
          'unable to create spell list: ' + err.response.data.message
        )
        error.code = err.response.status
        error.data = err.response.data.errors
        reject(error)
      })
  })
}

export const retrieveSpellList = (id, axios) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/spell-lists/${id}`)
      .then((res) => resolve(dto.RetrieveSpellListAdapter(res.data)))
      .catch((err) => {
        const error = new Error(
          'unable to retrieve spell list: ' + err.response.data.message
        )
        error.code = err.response.status
        error.data = err.response.data.errors
        reject(error)
      })
  })
}

export const updateSpellList = (id, payload, axios) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/api/spell-lists/${id}`, dto.CreateSpellListAdapter(payload))
      .then((res) => resolve(res))
      .catch((err) => {
        const error = new Error(
          'unable to updae spell list: ' + err.response.data.message
        )
        error.code = err.response.status
        error.data = err.response.data.errors
        reject(error)
      })
  })
}

export const deleteSpellList = (id, axios) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/spell-lists/${id}`)
      .then((res) => resolve(res))
      .catch((err) => {
        const error = new Error(
          'unable to delete spell list: ' + err.response.data.message
        )
        error.code = err.response.status
        error.data = err.response.data.errors
        reject(error)
      })
  })
}
