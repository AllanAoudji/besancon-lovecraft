import { getHeaderPage, getPages } from '@/sanity/sanity.queries';
import PageCard from './PageCard';

type Props = {
  className?: string;
  headerPage?: boolean;
};

export const revalidate = 0;

async function Pages({ className = '', headerPage = false }: Props) {
  let pages: Page[] = [];

  if (headerPage) {
    pages = await getHeaderPage();
  } else {
    pages = await getPages();
  }

  return (
    <div className={`flex flex-wrap ${className}`}>
      {pages.map((page) => (
        <PageCard key={page.slug} page={page} />
      ))}
    </div>
  );
}

export default Pages;
