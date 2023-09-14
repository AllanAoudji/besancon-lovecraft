import { notFound } from 'next/navigation';

import PageContainer from '@src/components/PageContainer';
import RichPortableText from '@src/components/RichPortableText';
import { getPage } from '@/sanity/sanity.queries';
import { Metadata } from 'next';
import Grid from '@src/components/Grid';

export const revalidate = 0;

type Props = {
  params: { slug: string };
  searchParams: {
    drawer: string | undefined;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: `Allan Aoudji | ${page.name}`,
    description: 'single page',
  };
}

export default async function Page({
  params,
  searchParams: { drawer },
}: Props) {
  const page = await getPage(params.slug);

  if (page == null) {
    notFound();
  }

  return (
    <PageContainer drawer={drawer}>
      <h2 className="text-darker font-bold text-6xl pt-10 border-b-2 border-darker mb-8 pb-8 lg:text-8xl lg:mb-12 lg:pb-12 lg:pt-20 transition-all">
        {page.name}
      </h2>
      <Grid>
        {page.body && (
          <div className="col-span-6 border-b-2 border-darker pb-16 sm:col-span-12 sm:pb-24 transition-all">
            <RichPortableText value={page.body} />
          </div>
        )}
      </Grid>
    </PageContainer>
  );
}
