const selectField = {
  type: 'select',
  label: 'User',
  model: 'user',
  values: [],
  required: true,
  selectOptions: {
    hideNoneSelectedText: true
  }
}

export default {
  selectField,
  fields: [
    selectField,
    {
      type: 'input',
      inputType: 'text',
      label: 'Name',
      model: 'name',
      placeholder: 'Character name',
      required: true
    },
    {
      type: 'input',
      inputType: 'number',
      label: 'Experience',
      model: 'experience',
      placeholder: 'Experience points'
    }
  ]
}
