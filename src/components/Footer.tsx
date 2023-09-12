import Image from 'next/image';
import Copyright from './Copyright';
import Pages from './Pages';
import SocialMedias from './SocialMedias';

import logoDark from '@/public/logo-image-light.png';

function Footer() {
  return (
    <footer className="gap-2 grid grid-cols-6 pb-5 pt-20 px-5 text-light sm:px-28 items-center sm:grid-cols-12 sm:pt-24">
      <Image
        alt="main logo"
        className="h-auto col-span-2 sm:col-start-2"
        src={logoDark}
      />
      <div className="col-span-3 col-start-4 text-darker text-lg sm:grid sm:grid-cols-2 sm:gap-2 sm:items-start sm:col-span-6 sm:col-start-6 sm:text-xl">
        <Pages className="flex flex-col gap-2" />
        <SocialMedias className="pt-5 sm:pt-0" />
      </div>
      <Copyright className="col-span-6 pt-12 text-center sm:col-span-12 sm:pt-16" />
    </footer>
  );
}

export default Footer;
