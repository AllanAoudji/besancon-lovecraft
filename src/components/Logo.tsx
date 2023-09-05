import Image from 'next/image';
import Link from 'next/link';

import logoDark from '@/public/logo-dark.png';
import logoLight from '@/public/logo-light.png';

type Props = {
  className?: string;
  color?: 'dark' | 'light';
};

function Logo({ className, color = 'light' }: Props) {
  return (
    <Link href="/">
      <Image
        alt="main logo"
        className={`w-auto ${className}`}
        src={color === 'dark' ? logoDark : logoLight}
      />
    </Link>
  );
}
export default Logo;
