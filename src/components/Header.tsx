import DrawerOpenLink from './DrawerOpenLink';
import Pages from './Pages';
import Logo from './Logo';

function Header() {
  return (
    <header className="sticky top-0 w-full z-30 h-20">
      <div className="duration-300 flex items-center justify-center mx-auto px-12 py-5 transition-all sm:justify-between sm:pt-8 md:max-w-6xl">
        <Logo className="h-8" />
        <DrawerOpenLink className="sm:hidden" />
        <Pages className="hidden space-x-6 text-light text-xl sm:block" />
      </div>
    </header>
  );
}

export default Header;
