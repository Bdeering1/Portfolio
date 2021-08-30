import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Banner from './sections/Banner';
import About from './sections/About';
import Stack from './sections/Stack';
import Projects from './sections/Projects';

import pageMount from './utils/pageMount';
import { handleScroll } from './utils/scrolling';
import { throttle } from 'lodash';
import './styles/index.scss';


function IndexPage() {
  const ref = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [scrollAreas, setScrollAreas] = useState([]);


  useEffect(()  => {
    const unMount = pageMount(ref.current, { setDarkMode, setMobileView, setScrollAreas });
    return(unMount);
  }, [])

  return (
    <>
      <Helmet>
          <title>Portfolio</title>
          <meta name="description" content="Bryn Deering's Portfolio"></meta>
          <meta name="keywords" content="Bryn Deering, Portfolio, Front End Developer, Web Projects"></meta>
      </Helmet>

      <main onScroll={throttle((e) => handleScroll(e, scrollAreas), 100)} ref={ref} id="main">
        <Banner/>
        <About/>
        <Stack darkMode={darkMode}/>
        <Projects mobileView={mobileView} darkMode={darkMode}/>
      </main>

    </>
  )
}

export default IndexPage;