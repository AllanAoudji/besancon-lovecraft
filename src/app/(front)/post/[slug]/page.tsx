import { getPost, getPosts } from '@/sanity/sanity.queries';
import Grid from '@src/components/Grid';
import PageContainer from '@src/components/PageContainer';
import Posts from '@src/components/Posts';
import RichPortableText from '@src/components/RichPortableText';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SubPageInnerContainer from '@src/components/SubPageInnerContainer';
import SubPageHeader from '@src/components/SubPageHeader';

type Props = {
  params: { slug: string };
  searchParams: {
    drawer: string | undefined;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: `Les Suivants de la Vouivre | ${post.title}`,
    description: 'single post',
  };
}

export default async function Page({
  params,
  searchParams: { drawer },
}: Props) {
  const post = await getPost(params.slug);

  if (post == null) {
    notFound();
  }

  const posts = await getPosts(new Date().toISOString(), '', {
    not: params.slug,
  });

  return (
    <PageContainer className="pt-8 sm:pt-10 lg:pt-20" drawer={drawer}>
      <SubPageHeader
        title={post.title}
        categories={post.categories}
        image={post.mainImage}
        publishedAt={post.publishedAt}
      />
      <SubPageInnerContainer>
        {post.body && <RichPortableText value={post.body} />}
      </SubPageInnerContainer>
      {!!posts.length && (
        <div className="border-t-2 border-darker">
          <h3 className="font-black pb-20 pt-24 text-3xl text-center text-darker uppercase lg:pt-28 lg:text-4xl">
            Les derniers articles
          </h3>
          <Grid>
            <Posts posts={posts} />
          </Grid>
        </div>
      )}
    </PageContainer>
  );
}
