import Image from 'next/image';
import Copyright from './Copyright';
import Pages from './Pages';
import SocialMedias from './SocialMedias';

import logoDark from '@/public/logo-image-light.png';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <footer>
      <Wrapper className="gap-2 grid grid-cols-6 items-center pb-5 pt-20 text-light sm:grid-cols-12 sm:pt-24">
        <Image
          alt="main logo"
          className="col-span-2 h-auto sm:col-start-2"
          src={logoDark}
        />
        <div className="col-span-3 col-start-4 text-darker text-lg sm:col-span-6 sm:col-start-6 sm:gap-2 sm:grid sm:grid-cols-2 sm:items-start sm:text-xl">
          <Pages className="flex flex-col gap-2" />
          <SocialMedias className="pt-5 sm:pt-0" />
        </div>
        <Copyright className="col-span-6 pt-12 text-center sm:col-span-12 sm:pt-16" />
      </Wrapper>
    </footer>
  );
}

export default Footer;
