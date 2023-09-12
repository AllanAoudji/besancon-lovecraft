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
      className={`col-span-1 last-of-type:pb-12 [&_img]:hover:scale-150 ${
        variant === 'normal'
          ? 'flex flex-col pb-12'
          : 'gap-2 grid grid-cols-6 pb-3'
      }`}
      href={`/post/${post.slug}`}
    >
      {post.mainImage && post.mainImage.url && (
        <div
          className={`overflow-hidden ${
            variant === 'normal' ? '' : 'col-span-2 aspect-square'
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
      <div className={`text-sm ${variant === 'normal' ? '' : 'col-span-4'}`}>
        <div className={`text-light ${variant === 'normal' ? 'pt-2' : ''}`}>
          <p className="first-letter:uppercase">
            {moment(post.publishedAt).fromNow()}
          </p>
          {post.categories && showCategories && (
            <div className="font-bold text-darker">
              {post.categories.slice(0, 2).map((category, index, array) => (
                <span key={category.slug}>
                  {category.name + (index < array.length - 1 ? ', ' : '')}
                </span>
              ))}
              {post.categories.length > 2 && (
                <span className="text-dark">
                  , +{post.categories.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
        <h3
          className={`font-bold text-darker ${bodoniModa.className} ${
            variant === 'normal' ? 'pt-2 text-4xl' : 'pt-1 text-xl'
          }`}
        >
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

export default PostCard;
