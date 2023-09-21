import BuyMeACoffeeButton from '@/public/BuyMeACoffeeButton.png';
import Image from 'next/image';
import Wrapper from './Wrapper';
import Grid from './Grid';

function BuyMeACoffee() {
  return (
    <section>
      <Wrapper
        border="bottom"
        borderColor="darker"
        backgroundColor="dark"
        className="py-16 lg:py-24"
      >
        <div className="flex flex-col justify-center items-center gap-1 font-bold pb-10 text-lighter text-center transition-all lg:pb-12">
          <h3 className="text-3xl uppercase">
            Vous voulez soutenir le projet&#160;?
          </h3>
          <a
            href="https://www.buymeacoffee.com/allanaoudji"
            target="_blank"
            className="text-xl text-darker"
          >
            😊 Achetez moi un café 👋
          </a>
        </div>
        <Grid>
          <a
            href="https://www.buymeacoffee.com/allanaoudji"
            target="_blank"
            className="col-span-2 col-start-3 sm:col-span-2 sm:col-start-6"
          >
            <Image alt="Buy Me A Coffee Button" src={BuyMeACoffeeButton} />
          </a>
        </Grid>
      </Wrapper>
    </section>
  );
}

export default BuyMeACoffee;
