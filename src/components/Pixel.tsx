'use client';

import React from 'react';
import { Helmet } from 'react-helmet';

const Pixel = () => {
  return (
    <Helmet>
      <script>
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '910247493884693');
        fbq('track', 'PageView');`}
      </script>
      <noscript>
        {`<img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=1453439188887645&ev=PageView&noscript=1"
        />`}
      </noscript>
    </Helmet>
  );
};

export default Pixel;

//EAAFBWPs0LcMBO2uoqpQFrRdSZCtWmwAHfC5W3aTiuWcORtouY1saZBXR3EqtaKj7QGZBwQQkzOOZBu4uiek6tryzD9YvUZCtKbiSLykLPXw8ZAjOYllN3xw83QDiikTCTuPuZC1Qs892EN7BrTMVbPBjPNj2weZCwHBsnNZB8olgOck6k9dEkXOKeEZABygEZBfnlFzkQZDZD
