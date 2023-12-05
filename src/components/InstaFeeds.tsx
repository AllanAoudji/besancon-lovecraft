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

const INSTAGRAM_LINK = 'https://www.instagram.com/les.suivants.de.la.vouivre/';

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
      <section>
        <Wrapper
          backgroundColor="darker"
          className="pt-20 pb-24 lg:pt-28 lg:pb-32"
        >
          <div className="flex flex-col justify-center items-center gap-1 font-bold pb-10 text-lighter text-center transition-all lg:pb-20">
            <h3 className="text-3xl uppercase lg:text-4xl">
              Suivez le projet sur{' '}
              <a className="text-dark" href={INSTAGRAM_LINK} target="_blank">
                Instagram
              </a>
            </h3>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              className="text-xl lg:text-2xl text-dark"
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
                    width={1440}
                    height={1440}
                    src={
                      post.media_type === 'VIDEO'
                        ? post.thumbnail_url
                        : post.media_url
                    }
                  />
                </div>
              ))}
            </Grid>
          </a>
        </Wrapper>
      </section>
    );
  } catch (e) {
    return null;
  }
}

export default InstaFeeds;
