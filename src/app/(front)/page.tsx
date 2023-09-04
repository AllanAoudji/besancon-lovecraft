import PageContainer from '@src/components/PageContainer';
import Posts from '@src/components/Posts';
import { getPosts } from '@/sanity/sanity.queries';
import HomeHeader from '@src/components/HomeHeader';

type Props = {
  searchParams: {
    drawer: string | undefined;
  };
};

export default async function Home({ searchParams: { drawer } }: Props) {
  const firstPosts = await getPosts(new Date().toISOString(), '', {
    firstsPost: true,
  });
  let posts: Post[] = [];

  if (firstPosts.length) {
    posts = [
      ...(await getPosts(
        firstPosts[firstPosts.length - 1].publishedAt,
        firstPosts[firstPosts.length - 1].slug
      )),
    ];
  }

  return (
    <>
      <PageContainer
        className="gap-x-8 gap-y-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        header={<HomeHeader posts={firstPosts} />}
        drawer={drawer}
      >
        <Posts posts={posts} />
      </PageContainer>
    </>
  );
}
