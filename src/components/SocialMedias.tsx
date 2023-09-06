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
          className="duration-1000 flex gap-3 items-center py-3 transition uppercase hover:opacity-60 [&_img]:h-5 [&_img]:w-auto"
          key={socialMedia.name}
          socialMedia={socialMedia}
        />
      ))}
    </div>
  );
}

export default SocialMedias;
