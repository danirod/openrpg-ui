import { rolemaster } from '~/config'

export const SpellListAdapter = (data) => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    notes: data.notes,
    type: rolemaster.spellListTypes[data.list_type]
  }
}

export const CreateSpellListAdapter = (payload) => {
  return {
    list_type: payload.type,
    name: payload.name,
    notes: payload.notes,
    description: payload.description
  }
}

export const RetrieveSpellListAdapter = (payload) => {
  return {
    name: payload.name,
    notes: payload.notes,
    description: payload.description,
    type: payload.list_type
  }
}

export const RetrieveSpellListTypeEnrichedAdapter = (payload) => {
  return {
    name: payload.name,
    notes: payload.notes,
    description: payload.description,
    type: rolemaster.spellListTypes[payload.list_type]
  }
}

export const SearchResultAdapter = (spellList) => {
  const { id, name } = spellList
  return { id, name }
}
