import DrawerOpenLink from './DrawerOpenLink';
import Pages from './Pages';
import Logo from './Logo';

function Header() {
  return (
    <header className="h-20 sticky top-0 w-full z-30">
      <div className="duration-300 flex items-center justify-center mx-auto px-12 py-5 transition-all sm:justify-between sm:pt-8 md:max-w-6xl">
        <Logo className="h-8" />
        <DrawerOpenLink className="sm:hidden" />
        <Pages className="hidden space-x-4 text-light text-lg sm:block" />
      </div>
    </header>
  );
}

export default Header;
