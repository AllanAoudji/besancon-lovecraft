import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import Footer from '@src/components/Footer';
import FullScreenImage from '@src/components/FullScreenImage';
import Header from '@src/components/Header';
import { rubik } from '@src/utils/fonts';

export const metadata: Metadata = {
  title: 'Allan Aoudji | Web & graphic designer',
  description: 'Home page',
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <body
      className={`bg-secondary flex flex-col min-h-screen relative ${rubik.className}`}
    >
      <FullScreenImage />
      <div className="bg-gradient-to-b flex flex-col from-50% from-dark min-h-screen to-darker">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </div>
      <Analytics />
    </body>
  );
};

export default RootLayout;
