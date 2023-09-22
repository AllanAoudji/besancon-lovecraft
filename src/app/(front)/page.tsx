import PageContainer from '@src/components/PageContainer';
import Posts from '@src/components/Posts';
import { getPosts } from '@/sanity/sanity.queries';
import HomeHeader from '@src/components/HomeHeader';
import HomeAbout from '@src/components/HomeAbout';
import InstaFeeds from '@src/components/InstaFeeds';
import NewsLetter from '@src/components/NewsLetter';
import Grid from '@src/components/Grid';
import BuyMeACoffee from '@src/components/BuyMeACoffee';

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
          <BuyMeACoffee />
        </>
      }
      drawer={drawer}
    >
      {!!posts.length && (
        <>
          <h3 className="font-black pb-20 pt-24 text-3xl text-center text-darker uppercase lg:pb-24 lg:pt-28 lg:text-4xl">
            Les derniers articles
          </h3>
          <Grid className="pb-12 sm:pb-16 lg:pb-24">
            <Posts posts={posts} />
          </Grid>
        </>
      )}
    </PageContainer>
  );
}
