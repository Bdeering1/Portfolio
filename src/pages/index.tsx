import React, { createRef } from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import Stack from '../sections/Stack';
import Projects from '../sections/Projects';
import { disableScroll, enableScroll, arrowKeyScroll } from '../polyfill/scrolling';
import '../styles/index.scss';
import { throttle } from 'lodash';

interface IndexPageState {
  height : number,
  darkMode : boolean,
  mobileView : boolean
}

export default class IndexPage extends React.Component<{}, IndexPageState> {
  ref: React.RefObject<HTMLElement>;
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      darkMode: false,
      mobileView: false
    }
    this.ref = createRef<HTMLElement>();
    this.updateWidthHeight = this.updateWidthHeight.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.checkColorPref = this.checkColorPref.bind(this);
  }

  componentDidMount() {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.checkColorPref);
    window.addEventListener('resize', this.updateWidthHeight);
    window.addEventListener('orientationchange', this.updateWidthHeight);
    arrowKeyScroll(this.ref.current);
    this.updateWidthHeight();
    this.checkColorPref();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidthHeight);
    window.removeEventListener('orientationchange', this.updateWidthHeight);
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", this.checkColorPref);
  }

  checkColorPref() {
      let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setState({
          darkMode
      })
  }

  updateWidthHeight() {
    setTimeout(() => { //fixes issue with rotation on mobile
      let innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      document.documentElement.style.setProperty('--inner-height', `${innerHeight}px`);
      this.setState({
        height: innerHeight,
        mobileView: window.matchMedia("(max-width: 768px)").matches
      })
    }, 400);
  }

  handleScroll(e : any) {
    let element = e.target;
    if (element.scrollTop > this.state.height * 2.2) {
      disableScroll('projects'); //for project section only
      setTimeout(() => enableScroll('projects'), 800);
    }
  }

  render() {
    return (
      <main onScroll={throttle(this.handleScroll, 100)} ref={this.ref}>
        <Banner/>
        <About/>
        <Stack darkMode={this.state.darkMode}/>
        <Projects height={this.state.height} mobileView={this.state.mobileView} darkMode={this.state.darkMode}/>
      </main>
    )
  }
}