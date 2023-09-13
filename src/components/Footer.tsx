import Image from 'next/image';
import Copyright from './Copyright';
import Pages from './Pages';
import SocialMedias from './SocialMedias';

import logoDark from '@/public/logo-image-light.png';
import Wrapper from './Wrapper';
import Grid from './Grid';

function Footer() {
  return (
    <footer>
      <Wrapper className="pb-5 pt-20 text-light sm:pt-24">
        <Grid>
          <Image
            alt="main logo"
            className="col-span-2 h-auto lg:col-start-auto"
            src={logoDark}
          />
          <div className="col-span-4 text-darker sm:col-span-10 sm:gap-2 sm:grid sm:grid-cols-2 sm:text-lg lg:gap-5 lg:col-span-9 lg:col-start-4">
            <div className="pb-6 sm:pb-0">
              <h4 className="font-black pb-1 mb-2 border-b-2 border-darker  uppercase md:mr-8 lg:mb-4">
                Liens rapides
              </h4>

              <Pages className="flex flex-col gap-1" />
            </div>
            <div>
              <h4 className="font-black pb-1 mb-2 border-b-2 border-darker  uppercase md:mr-8 lg:mb-4">
                Réseaux sociaux
              </h4>
              <SocialMedias className="flex flex-col gap-1" />
            </div>
          </div>
          <Copyright className="col-span-6 pt-12 text-center sm:col-span-12 sm:pt-16" />
        </Grid>
      </Wrapper>
    </footer>
  );
}

export default Footer;
