import * as React from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import Stack from '../sections/Stack';
import Projects from '../sections/Projects';
import { disableScroll, enableScroll } from '../polyfill/scrolling';
import '../styles/index.scss';
import _ from 'lodash';

interface IndexPageState {
  width : number,
  height : number,
  darkQuery : boolean
}

export default class IndexPage extends React.Component<{}, IndexPageState> {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      darkQuery: false
    }
    this.updateWidthHeight = this.updateWidthHeight.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.checkColorPref = this.checkColorPref.bind(this);
  }

  componentDidMount() {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.checkColorPref);
    window.addEventListener('resize', () => this.updateWidthHeight());
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.updateWidthHeight();
      }, 400);
    });
    this.updateWidthHeight();
    this.checkColorPref();
  }

  checkColorPref() {
      let darkQuery = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setState({
          darkQuery
      })
  }

  updateWidthHeight() {
    let innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    document.documentElement.style.setProperty('--inner-height', `${innerHeight}px`);
    this.setState({
      width: innerWidth,
      height: innerHeight
    })
  }

  handleScroll(e : any) {
    let element = e.target;
    if (element.scrollTop > this.state.height * 2.2) {
      disableScroll();
      setTimeout(() => enableScroll(), 800);
    }
  }

  render() {
    return (
      <main onScroll={_.throttle(this.handleScroll, 100)}>
        <Banner/>
        <About/>
        <Stack darkMode={this.state.darkQuery}/>
        <Projects width={this.state.width} height={this.state.height} darkMode={this.state.darkQuery}/>
      </main>
    )
  }
}