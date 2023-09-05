import Copyright from './Copyright';
import DrawerCloseLink from './DrawerCloseLink';
import Logo from './Logo';
import Pages from './Pages';
import SocialMedias from './SocialMedias';

type Props = {
  open: boolean;
};

function Drawer({ open }: Props) {
  return (
    <div
      className={`absolute bg-secondary duration-700 ease-in-out flex flex-col h-full p-6 top-0 transition-all w-3/4 ${
        open ? 'left-0 opacity-100' : '-left-full opacity-0'
      }`}
    >
      <div className="flex items-center justify-between">
        <Logo className="h-10" />
        <DrawerCloseLink />
      </div>
      <Pages className="flex-col gap-8 grow items-center justify-center text-4xl text-light" />
      <SocialMedias className="gap-4 pb-10" />
      <Copyright className="text-light" />
    </div>
  );
}

export default Drawer;
