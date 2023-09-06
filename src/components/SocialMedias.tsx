import Instagram from '@/public/instagram.png';
import SocialMediaCard from './SocialMediaCard';

type Props = {
  className?: string;
};

const socialMedias: SocialMedia[] = [
  {
    image: Instagram,
    link: 'https://www.instagram.com/allanjouannet/',
    name: 'Instagram',
  },
];

function SocialMedias({ className = '' }: Props) {
  return (
    <div className={className}>
      {socialMedias.map((socialMedia) => (
        <SocialMediaCard
          className="flex items-center gap-3 py-3 duration-1000 transition hover:opacity-60 uppercase [&_img]:h-5 [&_img]:w-auto"
          socialMedia={socialMedia}
          key={socialMedia.name}
        />
      ))}
    </div>
  );
}

export default SocialMedias;
