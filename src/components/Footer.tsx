import Image from 'next/image';
import Copyright from './Copyright';
import Pages from './Pages';
import SocialMedias from './SocialMedias';

import logoDark from '@/public/logo-image-light.png';

function Footer() {
  return (
    <footer className="gap-2 grid grid-cols-6 pb-5 pt-20 px-5 text-light sm:px-28 items-center">
      <Image alt="main logo" className="h-auto col-span-2" src={logoDark} />
      <div className="col-span-3 col-start-4 text-darker text-lg">
        <Pages className="flex flex-col gap-2" />
        <SocialMedias className="pt-5" />
      </div>
      <Copyright className="col-span-6 pt-12 text-center" />
    </footer>
  );
}

export default Footer;
