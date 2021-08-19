import * as React from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import Stack from '../sections/Stack';
import Projects from '../sections/Projects';
import { disableScroll, enableScroll } from '../polyfill/scrolling';
import '../styles/index.scss';
import _ from 'lodash';

interface IndexPageState {
  height : number,
  darkQuery : boolean
}

export default class IndexPage extends React.Component<{}, IndexPageState> {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      darkQuery: false
    }
    this.updateHeight = this.updateHeight.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.checkColorPref = this.checkColorPref.bind(this);
  }

  componentDidMount() {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.checkColorPref);
    window.addEventListener('resize', this.updateHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.updateHeight();
      }, 400);
    });
    this.updateHeight();
    this.checkColorPref();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
    window.removeEventListener('orientationchange', () => { //is this correct?
      setTimeout(() => {
        this.updateHeight();
      }, 400);
    });
  }

  checkColorPref() {
      let darkQuery = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setState({
          darkQuery
      })
  }

  updateHeight() {
    let innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    document.documentElement.style.setProperty('--inner-height', `${innerHeight}px`);
    this.setState({
      height: innerHeight
    })
  }

  handleScroll(e : any) {
/*     let element = e.target;
    if (element.scrollTop > this.state.height * 2.2) {
      disableScroll();
      setTimeout(() => enableScroll(), 800);
    } */
  }

  render() {
    return (
      <main onScroll={_.throttle(this.handleScroll, 100)}>
        <Banner/>
        <About/>
        <Stack darkMode={this.state.darkQuery}/>
        <Projects height={this.state.height} darkMode={this.state.darkQuery}/>
      </main>
    )
  }
}