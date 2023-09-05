import { bodoniModa } from '@src/utils/fonts';
import { AnimationControls, motion } from 'framer-motion';

type Props = {
  animate: AnimationControls;
  className?: string;
  title: string;
};

function HomeHeaderTitle({ animate, className = '', title }: Props) {
  return (
    <div className={`absolute overflow-hidden text-light z-10 ${className}`}>
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
