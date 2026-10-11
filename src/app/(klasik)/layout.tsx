// Eski (klasik) sayfaların ortak iskeleti: eski menü + footer + sayfa geçişi.
// Yeni tasarım turu bu sayfalara geldikçe buradan çıkıp yeni kimliğe geçecekler.

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransitionWrapper from '@/app/PageTransitionWrapper';

export default function KlasikLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[70px] min-h-screen">
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </main>
      <Footer />
    </>
  );
}
