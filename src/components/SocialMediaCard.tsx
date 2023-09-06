import Image from 'next/image';

type Props = {
  className?: string;
  socialMedia: SocialMedia;
};

function SocialMediaCard({ className = '', socialMedia }: Props) {
  return (
    <a className={className} href={socialMedia.link} target="_blank">
      <Image alt={`${socialMedia.name} logo`} src={socialMedia.image} />
      {socialMedia.name}
    </a>
  );
}

export default SocialMediaCard;
