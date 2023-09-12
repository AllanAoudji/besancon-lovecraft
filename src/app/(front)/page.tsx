import PageContainer from '@src/components/PageContainer';
import Posts from '@src/components/Posts';
import { getPosts } from '@/sanity/sanity.queries';
import HomeHeader from '@src/components/HomeHeader';
import HomeAbout from '@src/components/HomeAbout';
import { bodoniModa } from '@src/utils/fonts';
import InstaFeeds from '@src/components/InstaFeeds';
import NewsLetter from '@src/components/NewsLetter';

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
      <h4
        className={`font-bold leading-[3rem] py-12 text-4xl text-center text-dark uppercase sm:pt-16 ${bodoniModa.className}`}
      >
        Les derniers articles
      </h4>
      <div className="gap-0 grid grid-cols-1 pb-12 sm:gap-2 sm:grid-cols-2 sm:pb-16">
        <Posts posts={posts} />
      </div>
    </PageContainer>
  );
}
