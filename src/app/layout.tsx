import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Les Suivants de la Vouivre',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <html lang="fr">{children}</html>;
};

export default RootLayout;
