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
      <div className="bg-light py-16">
        <h4 className={`font-bold px-6 text-2xl ${bodoniModa.className} pb-10`}>
          Suivez moi sur Instagram:{' '}
          <span className="font-light">@allanaoudji</span>
        </h4>
        <a
          target="_blank"
          href="https://www.instagram.com/allanjouannet/"
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
