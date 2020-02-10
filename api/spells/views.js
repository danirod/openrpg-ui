import * as dto from './dto'

export const fetchSpellSuggestions = (payload) => {
  const search = new URLSearchParams({ q: payload })
  const url = `/api/spells/?${search.toString()}`

  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: 'same-origin'
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('unable to fetch spells')
      })
      .then((body) => resolve(dto.SpellSuggestionAdapter(body.data)))
      .catch((err) => reject(err))
  })
}

export const fetchSpells = () => {
  const url = `/api/spells/`

  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: 'same-origin'
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('unable to fetch spells')
      })
      .then((body) => resolve(body.data.map(dto.SpellAdapter)))
      .catch((err) => reject(err))
  })
}

export const createSpell = (payload, axios) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/spells/', dto.CreateSpellAdapter(payload))
      .then((res) => resolve(res))
      .catch((err) => {
        const error = new Error(
          'unable to create spell: ' + err.response.data.message
        )
        error.code = err.response.status
        error.data = err.response.data.errors
        reject(error)
      })
  })
}
