import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import Footer from '@src/components/Footer';
import Header from '@src/components/Header';
import { playfair } from '@src/utils/fonts';
import MetaPixel from '@src/components/MetaPixel';

export const metadata: Metadata = {
  description: 'Home page',
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <body
      className={`bg-lighter flex flex-col min-h-screen relative ${playfair.className}`}
    >
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </div>
      <Analytics />
      <MetaPixel />
    </body>
  );
};

export default RootLayout;
