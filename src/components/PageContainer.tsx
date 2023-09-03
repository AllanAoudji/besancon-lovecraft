import DrawerContainer from './DrawerContainer';
import Wrapper from './Wrapper';

type Props = {
  children?: React.ReactNode;
  className?: string;
  drawer: string | undefined;
  footer?: JSX.Element;
  header?: JSX.Element;
};

function PageContainer({
  children,
  className = '',
  drawer,
  footer,
  header,
}: Props) {
  return (
    <div className="pt-16">
      <DrawerContainer open={drawer === 'true' ? true : false} />
      <div>
        {header}
        <Wrapper className={className}>{children}</Wrapper>
        {footer}
      </div>
    </div>
  );
}

export default PageContainer;
