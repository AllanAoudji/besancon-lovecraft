import { PortableTextTypeComponentProps } from '@portabletext/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image from 'next/image';

function PortableImage(
  props: PortableTextTypeComponentProps<
    SanityImageSource & {
      url: string;
      alt: string | null;
      caption: string | null;
      metadata: ImageMetadata;
    }
  >
) {
  return (
    <div>
      <Image
        alt={props.value.alt ?? 'image de contenu'}
        blurDataURL={props.value.metadata.lqip}
        className="h-auto w-full"
        height={props.value.metadata.dimensions.height}
        src={props.value.url}
        placeholder="blur"
        width={props.value.metadata.dimensions.width}
      />
      {props.value.caption && (
        <div className="flex pr-2 border-r-2 border-secondary break-words mt-2 text-sm text-right text-secondary">
          {props.value.caption}
        </div>
      )}
    </div>
  );
}

export default PortableImage;
