'use client';

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
    <div className={`overflow-hidden text-darker ${className}`}>
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
          <span className="text-dark">, +{categories.length - 2}</span>
        )}
      </motion.div>
    </div>
  );
}

export default HomeHeaderCategories;
