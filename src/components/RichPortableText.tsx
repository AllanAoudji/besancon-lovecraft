import { client } from '@/sanity/lib/client';
import {
  PortableText,
  PortableTextReactComponents,
  PortableTextTypeComponentProps,
} from '@portabletext/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useNextSanityImage } from 'next-sanity-image';
import { PortableTextBlock } from 'sanity';
import Image from 'next/image';

// https://stackoverflow.com/questions/61280906/text-image-alignment-in-sanity-io-portable-text-rich-text-editor

type Props = {
  value: PortableTextBlock[];
};

function ImageComponent(
  props: PortableTextTypeComponentProps<
    SanityImageSource & {
      alt: string | null;
      caption: string | null;
      metadata: ImageMetadata;
    }
  >
) {
  const imageProps = useNextSanityImage(client, props.value);

  if (!imageProps) return null;

  return (
    <div>
      <Image
        alt={props.value.alt ?? 'image de contenu'}
        blurDataURL={props.value.metadata.lqip}
        className="h-auto w-full"
        height={imageProps.height}
        src={imageProps.src}
        placeholder="blur"
        width={imageProps.width}
      />
      {props.value.caption && (
        <div className="flex pr-2 border-r-2 border-secondary break-words mt-2">
          <caption className="text-sm text-right w-full text-secondary">
            {props.value.caption}
          </caption>
        </div>
      )}
    </div>
  );
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-black pt-4 text-5xl text-darker">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-black pt-3 text-4xl text-darker">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-bold pt-2 text-3xl text-darker">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-bold pt-1 text-2xl text-darker">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="font-bold pt-1 text-xl text-darker">{children}</h5>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border border-darker break-words pl-2text-lg text-darker">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => {
      if (
        children === null ||
        (Array.isArray(children) && children.length === 1 && children[0] === '')
      ) {
        return <div className="pt-8 first:pt-0 last:pt-0" />;
      }
      return (
        <div className="break-words">
          <span className="text-lg text-darker">{children}</span>
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-10 text-light">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-10 text-light">{children}</ol>
    ),
  },
  types: {
    image: ImageComponent,
  },
  marks: {
    center: (props) => <div className="text-center">{props.children}</div>,
    highlight: (props) => <span className="font-bold">{props.children}</span>,
    link: (props) => (
      <a
        className="border-b-2 border-darker font-bold italic"
        href={props?.value?.href}
        rel="noopener"
        target="_blank"
      >
        {props.children}
      </a>
    ),
  },
};

function RichPortableText({ value }: Props) {
  return <PortableText value={value} components={components} />;
}

export default RichPortableText;
