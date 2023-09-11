import { bodoniModa } from '@src/utils/fonts';
import { AnimationControls, motion } from 'framer-motion';

type Props = {
  animate: AnimationControls;
  className?: string;
  title: string;
};

function HomeHeaderTitle({ animate, className = '', title }: Props) {
  return (
    <div
      className={`overflow-hidden text-3xl text-light w-full sm:text-4xl ${className}`}
    >
      <motion.h3
        animate={animate}
        className={`font-bold uppercase ${bodoniModa.className}`}
      >
        {title}
      </motion.h3>
    </div>
  );
}

export default HomeHeaderTitle;
