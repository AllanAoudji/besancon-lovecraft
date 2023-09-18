import DrawerOpenLink from './DrawerOpenLink';
import Pages from './Pages';
import Logo from './Logo';
import Wrapper from './Wrapper';

function Header() {
  return (
    <header className="h-24 sticky top-0 w-full z-30 [&_div]:h-full">
      <Wrapper className="flex items-center justify-between">
        <DrawerOpenLink color="dark" className="md:hidden" />
        <Logo className="h-20" color="dark" />
        <Pages
          className="hidden space-x-3 text-darker font-bold items-center md:flex"
          headerPage={true}
        />
      </Wrapper>
    </header>
  );
}

export default Header;
