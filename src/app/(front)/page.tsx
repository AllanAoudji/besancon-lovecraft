import PageContainer from '@src/components/PageContainer';
import Posts from '@src/components/Posts';
import { getPosts } from '@/sanity/sanity.queries';
import HomeHeader from '@src/components/HomeHeader';
import HomeAbout from '@src/components/HomeAbout';
import InstaFeeds from '@src/components/InstaFeeds';
import NewsLetter from '@src/components/NewsLetter';
import Title from '@src/components/Title';
import Grid from '@src/components/Grid';

type Props = {
  searchParams: {
    drawer: string | undefined;
  };
};

export const revalidate = 0;

export default async function Home({ searchParams: { drawer } }: Props) {
  const headerPost = await getPosts(new Date().toISOString(), '', {
    numToFetch: 5,
  });
  let posts: Post[] = [];

  if (headerPost.length) {
    posts = await getPosts(new Date().toISOString(), '');
  }

  return (
    <PageContainer
      header={
        <>
          <HomeHeader posts={headerPost} />
          <HomeAbout />
        </>
      }
      footer={
        <>
          <InstaFeeds />
          <NewsLetter />
        </>
      }
      drawer={drawer}
    >
      <Title
        className="py-12 text-center sm:pt-16 lg:py-24"
        color="dark"
        type="h2"
        uppercase={true}
      >
        Les derniers articles
      </Title>
      <Grid className="pb-12 sm:pb-16 lg:pb-24">
        <Posts posts={posts} />
      </Grid>
    </PageContainer>
  );
}
