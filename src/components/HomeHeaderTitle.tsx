import { AnimationControls, motion } from 'framer-motion';

type Props = {
  animate: AnimationControls;
  className?: string;
  title: string;
};

function HomeHeaderTitle({ animate, className = '', title }: Props) {
  return (
    <div
      className={`overflow-hidden w-full text-darker font-black text-4xl pb-3 uppercase lg:text-5xl ${className}`}
    >
      <motion.h4 animate={animate}>{title}</motion.h4>
    </div>
  );
}

export default HomeHeaderTitle;
