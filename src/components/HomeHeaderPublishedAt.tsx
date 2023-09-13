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
      className={`absolute italic overflow-hidden text-light lg:text-lg ${className}`}
    >
      <motion.span animate={animate} className="block first-letter:uppercase">
        {moment(publishedAt, 'YYYYMMDD').fromNow() + '.'}
      </motion.span>
    </div>
  );
}

export default HomeHeaderPublishedAt;
