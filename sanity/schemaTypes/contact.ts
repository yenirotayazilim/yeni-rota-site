export default {
  name: 'contact',
  title: 'İletişim',
  type: 'document',
  fields: [
    {
      name: 'offices',
      title: 'Ofis Bilgileri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Ofis Adı', type: 'string' },
            { name: 'address', title: 'Adres', type: 'string' },
            { name: 'phone', title: 'Telefon', type: 'string' }
          ]
        }
      ],
    },
    {
      name: 'formNote',
      title: 'Form Açıklaması',
      type: 'string',
      description: 'Formun üstünde açıklama olarak görünebilir',
    }
  ]
}
