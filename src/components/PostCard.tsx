import { bodoniModa } from '@src/utils/fonts';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  post: Post;
  showCategories?: boolean;
};

function PostCard({ post, showCategories = true }: Props) {
  return (
    <Link
      className="flex flex-col col-span-1 [&_img]:hover:scale-150"
      href={`/post/${post.slug}`}
    >
      {post.mainImage && post.mainImage.url && (
        <div className="overflow-hidden">
          <Image
            alt={post.mainImage.alt || post.title}
            blurDataURL={post.mainImage.metadata.lqip}
            className="duration-1000 h-full object-cover top-0 transition w-full"
            height={post.mainImage.metadata.dimensions.height}
            placeholder="blur"
            src={post.mainImage.url}
            width={post.mainImage.metadata.dimensions.width}
          />
        </div>
      )}
      {post.categories && showCategories && (
        <div className="flex gap-2 py-3 flex-wrap">
          {post.categories.slice(0, 2).map((category) => (
            <div
              className="flex items-center text-dark bg-light rounded-full px-2 text-sm"
              key={category.slug}
            >
              {category.name}
            </div>
          ))}
          {post.categories.length > 2 && (
            <div className="text-dark bg-light rounded-full px-2 text-sm flex items-center">
              +{post.categories.length - 2}
            </div>
          )}
        </div>
      )}
      <div className=" pt-3 grow">
        <h3 className={`font-bold text-light text-3xl ${bodoniModa.className}`}>
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

export default PostCard;
