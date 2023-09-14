import { getPost, getPosts } from '@/sanity/sanity.queries';
import Grid from '@src/components/Grid';
import LinkImage from '@src/components/LinkImage';
import PageContainer from '@src/components/PageContainer';
import Posts from '@src/components/Posts';
import RichPortableText from '@src/components/RichPortableText';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
    <PageContainer drawer={drawer}>
      <h2 className="border-b-2 text-center font-bold pb-8 pt-10 text-6xl text-darker transition-all lg:pb-12 lg:pt-20">
        {post.title}
      </h2>
      <div className="mb-12 overflow-hidden pb-2/3 relative transition-all lg:mb-24">
        <LinkImage
          alt={post.mainImage.alt || post.title}
          blurDataURL={post.mainImage.metadata.lqip}
          className="absolute duration-1000 h-full object-cover top-0 w-full"
          height={post.mainImage.metadata.dimensions.height}
          placeholder="blur"
          src={post.mainImage.url}
          width={post.mainImage.metadata.dimensions.width}
        />
      </div>
      <Grid className="border-b-2 border-darker md:px-28 lg:px-36">
        {post.body && (
          <div className="col-span-6 pb-16 transition-all sm:col-span-12 sm:pb-24">
            <RichPortableText value={post.body} />
          </div>
        )}
      </Grid>
      <h3 className="font-black pb-20 pt-24 text-3xl text-center text-darker uppercase lg:pt-28 lg:text-4xl">
        Les derniers articles
      </h3>
      <Grid>
        <Posts posts={posts} />
      </Grid>
    </PageContainer>
  );
}
