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
      className={`absolute bg-secondary duration-700 ease-in-out flex flex-col h-full p-4 top-0 transition-all w-3/4 ${
        open ? 'left-0 opacity-100' : '-left-full opacity-0'
      }`}
    >
      <div className="flex items-center justify-between">
        <Logo className="h-10" />
        <DrawerCloseLink />
      </div>
      <Pages className="flex-col gap-1 text-xl font-bold text-light pt-8 [&_a]:border-b-2 [&_a]:border-light [&_a]:pb-2 [&_a]:pt-3 [&_a]:border-opacity-60 first:[&_a]:border-t-2" />
      <SocialMedias className="gap-4 text-xl text-light grow pt-4" />
      <Copyright className="text-light" />
    </div>
  );
}

export default Drawer;
