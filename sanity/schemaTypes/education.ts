import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'education',
  title: 'Eğitim',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'category' }],
      weak: true, // ilişki silinse bile eğitim kaydı bozulmasın
    }),
    defineField({
      name: 'duration',
      title: 'Süre',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Müfredat',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'instructor',
      title: 'Eğitmen',
      type: 'reference',
      to: [{ type: 'instructor' }],
    }),
    defineField({
      name: 'showOnHome',
      title: 'Ana Sayfada Gösterilsin mi?',
      type: 'boolean',
    }),
  ],
})
