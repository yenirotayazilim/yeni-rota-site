import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Kursiyer Yorumları',
  type: 'document',
  fields: [
    defineField({
      name: 'isim',
      title: 'İsim',
      type: 'string',
      validation: Rule => Rule.required().error('İsim alanı zorunludur'),
    }),
    defineField({
      name: 'metin',
      title: 'Yorum Metni',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required().error('Yorum metni boş bırakılamaz'),
    }),
    defineField({
      name: 'visible',
      title: 'Yayında mı?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
