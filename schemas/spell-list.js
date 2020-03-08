import { rolemaster } from '~/config'

export default {
  fields: [
    {
      type: 'select',
      label: 'Type',
      model: 'type',
      values: () =>
        Object.values(rolemaster.spellListTypes).map((el) => ({
          id: el.code,
          name: el.display
        })),
      default: rolemaster.spellListTypes.basic.code,
      required: true
    },
    {
      type: 'input',
      inputType: 'text',
      label: 'Name',
      model: 'name',
      placeholder: 'Spell list name',
      required: true
    },
    {
      type: 'textArea',
      label: 'Description',
      model: 'description',
      placeholder: 'Spell list description'
    },
    {
      type: 'textArea',
      label: 'Notes',
      model: 'notes',
      placeholder: 'Additional notes about this list'
    }
  ]
}
