'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import hamburgerMenuDark from '@/public/hamburger-menu-dark.png';
import hamburgerMenuLight from '@/public/hamburger-menu-light.png';
import useWindowSize from '@src/hooks/useWindowSize';
import { Route } from 'next';

type Props = {
  className?: string;
  color?: 'dark' | 'light';
};

function DrawerOpenLink({ className = '', color = 'light' }: Props) {
  const searchParams = useSearchParams();
  const { width } = useWindowSize();
  const pathname = usePathname();
  const router = useRouter();

  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.replace(pathname as Route, { scroll: false });
      }
    },
    [router, pathname]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    if (!width) return;
    if (width > 768) {
      router.replace(pathname as Route, { scroll: false });
    }
  }, [width, router, pathname]);

  useEffect(() => {
    if (searchParams.get('drawer') == 'true') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [searchParams]);

  return (
    <Link
      className={className}
      href={{ query: { drawer: true } }}
      replace={true}
      scroll={false}
    >
      <Image
        alt="hamburger menu"
        className="h-8 w-auto"
        src={color === 'dark' ? hamburgerMenuDark : hamburgerMenuLight}
      />
    </Link>
  );
}

export default DrawerOpenLink;
