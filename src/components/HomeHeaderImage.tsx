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
    <div className={`absolute ${className}`}>
      <motion.div animate={animate} className="overflow-hidden relative w-full">
        <Link href={`/post/${slug}`}>
          <Image
            alt={image.alt || title}
            blurDataURL={image.metadata.lqip}
            className="absolute duration-1000 h-full object-cover transition-all w-full hover:scale-110"
            height={image.metadata.dimensions.height}
            placeholder="blur"
            src={image.url}
            width={image.metadata.dimensions.width}
          />
        </Link>
      </motion.div>
    </div>
  );
}

export default HomeHeaderImage;
