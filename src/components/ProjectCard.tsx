import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

interface ProjectCardProps {
    project: {
        title : string,
        subtitle : string
        desc : string,
        imgLg : string,
        imgSm : string,
        stack: []
    }
}

interface ProjectCardState {
    isFlipped : boolean
}

export default class ProjectCard extends React.Component<ProjectCardProps, ProjectCardState> {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };
    }
    
    render() {
          return (
            <div className="project-wrapper">
                <button className="project-card" data-flipped={this.state.isFlipped}>
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
                </button>
            </div>
          );
    }
  }