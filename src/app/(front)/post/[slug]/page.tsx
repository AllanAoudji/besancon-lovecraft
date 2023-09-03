import { notFound } from 'next/navigation';

import NextPostCard from '@src/components/NextPostCard';
import PageContainer from '@src/components/PageContainer';
import RichPortableText from '@src/components/RichPortableText';
import WorkHeader from '@src/components/WorkHeader';
import { getPost } from '@/sanity/sanity.queries';
import { Metadata } from 'next';
import Wrapper from '@src/components/Wrapper';
import Title from '@src/components/Title';

type Props = {
  params: { slug: string };
  searchParams: {
    drawer: string | undefined;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = await getPost(params.slug);

  if (!work) {
    return {};
  }

  return {
    title: `Allan Aoudji | ${work.title}`,
    description: 'single work pages',
  };
}

async function Post({ params, searchParams: { drawer } }: Props) {
  const post = await getPost(params.slug);

  if (post == null) {
    notFound();
  }

  return (
    <PageContainer
      drawer={drawer}
      footer={
        <NextPostCard className="pt-52 sm:pt-72" nextPost={post.nextPost} />
      }
      header={
        <Wrapper>
          <Title className="md:col-span-4 lg:col-span-3">{post.title}</Title>
        </Wrapper>
      }
    >
      <WorkHeader post={post} />
      <div>{post.body && <RichPortableText value={post.body} />}</div>
    </PageContainer>
  );
}

export default Post;
