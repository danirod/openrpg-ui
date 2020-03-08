import { rolemaster } from '~/config'

export const SpellListAdapter = (data) => {
  return {
    name: data.name,
    description: data.description,
    notes: data.notes,
    type: rolemaster.spellListTypes[data.list_type]
  }
}

export const CreateSpellListAdapter = (payload) => {
  return {
    name: payload.name,
    level: parseInt(payload.level, 10),
    notes: payload.notes,
    description: payload.description,
    list_name: payload.list_name,
    code: payload.type,
    class: payload.clazz,
    subclass: payload.subclass,
    duration: JSON.stringify({ code: payload.duration }),
    effect_area: JSON.stringify({ code: payload.effect_area }),
    range: JSON.stringify({ code: payload.range }),
    list_id: null
  }
}

export const RetrieveSpellListAdapter = (payload) => {
  return {
    name: payload.name,
    level: parseInt(payload.level, 10),
    notes: payload.notes,
    description: payload.description,
    list_name: payload.list_name,
    type: payload.code,
    clazz: payload.class,
    subclass: payload.subclass,
    duration: JSON.parse(payload.duration).code,
    effect_area: JSON.parse(payload.effect_area).code,
    range: JSON.parse(payload.range).code,
    list_id: null
  }
}
