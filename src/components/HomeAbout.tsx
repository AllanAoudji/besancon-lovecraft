import { bodoniModa } from '@src/utils/fonts';

function HomeAbout() {
  return (
    <div className="bg-secondary py-10 px-6">
      <h2
        className={`text-light text-xl uppercase pb-2 ${bodoniModa.className}`}
      >
        Qu&apos;est-ce que le projet{' '}
        <b className="font-bold">Besancon-Lovecraft</b>?
      </h2>
      <div className="pl-9 text-dark text-sm">
        <div>
          <span>
            Le projet Besancon-Lovecraft est un projet de création de jeu de
            rôle sur table se déroulant dans un Besançon des années 1910, dans
            une ambiance horreur/horifique inspiré des thématiques de
            l&apos;auteur H.P. Lovecraft.
          </span>
          <div>
            <span className="pl-6">
              Ce blog à pour but de détailler et référencer mes avancés au jour
              le jour autour de ce projet.
            </span>
          </div>
          <div>
            <span className="pl-6">
              Les articles que vous trouverez sur ce site tourneront autour des
              règles du jeux de rôle, de mes recherches autour de
              l&apos;histoire de Besançon, de l&apos;écriture d&apos;histoire
              pour le MJ, de toute l&apos;aspect graphique (ressources
              visuelles, illustration, mise en page du livre de règle, etc.) et
              de lore ainsi que du financement du projet.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAbout;
