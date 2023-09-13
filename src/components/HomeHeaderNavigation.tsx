import { MouseEventHandler } from 'react';

type Props = {
  className?: string;
  index: number;
  onClickNext: MouseEventHandler<HTMLButtonElement>;
  onClickPrevious: MouseEventHandler<HTMLButtonElement>;
  postsLength: number;
};

function HomeHeaderNavigation({
  className = '',
  index,
  onClickNext,
  onClickPrevious,
  postsLength,
}: Props) {
  if (postsLength <= 1) {
    return null;
  }

  return (
    <div className={`text-light w-full ${className}`}>
      <div className="flex items-center justify-between lg:text-lg">
        <span>
          {index + 1}
          {' /// '}
          {postsLength}
        </span>
        <div className="text-lg font-bold lg:text-xl">
          <button className="uppercase" onClick={onClickPrevious}>
            précédent
          </button>
          {' / '}
          <button className="uppercase" onClick={onClickNext}>
            suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeHeaderNavigation;
