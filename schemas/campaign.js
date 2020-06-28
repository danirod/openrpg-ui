export default {
  fields: [
    {
      type: 'input',
      inputType: 'text',
      id: 'campaign_title',
      label: 'Título',
      model: 'title',
      placeholder: 'Título de la campaña',
      required: true
    },
    {
      type: 'textArea',
      label: 'Descripción',
      id: 'campaign_description',
      model: 'description',
      placeholder: 'Descripción de la campaña'
    }
  ]
}
