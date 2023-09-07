import DrawerOpenLink from './DrawerOpenLink';
import Pages from './Pages';
import Logo from './Logo';

function Header() {
  return (
    <header className="h-20 sticky top-0 w-full z-30">
      <div className="duration-300 flex h-full items-center justify-between mx-auto px-6 transition-all sm:px-12 md:max-w-6xl">
        <DrawerOpenLink />
        <Logo className="h-6 z-10" />
        <Pages className="hidden space-x-4 text-light text-lg" />
      </div>
    </header>
  );
}

export default Header;
