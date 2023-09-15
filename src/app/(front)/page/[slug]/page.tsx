import { notFound } from 'next/navigation';

import PageContainer from '@src/components/PageContainer';
import RichPortableText from '@src/components/RichPortableText';
import { getPage } from '@/sanity/sanity.queries';
import { Metadata } from 'next';
import SubPageInnerContainer from '@src/components/SubPageInnerContainer';
import SubPageHeader from '@src/components/SubPageHeader';

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
    title: `Les Suivants de la Vouivre | ${page.name}`,
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
    <PageContainer className="pt-8 sm:pt-10 lg:pt-20" drawer={drawer}>
      <SubPageHeader title={page.name} image={page.mainImage} />
      <SubPageInnerContainer>
        {page.body && <RichPortableText value={page.body} />}
      </SubPageInnerContainer>
    </PageContainer>
  );
}
