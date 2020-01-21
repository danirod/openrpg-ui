function SpellSuggestionAdapter(spells) {
  return spells.map((spell) => ({
    id: spell.id,
    text: `LVL: ${spell.level} LIST: ${spell.list_name} NAME: ${spell.name}`,
    link: `/api/spells/${spell.id}`
  }))
}

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
      .then((body) => resolve(SpellSuggestionAdapter(body.data)))
      .catch((err) => reject(err))
  })
}
