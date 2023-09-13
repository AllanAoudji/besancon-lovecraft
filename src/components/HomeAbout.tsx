import Title from './Title';
import Wrapper from './Wrapper';

type TextProps = {
  children: React.ReactNode;
};

function Text({ children }: TextProps) {
  return (
    <div className="[&_span]:pl-8 [&_span]:first:pl-0">
      <span>{children}</span>
    </div>
  );
}

function HomeAbout() {
  return (
    <Wrapper
      backgroundColor="darker"
      className="gap-2 grid grid-cols-6 mx-auto py-12 sm:grid-cols-12 sm:py-16 lg:gap-4 lg:py-24"
    >
      <Title
        className="col-span-6 leading-[3rem] pb-2 transition sm:col-span-10 lg:col-span-5 lg:text-right"
        color="dark"
        type="h2"
        uppercase={true}
      >
        Qu&apos;est-ce que le projet{' '}
        <b className="font-normal italic">les suivant de la vouivre</b> ?
      </Title>
      <div className="col-span-5 col-start-2 leading-6 text-lg text-lighter sm:col-span-10 sm:col-start-3 lg:col-span-7 lg:col-start-auto lg:text-xl">
        <Text>
          Le projet Besancon-Lovecraft est un projet de création de jeu de rôle
          sur table se déroulant dans un Besançon des années 1910, dans une
          ambiance horreur/horifique inspiré des thématiques de l&apos;auteur
          H.P. Lovecraft.
        </Text>
        <Text>
          Ce blog à pour but de détailler et référencer mes avancés au jour le
          jour autour de ce projet.
        </Text>
        <Text>
          Les articles que vous trouverez sur ce site tourneront autour des
          règles du jeux de rôle, de mes recherches autour de l&apos;histoire de
          Besançon, de l&apos;écriture d&apos;histoire pour le MJ, de toute
          l&apos;aspect graphique (ressources visuelles, illustration, mise en
          page du livre de règle, etc.) et de lore ainsi que du financement du
          projet.
        </Text>
      </div>
    </Wrapper>
  );
}

export default HomeAbout;
