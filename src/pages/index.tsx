import * as React from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import '../styles/index.scss';
import Projects from '../sections/Projects';

const IndexPage = () => {
  return (
    <main>
      <Banner/>
      <About/>
      <Projects/>
    </main>
  )
}

export default IndexPage;
