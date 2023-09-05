import { AnimationControls, motion } from 'framer-motion';
import moment from 'moment';

moment.locale('fr');

type Props = {
  animate: AnimationControls;
  className?: string;
  publishedAt: string;
};

function HomeHeaderPublishedAt({
  animate,
  className = '',
  publishedAt,
}: Props) {
  return (
    <div
      className={`absolute opacity-50 overflow-hidden text-light  ${className}`}
    >
      <motion.span className="block first-letter:uppercase" animate={animate}>
        {moment(publishedAt, 'YYYYMMDD').fromNow() + '.'}
      </motion.span>
    </div>
  );
}

export default HomeHeaderPublishedAt;
