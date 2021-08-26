import React, { createRef } from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import Stack from '../sections/Stack';
import Projects from '../sections/Projects';
import { disableScroll, enableScroll } from '../polyfill/scrolling';
import '../styles/index.scss';
import { throttle } from 'lodash';

interface IndexPageState {
  height : number,
  darkMode : boolean,
  mobileView : boolean
}

export default class IndexPage extends React.Component<{}, IndexPageState> {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      darkMode: false,
      mobileView: false
    }
    this.focusFix = this.focusFix.bind(this);
    this.updateWidthHeight = this.updateWidthHeight.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.checkColorPref = this.checkColorPref.bind(this);
  }

  componentDidMount() {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.checkColorPref);
    window.addEventListener('resize', this.updateWidthHeight);
    window.addEventListener('orientationchange', this.updateWidthHeight);
    window.addEventListener('keydown', () => {console.log(document.activeElement)});
    this.focusFix();
    this.updateWidthHeight();
    this.checkColorPref();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidthHeight);
    window.removeEventListener('orientationchange', this.updateWidthHeight);
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", this.checkColorPref);
  }

  focusFix() {
    const gatsbyFocusWrapper = document.getElementById('gatsby-focus-wrapper');
    if (gatsbyFocusWrapper) gatsbyFocusWrapper.removeAttribute('style');
    gatsbyFocusWrapper.removeAttribute('tabIndex');
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
      disableScroll(); //for project section only
      setTimeout(() => enableScroll(), 800);
    }
  }

  render() {
    return (
      <main onScroll={throttle(this.handleScroll, 100)}>
        <Banner/>
        <About/>
        <Stack darkMode={this.state.darkMode}/>
        <Projects height={this.state.height} mobileView={this.state.mobileView} darkMode={this.state.darkMode}/>
      </main>
    )
  }
}