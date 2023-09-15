import { instagramAccessToken } from '@/lib/environment';
import Image from 'next/image';
import Wrapper from './Wrapper';
import Grid from './Grid';

type Data =
  | {
      id: string;
      media_type: 'IMAGE' | 'CAROUSEL_ALBUM';
      media_url: string;
    }
  | {
      id: string;
      media_type: 'VIDEO';
      media_url: string;
      thumbnail_url: string;
    };

type InstaFeeds = {
  data: Data[];
  paging: {
    cursors: {
      after: string;
      before: string;
    };
    next: string;
  };
};

const INSTAGRAM_LINK = 'https://www.instagram.com/allanjouannet/';

export const revalidate = 3600;

async function getData(): Promise<InstaFeeds> {
  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url&limit=4&access_token=${instagramAccessToken}`
  );

  return res.json();
}

async function InstaFeeds() {
  try {
    const data = await getData();

    if (!data.data.length) {
      return null;
    }

    return (
      <Wrapper backgroundColor="darker" className="py-24 lg:py-28">
        <div className="flex flex-col justify-center items-center gap-1 font-bold pb-10 text-lighter text-center transition-all lg:pb-20">
          <h3 className="text-3xl uppercase">
            Suivez le projet sur{' '}
            <a className="text-dark" href={INSTAGRAM_LINK} target="_blank">
              Instagram
            </a>
          </h3>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            className="text-xl text-dark"
          >
            #lessuivantsdelavouivre
          </a>
        </div>
        <a
          className="block col-span-6 sm:col-span-12"
          href={INSTAGRAM_LINK}
          target="_blank"
        >
          <Grid>
            {data.data.map((post) => (
              <div
                className="aspect-square bg-lighter relative col-span-3"
                key={post.id}
              >
                <Image
                  alt="image"
                  className="object-cover"
                  fill
                  src={
                    post.media_type === 'VIDEO'
                      ? post.thumbnail_url
                      : post.media_url
                  }
                  sizes="40vw"
                />
              </div>
            ))}
          </Grid>
        </a>
      </Wrapper>
    );
  } catch (e) {
    return null;
  }
}

export default InstaFeeds;
