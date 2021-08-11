import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import ReactLogo from './ReactLogo';
import ReduxLogo from './ReduxLogo';
import SassLogo from './SassLogo';
import JavascriptLogo from './JavaScriptLogo';
import BootstrapLogo from './BootstrapLogo';

interface ProjectCardProps {
    project: {
        title : string,
        subtitle : string
        desc : string,
        imgLg : string,
        imgSm : string,
        link: string,
        stack: string[]
    },
    id : number,
    width : number,
    height : number
}
interface ProjectCardState {
    isFlipped : boolean,
    darkQuery : boolean
}

export default class ProjectCard extends React.Component<ProjectCardProps, ProjectCardState> {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            darkQuery: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.checkColorPref = this.checkColorPref.bind(this);
        this.JSXLogoFromStr = this.JSXLogoFromStr.bind(this);
    }

    componentDidMount() {
        this.checkColorPref();
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.checkColorPref);
    }

    checkColorPref() {
        let darkQuery = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.setState({
            darkQuery
        })
    }

    handleClick() {
        this.setState((state) => ({
            isFlipped: !state.isFlipped
        }))
    }

    JSXLogoFromStr(logo : string, style : {}, key : number) {
        switch(logo) {
            case "React":
                return <ReactLogo darkMode={this.state.darkQuery} style={style} key={key}/>;
            case "Redux":
                return <ReduxLogo darkMode={this.state.darkQuery} style={style} key={key}/>;
            case "SASS":
                return <SassLogo darkMode={this.state.darkQuery} style={style} key={key}/>;
            case "Javascript":
                return <JavascriptLogo darkMode={this.state.darkQuery} style={style} key={key}/>;
            case "Bootstrap":
                return <BootstrapLogo darkMode={this.state.darkQuery} style={style} key={key}/>;
            default:
                return <div style={style} key={key}></div>;
        }
    }
    
    render() {
        let rotationAdjustment = (this.props.width - this.props.height) / 2;
        return (
            <div
                className="project-wrapper"
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    transform: `rotate(90deg) translateY(${rotationAdjustment}px)`,
                    margin: `${rotationAdjustment}px 0`
                }}
            >
                <div className="project-grid" style={{width: this.props.width, height: this.props.height}}>
                    {this.props.project.stack.map((item, idx) => (
                        this.JSXLogoFromStr(item, {gridArea: `${idx+2}/1/${idx+3}/2`, justifySelf: "center", height: "100%"}, idx)
                    ))
                    }
                    <div className="project-card" onClick={this.handleClick} data-flipped={this.state.isFlipped}>
                        <div className="project-card-inner">
                            <div className="project-card-front"> 
                                <h2 className="project-title">{this.props.project.title}</h2>
                                <span className="divider"/>
                                <div className="img-wrapper">
                                    <StaticImage
                                        src="../assets/images/visual-sorting-sm.png"
                                        alt={this.props.project.title}
                                        placeholder="blurred"
                                        transformOptions={{fit: "cover", cropFocus: "bottom"}}
                                        style={{height: "100%", maxHeight: "100%"}}
                                    />
                                </div>
                            </div>
                            <div className="project-card-back">
                                <h2 className="project-title">{this.props.project.title}</h2>
                                <span className="divider"/>
                                <div className="text-box">
                                    <div className="text-bg"/>
                                    <h3 className="project-subtitle">{this.props.project.subtitle}</h3>
                                    <span className="sub-divider"/>
                                    <p className="project-desc">{this.props.project.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  }