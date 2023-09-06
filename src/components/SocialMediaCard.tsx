import Image from 'next/image';

type Props = {
  className?: string;
  socialMedia: SocialMedia;
};

function SocialMediaCard({ className = '', socialMedia }: Props) {
  return (
    <a className={className} href={socialMedia.link} target="_blank">
      <Image src={socialMedia.image} alt={`${socialMedia.name} logo`} />
      {socialMedia.name}
    </a>
  );
}

export default SocialMediaCard;
