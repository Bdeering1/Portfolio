import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import pageMount from './utils/pageMount';
import './styles/index.scss';

import ScrollContainer from './components/ScrollContainer';
import Banner from './sections/Banner';
import About from './sections/About';
import Stack from './sections/Stack';
import Projects from './sections/Projects';

function IndexPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const removeListeners = pageMount({ setDarkMode, setMobileView });
    return removeListeners;
  }, []);

  return (
		<>
			<Helmet>
				<title>Bryn Deering - Portfolio</title>
				<meta
					name='description'
					content='Digital portfolio showcasing a few notable web projects.'
				/>
				<meta
					name='keywords'
					content='Bryn Deering, Portfolio, Front End Developer, Web Projects'
				/>
				<meta property='og:locale' content='en_US' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content="Bryn Deering's Portfolio Site" />
				<meta
					property='og:description'
					content='Digital portfolio showcasing a few notable web projects.'
				/>
				<meta property='og:image' content='./images/twitter-image.png' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content="Bryn Deering's Portfolio Site" />
				<meta
					name='twitter:description'
					content='Digital portfolio showcasing a few notable web projects.'
				/>
				<meta name='twitter:image' content='./images/twitter-image.png' />
				<meta name='theme-color' content='#1C5491' />
			</Helmet>

			<ScrollContainer>
				<Banner />
				<About darkMode={darkMode} />
				<Stack darkMode={darkMode} />
				<Projects mobileView={mobileView} darkMode={darkMode} />
			</ScrollContainer>
		</>
	);
}

export default IndexPage;
