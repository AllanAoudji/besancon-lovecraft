import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import Footer from '@src/components/Footer';
import Header from '@src/components/Header';
// import { FacebookPixelEvents } from '@src/components/FacebookPixelEvents';
import { playfair } from '@src/utils/fonts';
// import { Suspense } from 'react';
import Script from 'next/script';

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
      {/* <Suspense fallback={null}>
        <FacebookPixelEvents />
      </Suspense> */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '910247493884693');
            fbq('track', 'PageView');
          `,
        }}
      />
    </body>
  );
};

export default RootLayout;
