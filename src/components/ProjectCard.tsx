import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import ReactLogo from './ReactLogo';
import ReduxLogo from './ReduxLogo';
import SassLogo from './SassLogo';
import JavascriptLogo from './JavaScriptLogo';

interface ProjectCardProps {
    project: {
        title : string,
        subtitle : string
        desc : string,
        imgLg : string,
        imgSm : string,
        link: string,
        stack?: []
    },
    id : number
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
        this.updateQuery = this.updateQuery.bind(this);
    }

    componentDidMount() {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.updateQuery);
    }

    updateQuery() {
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
    
    render() {
        return (
            <div className="project-wrapper">
                <div className="project-grid">
                    <ReactLogo darkMode={this.state.darkQuery}
                        style={{
                            gridArea: "2/7/3/8",
                            justifySelf: "center",
                            height: "100%"
                        }}
                    />
                    <ReduxLogo darkMode={this.state.darkQuery}
                        style={{
                            gridArea: "3/7/4/8",
                            justifySelf: "center",
                            height: "100%"
                        }}
                    />
                    <SassLogo darkMode={this.state.darkQuery}
                        style={{
                            gridArea: "4/7/5/8",
                            justifySelf: "center",
                            height: "100%"
                        }}
                    />
                    <JavascriptLogo darkMode={this.state.darkQuery}
                        style={{
                            gridArea: "5/7/6/8",
                            justifySelf: "center",
                            height: "100%"
                        }}
                    />
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