import { getFirstPost } from '@/sanity/sanity.queries';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  className?: string;
  nextPost: NextPost | null;
};

type LinkImageProps = {
  post: NextPost;
};

function LinkImage({ post }: LinkImageProps) {
  return (
    <div className="mx-auto overflow-hidden sm:max-w-lg">
      <Link
        className="block pb-7/12 relative w-full [&_h3]:hover:scale-105 [&_img]:hover:brightness-50 [&_img]:hover:scale-100"
        href={`/work/${post.slug}`}
      >
        {post.mainImage && post.mainImage.url && (
          <Image
            alt={post.mainImage.alt || post.title}
            blurDataURL={post.mainImage.metadata.lqip}
            className="absolute brightness-[.3] duration-1000 h-full object-cover scale-105 top-0 transition w-full"
            height={post.mainImage.metadata.dimensions.height}
            placeholder="blur"
            src={post.mainImage.url}
            width={post.mainImage.metadata.dimensions.width}
          />
        )}
        <h3 className="absolute duration-1000 font-black left-1/2 text-6xl text-center text-light top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full">
          Next post
        </h3>
      </Link>
    </div>
  );
}

export const revalidate = 0;

async function NextPostCard({ className = '', nextPost }: Props) {
  if (!nextPost) {
    const firstPost = await getFirstPost();

    return (
      <div className={className}>
        <LinkImage post={firstPost} />
      </div>
    );
  }

  return (
    <div className={className}>
      <LinkImage post={nextPost} />
    </div>
  );
}

export default NextPostCard;
