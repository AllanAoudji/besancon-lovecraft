import Grid from './Grid';
import Wrapper from './Wrapper';

type TextProps = {
  children: React.ReactNode;
};

function Text({ children }: TextProps) {
  return (
    <div className="[&_span]:pl-8 [&_span]:first:pl-0 lg:[&_span]:pl-16">
      <span>{children}</span>
    </div>
  );
}

function HomeAbout() {
  return (
    <section>
      <Wrapper
        border="bottom"
        borderColor="lighter"
        backgroundColor="darker"
        className="py-24 lg:py-28"
      >
        <Grid className="lg:gap-y-2">
          <h3 className="col-span-6 font-black pb-2 text-3xl text-lighter uppercase sm:col-span-10 sm:text-4xl lg:col-span-6 lg:col-start-2 lg:pb-0">
            Qu&apos;est-ce que le projet{' '}
            <b className="font-normal">les suivant de la vouivre</b>&nbsp;?
          </h3>
          <div className="col-span-5 col-start-2 leading-6 text-lg text-lighter sm:col-span-10 sm:col-start-3 lg:col-span-7 lg:col-start-5 lg:text-xl">
            <Text>
              Le projet Besancon-Lovecraft est un projet de création de jeu de
              rôle sur table se déroulant dans un Besançon des années 1910, dans
              une ambiance horreur/horifique inspiré des thématiques de
              l&apos;auteur H.P. Lovecraft.
            </Text>
            <Text>
              Ce blog à pour but de détailler et référencer mes avancés au jour
              le jour autour de ce projet.
            </Text>
            <Text>
              Les articles que vous trouverez sur ce site tourneront autour des
              règles du jeux de rôle, de mes recherches autour de
              l&apos;histoire de Besançon, de l&apos;écriture d&apos;histoire
              pour le MJ, de toute l&apos;aspect graphique (ressources
              visuelles, illustration, mise en page du livre de règle, etc.) et
              de lore ainsi que du financement du projet.
            </Text>
          </div>
        </Grid>
      </Wrapper>
    </section>
  );
}

export default HomeAbout;
