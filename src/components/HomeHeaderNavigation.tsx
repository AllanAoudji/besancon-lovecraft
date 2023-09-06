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
    <div className={`absolute flex items-stretch text-light ${className}`}>
      <div className="flex grow items-center justify-between">
        <span className="opacity-50 text-light text-xs">
          {index + 1}
          {' /// '}
          {postsLength}
        </span>
        <div>
          <button className="uppercase" onClick={onClickPrevious}>
            précédent
          </button>
          /
          <button className="uppercase" onClick={onClickNext}>
            suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeHeaderNavigation;
