import Copyright from './Copyright';
import Pages from './Pages';
import SocialMedias from './SocialMedias';

function Footer() {
  return (
    <footer className="flex flex-col gap-20 pb-5 pt-48 px-5 text-light sm:px-28">
      <div className="grid grid-cols-2 gap-4 font-sm sm:font-base">
        <Pages className="flex-col gap-2 sm:gap-4" />
        <SocialMedias className="flex-col gap-2 sm:gap-4" />
      </div>
      <Copyright className="text-center" />
    </footer>
  );
}

export default Footer;
