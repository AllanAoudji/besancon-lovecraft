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
      <Wrapper backgroundColor="darker" className="py-20 lg:py-28">
        <Grid className="lg:gap-y-2">
          <h3 className="col-span-6 font-black pb-2 text-3xl text-lighter uppercase sm:col-span-10 lg:text-4xl lg:col-span-6 lg:col-start-2 lg:pb-0">
            Qu&apos;est-ce que le projet{' '}
            <b className="font-normal">les suivant de la vouivre</b>&nbsp;?
          </h3>
          <div className="col-span-5 col-start-2 leading-6 text-lg text-lighter sm:col-span-10 sm:col-start-3 lg:col-span-7 lg:col-start-5 lg:text-xl">
            <Text>
              Le projet <i className="italic">Les Suivants de la Vouivre</i> est
              un projet de création de jeu de rôle sur table se déroulant dans
              un Besançon des années 1900, dans une ambiance horreur fantastique
              librement inspirée des écrits de l&apos;auteur américain{' '}
              <i className="italic">H.P. Lovecraft</i>.
            </Text>
            <Text>
              Ce blog a pour but de détailler et référencer mes avancées au jour
              le jour autour de ce projet.
            </Text>
            <Text>
              Les articles que vous trouverez sur ce site tourneront autour de
              l&apos;invention des règles du jeu, de mes recherches autour de
              l&apos;histoire de Besançon, de l&apos;écriture des récits, de
              tout l&apos;aspect graphique (ressources visuelles, illustrations,
              mise en page du livre, etc.) ainsi que du financement du projet.
            </Text>
          </div>
        </Grid>
      </Wrapper>
    </section>
  );
}

export default HomeAbout;
