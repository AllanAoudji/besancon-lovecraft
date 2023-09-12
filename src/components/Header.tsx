import DrawerOpenLink from './DrawerOpenLink';
// import Pages from './Pages';
import Logo from './Logo';
import Wrapper from './Wrapper';

function Header() {
  return (
    <header className="h-24 sticky top-0 w-full z-30 [&_div]:h-full">
      <Wrapper className="flex items-center justify-between">
        <DrawerOpenLink color="dark" />
        <Logo className="h-20" color="dark" />
        {/* <Pages className="hidden space-x-4 text-light text-lg" /> */}
      </Wrapper>
    </header>
  );
}

export default Header;
