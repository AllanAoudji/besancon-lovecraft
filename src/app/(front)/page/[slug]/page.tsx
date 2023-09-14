import { notFound } from 'next/navigation';

import PageContainer from '@src/components/PageContainer';
import RichPortableText from '@src/components/RichPortableText';
import { getPage } from '@/sanity/sanity.queries';
import { Metadata } from 'next';
import Grid from '@src/components/Grid';
import LinkImage from '@src/components/LinkImage';

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
      <h2 className="border-b-2 border-darker font-bold mb-8 pb-8 pt-10 text-6xl text-darker transition-all lg:mb-12 lg:pb-12 lg:pt-20">
        {page.name}
      </h2>
      {!!page.mainImage &&
        !!page.mainImage.url &&
        !!page.mainImage.metadata && (
          <div className="mb-12 overflow-hidden pb-2/3 relative transition-all lg:mb-24">
            <LinkImage
              alt={page.mainImage.alt || page.name}
              blurDataURL={page.mainImage.metadata.lqip}
              className="absolute duration-1000 h-full object-cover top-0 w-full"
              height={page.mainImage.metadata.dimensions.height}
              placeholder="blur"
              src={page.mainImage.url}
              width={page.mainImage.metadata.dimensions.width}
            />
          </div>
        )}
      <Grid className="md:px-28 lg:px-36">
        {page.body && (
          <div className="border-b-2 border-darker col-span-6 pb-16 transition-all sm:col-span-12 sm:pb-24">
            <RichPortableText value={page.body} />
          </div>
        )}
      </Grid>
    </PageContainer>
  );
}
