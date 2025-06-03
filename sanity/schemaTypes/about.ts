export default {
  name: 'about',
  title: 'Hakkımızda',
  type: 'document',
  fields: [
    {
      name: 'shortIntro',
      title: 'Kısa Tanıtım (Slogan)',
      type: 'text',
      description: 'Ana sayfa üst bölümde veya sliderda kullanılacak kısa slogan metni',
    },
    {
      name: 'sliderMedia',
      title: 'Ana Sayfa Medya (Görsel/Video)',
      type: 'file',
      options: {
        accept: 'image/*,video/*', // her ikisi de seçilebilir
      },
      description: 'Ana sayfada gösterilecek büyük görsel veya video',
    },
    {
      name: 'description',
      title: 'Detaylı Açıklama',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Hakkımızda sayfasında uzun açıklama',
    },
    {
      name: 'mission',
      title: 'Misyon',
      type: 'text',
      description: 'Kurumsal misyon açıklaması',
    },
    {
      name: 'vision',
      title: 'Vizyon',
      type: 'text',
      description: 'Kurumsal vizyon açıklaması',
    }
  ]
}
