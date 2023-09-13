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
      className={`absolute bg-darker font-bold duration-700 ease-in-out flex flex-col h-full py-6 px-4 top-0 transition-all w-3/4 ${
        open ? 'left-0 opacity-100' : '-left-full opacity-0'
      }`}
    >
      <div className="flex items-center justify-between">
        <Logo className="h-10" />
        <DrawerCloseLink className="h-6" />
      </div>
      <Pages className="flex-col gap-1 pt-16 text-lighter text-xl [&_a]:border-b-2 [&_a]:border-lighter [&_a]:border-opacity-40 [&_a]:pb-3 [&_a]:pt-4 first:[&_a]:border-t-2" />
      <SocialMedias className="flex-col grow pt-4 text-lighter text-xl [&_a]:py-3" />
      <Copyright className="text-lighter [&_a]:border-lighter" />
    </div>
  );
}

export default Drawer;
