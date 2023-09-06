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
      <Pages className="flex-col font-bold gap-1 pt-8 text-light text-xl [&_a]:border-b-2 [&_a]:border-light [&_a]:border-opacity-60 [&_a]:pb-2 [&_a]:pt-3 first:[&_a]:border-t-2" />
      <SocialMedias className="gap-4 grow pt-4 text-light text-xl" />
      <Copyright className="text-light" />
    </div>
  );
}

export default Drawer;
