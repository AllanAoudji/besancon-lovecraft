import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import Title from './Title';
import { inter } from '@src/utils/fonts';

type Props = {
  post: Post;
  showCategories?: boolean;
  variant?: 'small' | 'normal';
};

function PostCard({ post, showCategories = true, variant = 'normal' }: Props) {
  return (
    <Link
      className={`col-span-6 [&_img]:hover:scale-150 sm:col-span-6 lg:col-span-3 ${
        variant === 'normal'
          ? 'flex flex-col pb-12'
          : 'gap-2 grid grid-cols-6 pb-3 sm:gap-0 sm:flex sm:flex-col sm:pb-12'
      }`}
      href={`/post/${post.slug}`}
    >
      {post.mainImage && post.mainImage.url && (
        <div
          className={`overflow-hidden ${
            variant === 'normal'
              ? ''
              : 'aspect-square col-span-2 sm:aspect-auto sm:col-span-full'
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
          variant === 'normal' ? '' : 'col-span-4 sm:col-span-full'
        }`}
      >
        <div
          className={`text-light ${variant === 'normal' ? 'pt-2' : 'sm:pt-2'}`}
        >
          <p className="italic first-letter:uppercase">
            {moment(post.publishedAt).fromNow()}
          </p>
          {post.categories && showCategories && (
            <div className={`font-bold text-darker ${inter.className}`}>
              {post.categories.slice(0, 2).map((category, index, array) => (
                <span key={category.slug}>
                  {category.name + (index < array.length - 1 ? ', ' : '')}
                </span>
              ))}
              {post.categories.length > 2 && (
                <span>
                  ,{' '}
                  <span className="text-dark">
                    +{post.categories.length - 2}
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
        <Title
          className={`lg:text-3xl sm:pt-2 ${
            variant === 'small' ? 'sm:text-4xl' : ''
          }`}
          type="h3"
          size={variant === 'normal' ? 'normal' : 'small'}
        >
          {post.title}
        </Title>
      </div>
    </Link>
  );
}

export default PostCard;
