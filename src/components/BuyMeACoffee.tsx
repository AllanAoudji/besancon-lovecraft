import BuyMeACoffeeButton from '@/public/BuyMeACoffeeButton.png';
import Image from 'next/image';
import Wrapper from './Wrapper';

function BuyMeACoffee() {
  return (
    <section>
      <Wrapper backgroundColor="dark" className="pt-20 pb-24 lg:pt-24 lg:pb-28">
        <div className="flex flex-col justify-center items-center gap-1 font-bold pb-10 text-lighter text-center transition-all lg:pb-12">
          <h3 className="text-3xl uppercase lg:text-4xl">
            Vous voulez soutenir le projet&#160;?
          </h3>
          <a
            href="https://www.buymeacoffee.com/allanaoudji"
            target="_blank"
            className="text-xl text-darker lg:text-2xl"
          >
            Offrez-moi un café 👋
          </a>
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.buymeacoffee.com/allanaoudji"
            target="_blank"
            className="block w-48"
          >
            <Image alt="Buy Me A Coffee Button" src={BuyMeACoffeeButton} />
          </a>
        </div>
      </Wrapper>
    </section>
  );
}

export default BuyMeACoffee;
