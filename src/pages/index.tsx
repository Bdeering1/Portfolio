import * as React from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import '../styles/index.scss';
import Projects from '../sections/Projects';

interface IndexPageState {
  width : number,
  height : number
}

export default class IndexPage extends React.Component<{}, IndexPageState> {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    }
    this.updateWidthHeight = this.updateWidthHeight.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.updateWidthHeight());
    window.addEventListener('rotate', () => this.updateWidthHeight());
    this.updateWidthHeight();
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

  render() {
    return (
      <main>
        <Banner/>
        <About/>
        <Projects width={this.state.width} height={this.state.height}/>
      </main>
    )
  }
}