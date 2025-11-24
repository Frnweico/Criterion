import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HeadManagerProps {
  title: string;
  description: string;
  canonical: string;
}

const HeadManager: React.FC<HeadManagerProps> = ({ title, description, canonical }) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonical} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default HeadManager;