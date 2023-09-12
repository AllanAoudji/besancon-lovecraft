import { AnimationControls, motion } from 'framer-motion';
import Title from './Title';

type Props = {
  animate: AnimationControls;
  className?: string;
  title: string;
};

function HomeHeaderTitle({ animate, className = '', title }: Props) {
  return (
    <Title
      className={`overflow-hidden w-full ${className}`}
      size="normal"
      type="h3"
      uppercase={true}
    >
      <motion.span animate={animate} className="block">
        {title}
      </motion.span>
    </Title>
  );
}

export default HomeHeaderTitle;
