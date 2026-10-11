import AppStoreButtons from '@/components/AppStoreButtons'

export default function UygulamaPage() {
  return (
    <div className="container mx-auto py-12 max-w-3xl text-center">
      <h1 className="text-4xl font-bold mb-6">Mobil Uygulamamız</h1>

      <div className="prose prose-lg max-w-none mb-6 mx-auto text-[#283346]">
        <p>
          Yeni Rota Eğitim platformunun mobil uygulaması ile istediğiniz yerden, istediğiniz zaman eğitimlere erişebilirsiniz.
          Tüm kurslarınızı cebinizden takip edin, canlı derslere katılın ve ilerlemenizi kolayca görüntüleyin!
        </p>
      </div>

      <p className="mb-8 font-semibold text-pink-600">
        Uygulamamız App Store ve Google Play&apos;de yayında!
      </p>

      {/* Statik App Store butonları */}
      <AppStoreButtons />
    </div>
  )
}
