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
      className={`col-span-6 [&_img]:hover:scale-105 sm:col-span-6 lg:col-span-3 ${
        variant === 'normal' || showCategories
          ? 'flex flex-col pb-12'
          : 'gap-2 grid grid-cols-6 pb-3 sm:gap-0 sm:flex sm:flex-col sm:pb-12'
      }`}
      href={`/post/${post.slug}`}
    >
      {!!post.mainImage && !!post.mainImage.url && post.mainImage.metadata && (
        <div
          className={`overflow-hidden ${
            variant === 'normal' || showCategories
              ? 'mb-2'
              : 'aspect-square col-span-2 sm:aspect-auto sm:col-span-full sm:mb-2'
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
      <div
        className={`text-sm ${
          variant === 'normal' || showCategories
            ? ''
            : 'col-span-4 sm:col-span-full'
        }`}
      >
        <div
          className={`text-light ${
            variant === 'normal' || showCategories
              ? 'border-b-2 border-darker pb-2 mb-1'
              : 'pb-1 sm:border-b-2 sm:border-darker sm:pb-2 sm:mb-1'
          }`}
        >
          <p
            className={`italic first-letter:uppercase lg:text-base ${
              variant === 'normal' || showCategories ? 'text-lg' : 'sm:text-lg'
            }`}
          >
            {moment(post.publishedAt).fromNow()}
          </p>
          {post.categories && showCategories && (
            <div
              className={`font-black text-darker lg:text-base ${
                variant === 'normal' || showCategories
                  ? 'text-lg'
                  : 'sm:text-lg'
              }`}
            >
              {post.categories.slice(0, 2).map((category, index, array) => (
                <span key={category.slug}>
                  {category.name + (index < array.length - 1 ? ', ' : '')}
                </span>
              ))}
              {post.categories.length > 2 && (
                <span className="text-dark">
                  {' +'}
                  {post.categories.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
        <h3
          className={`font-light text-darker ${
            variant === 'normal' || showCategories
              ? 'text-2xl'
              : 'text-xl sm:text-2xl'
          }`}
        >
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

export default PostCard;
