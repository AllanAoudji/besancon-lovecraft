import { bodoniModa } from '@src/utils/fonts';

type TextProps = {
  children: React.ReactNode;
};

function Text({ children }: TextProps) {
  return (
    <div className="[&_span]:pl-6 [&_span]:first:pl-0">
      <span>{children}</span>
    </div>
  );
}

function HomeAbout() {
  return (
    <div className="bg-secondary px-6 py-16">
      <h2
        className={`pb-2 text-light text-xl uppercase ${bodoniModa.className}`}
      >
        Qu&apos;est-ce que le projet{' '}
        <b className="font-bold">Besancon-Lovecraft</b>?
      </h2>
      <div className="pl-9 text-dark text-sm">
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
    </div>
  );
}

export default HomeAbout;
