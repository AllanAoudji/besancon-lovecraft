import { instagramAccessToken } from '@/lib/environment';
import { bodoniModa } from '@src/utils/fonts';
import Image from 'next/image';

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
      before: string;
      after: string;
    };
    next: string;
  };
};

const INSTAGRAM_LINK = 'https://www.instagram.com/allanjouannet/';

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
      <div className="bg-light pb-16">
        <div className="py-16 flex items-center justify-center">
          <h4
            className={`font-bold px-6 text-3xl ${bodoniModa.className} text-center`}
          >
            Suivez moi sur{' '}
            <a
              className="font-black text-secondary border-b-4 border-secondary"
              target="_blank"
              href={INSTAGRAM_LINK}
            >
              Instagram
            </a>
            :
          </h4>
        </div>
        <a
          target="_blank"
          href={INSTAGRAM_LINK}
          className="grid grid-cols-2 gap-1 px-2"
        >
          {data.data.map((post) => (
            <div
              key={post.id}
              className="relative grow aspect-square bg-secondary"
            >
              <Image
                src={
                  post.media_type === 'VIDEO'
                    ? post.thumbnail_url
                    : post.media_url
                }
                alt="image"
                sizes="40vw"
                className="object-cover"
                fill
              />
            </div>
          ))}
        </a>
      </div>
    );
  } catch (e) {
    return null;
  }
}

export default InstaFeeds;
