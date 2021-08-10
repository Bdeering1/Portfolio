import * as React from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import '../styles/index.scss';
import Projects from '../sections/Projects';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    let innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    document.documentElement.style.setProperty('--inner-height', `${innerHeight}px`);
  }

  render() {
    return (
      <main>
        <Banner/>
        <About/>
        <Projects/>
      </main>
    )
  }
}