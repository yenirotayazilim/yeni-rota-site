import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'instructor',
  title: 'Eğitmen',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'bio',
      title: 'Biyografi',
      type: 'text',
    }),
    defineField({
      name: 'photo',
      title: 'Fotoğraf',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cv',
      title: 'CV (PDF)',
      type: 'file',
    }),
    defineField({
      name: 'showOnHome',
      title: 'Ana Sayfada Gösterilsin mi?',
      type: 'boolean',
    }),
  ],
})
