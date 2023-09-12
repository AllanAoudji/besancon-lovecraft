import { instagramAccessToken } from '@/lib/environment';
import Image from 'next/image';
import Wrapper from './Wrapper';
import Title from './Title';

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
      <Wrapper backgroundColor="dark" className="py-12 sm:py-16">
        <Title className="pb-12 sm:text-center" type="h2" uppercase={true}>
          {' '}
          Suivez le projet sur{' '}
          <a
            className="border-b-4 border-darker"
            href={INSTAGRAM_LINK}
            target="_blank"
          >
            Instagram
          </a>
        </Title>
        <a
          className="gap-2 grid grid-cols-2 sm:grid-cols-4"
          href={INSTAGRAM_LINK}
          target="_blank"
        >
          {data.data.map((post) => (
            <div className="aspect-square bg-lighter relative" key={post.id}>
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
        </a>
      </Wrapper>
    );
  } catch (e) {
    return null;
  }
}

export default InstaFeeds;
