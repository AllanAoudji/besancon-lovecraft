'use client';

import { AnimationControls, motion } from 'framer-motion';

type Props = {
  animate: AnimationControls;
  categories:
    | {
        name: string;
        title: string;
        slug: string;
      }[]
    | null;
  className?: string;
};

function HomeHeaderCategories({ animate, categories, className = '' }: Props) {
  if (!categories || !categories.length) {
    return;
  }

  return (
    <div
      className={`absolute font-light opacity-50 overflow-hidden text-light ${className}`}
    >
      <motion.div animate={animate}>
        {categories.slice(0, 2).map((category, i, array) => (
          <span key={category.slug}>
            {category.name + (i < array.length - 1 ? ', ' : '')}
          </span>
        ))}
        {categories.length > 2 && <span>, +{categories.length - 2}</span>}
      </motion.div>
    </div>
  );
}

export default HomeHeaderCategories;