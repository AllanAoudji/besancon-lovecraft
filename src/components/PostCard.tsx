import { bodoniModa } from '@src/utils/fonts';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  post: Post;
  showCategories?: boolean;
  variant?: 'small' | 'normal';
};

function PostCard({ post, showCategories = true, variant = 'normal' }: Props) {
  return (
    <Link
      className={`col-span-1 flex last-of-type:pb-0 [&_img]:hover:scale-150 ${
        variant === 'normal' ? 'flex-col pb-12' : 'justify-between pb-5'
      }`}
      href={`/post/${post.slug}`}
    >
      {post.mainImage && post.mainImage.url && (
        <div
          className={`overflow-hidden ${
            variant === 'normal' ? '' : 'basis-28 grow-0 h-28 mr-4 shrink-0'
          }`}
        >
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
      <div className={`grow text-light ${variant === 'normal' ? 'pt-3' : ''}`}>
        <div className="pb-4">
          <p className="opacity-50 text-xs first-letter:uppercase">
            {moment(post.publishedAt).fromNow()}
          </p>
          {post.categories && showCategories && (
            <div className="flex flex-wrap font-bold gap-2 text-light text-sm">
              {post.categories.slice(0, 2).map((category, index, array) => (
                <span key={category.slug}>
                  {category.name}
                  {index < array.length - 1 ? (
                    <span className="text-secondary">, </span>
                  ) : (
                    <span />
                  )}
                </span>
              ))}
              {post.categories.length > 2 && (
                <span>+{post.categories.length - 2}</span>
              )}
            </div>
          )}
        </div>
        <h3
          className={`font-bold text-light uppercase ${bodoniModa.className} ${
            variant === 'normal' ? 'text-3xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

export default PostCard;
