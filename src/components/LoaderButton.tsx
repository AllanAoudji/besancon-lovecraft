import { MouseEventHandler } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  loading: boolean;
  loadingText?: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  show: boolean;
};

function LoaderButton({
  children,
  className = '',
  loading,
  loadingText = 'chargement',
  onClick,
  show,
}: Props) {
  if (!show) {
    return null;
  }

  return (
    <div className={className}>
      <button className="text-light" onClick={onClick}>
        {loading ? loadingText : children}
      </button>
    </div>
  );
}

export default LoaderButton;
