import { AnimationControls, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  animate: AnimationControls;
  className?: string;
  image: {
    alt: string;
    metadata: ImageMetadata;
    url: string;
  };
  slug: string;
  title: string;
};

function HomeHeaderImage({
  animate,
  className = '',
  image,
  slug,
  title,
}: Props) {
  return (
    <div className="overflow-hidden">
      <motion.div animate={animate}>
        <Link href={`/post/${slug}`}>
          <div className={`relative ${className}`}>
            <Image
              alt={image.alt || title}
              blurDataURL={image.metadata.lqip}
              className="absolute duration-1000 h-full object-cover transition w-full hover:scale-110"
              height={image.metadata.dimensions.height}
              placeholder="blur"
              src={image.url}
              width={image.metadata.dimensions.width}
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default HomeHeaderImage;
