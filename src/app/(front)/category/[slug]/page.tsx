import { notFound } from 'next/navigation';

import { getCategory } from '@/sanity/sanity.queries';
import PageContainer from '@src/components/PageContainer';
import Posts from '@src/components/Posts';
import { Metadata } from 'next';
import Grid from '@src/components/Grid';
import SubPageHeader from '@src/components/SubPageHeader';

type Props = {
  params: { slug: string };
  searchParams: {
    drawer: string | undefined;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.slug, new Date().toISOString(), '');

  if (!category) {
    return {};
  }

  return {
    title: `Allan Aoudji | ${category.name}`,
    description: 'single category page',
  };
}

async function Categorypage({ params, searchParams: { drawer } }: Props) {
  const category = await getCategory(params.slug, new Date().toISOString(), '');

  if (!category || category.posts.length == 0) {
    notFound();
  }

  return (
    <PageContainer className="pt-8 sm:pt-10 lg:pt-16" drawer={drawer}>
      <SubPageHeader title={category.title} />
      <Grid>
        <Posts
          categorySlug={category.slug}
          posts={category.posts}
          showCategories={false}
        />
      </Grid>
    </PageContainer>
  );
}

export default Categorypage;
