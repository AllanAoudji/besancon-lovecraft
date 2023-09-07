import { getPages } from '@/sanity/sanity.queries';
import PageCard from './PageCard';

type Props = {
  className?: string;
};

export const revalidate = 60;

async function Pages({ className = '' }: Props) {
  const pages = await getPages();

  return (
    <div className={`flex flex-wrap ${className}`}>
      {pages.map((page) => (
        <PageCard key={page.slug} page={page} />
      ))}
    </div>
  );
}

export default Pages;
