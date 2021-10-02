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
        <title>Portfolio</title>
        <meta name="description" content="Bryn Deering's Portfolio"></meta>
        <meta
          name="keywords"
          content="Bryn Deering, Portfolio, Front End Developer, Web Projects"
        ></meta>
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
