'use client';

import { inter } from '@src/utils/fonts';
import { AnimationControls, motion } from 'framer-motion';

type Props = {
  animate: AnimationControls;
  categories:
    | {
        name: string;
        slug: string;
        title: string;
      }[]
    | null;
  className?: string;
};

function HomeHeaderCategories({ animate, categories, className = '' }: Props) {
  return (
    <div
      className={`font-bold overflow-hidden text-dark ${className} ${inter.className}`}
    >
      <motion.div animate={animate}>
        {!!categories &&
          categories
            .slice(0, 2)
            .map((category, index, array) => (
              <span key={category.slug}>
                {category.name + (index < array.length - 1 ? ', ' : '')}
              </span>
            ))}
        {!!categories && categories.length > 2 && (
          <span>
            , <span className="text-light">+{categories.length - 2}</span>
          </span>
        )}
      </motion.div>
    </div>
  );
}

export default HomeHeaderCategories;
