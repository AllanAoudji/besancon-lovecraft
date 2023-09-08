import { bodoniModa } from '@src/utils/fonts';
import Wrapper from './Wrapper';

type TextProps = {
  children: React.ReactNode;
};

function Text({ children }: TextProps) {
  return (
    <div className="[&_span]:pl-4 [&_span]:first:pl-0 lg:[&_span]:pl-8 ">
      <span>{children}</span>
    </div>
  );
}

function HomeAbout() {
  return (
    <Wrapper
      backgroundColor="secondary"
      className="py-16 grid grid-cols-1 mx-auto sm:grid-cols-5 sm:gap-4 lg:max-w-4xl lg:grid-cols-4 lg:py-20"
    >
      <h2
        className={`pb-2 text-light text-xl transition uppercase sm:pb-0 sm:col-span-2 sm:text-2xl sm:text-right lg:text-left lg:col-span-3 lg:text-4xl ${bodoniModa.className}`}
      >
        Qu&apos;est-ce que le projet{' '}
        <b className="font-bold">Besancon-Lovecraft</b>?
      </h2>
      <div className="pl-9 text-dark text-sm sm:pl-0 col-span-3 lg:col-start-2 lg:text-lg">
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
