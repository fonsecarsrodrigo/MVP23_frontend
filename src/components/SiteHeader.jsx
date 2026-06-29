import React from 'react';
import coverImage from '../../images/bora_orneles_cover.webp';

function SiteHeader() {
  return <header className="site-header" style={{ backgroundImage: `url(${coverImage})` }} />;
}

export default SiteHeader;
