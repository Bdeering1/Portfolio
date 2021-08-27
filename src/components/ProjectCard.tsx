import React from 'react';
import LeftRightArrow from '../components/LeftRightArrow';
import ArrowKeys from '../components/ArrowKeys';
import JSXLogoFromStr from '../components/LightDarkLogos';

interface ProjectCardProps {
    project: {
        title : string,
        subtitle : string
        desc : string,
        shortDesc : string,
        img : string,
        link: string,
        stack: string[]
    },
    mobileView : boolean,
    darkMode : boolean,
    id : number,
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
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        this.setState((state) => ({
            isFlipped: !state.isFlipped
        }))
        await new Promise(resolve => setTimeout(resolve, 400));
        let frontTitle = document.getElementById(`front-title-${this.props.id}`);
        this.state.isFlipped ? frontTitle.style.display = 'none' : frontTitle.style.display = '';
    }
    
    render() {
        return (
            <div className="project-wrapper" data-scrollable={true}>
                <div className="project-grid">
                    {/* <LeftRightArrow /> */}
                    <ArrowKeys/>
                    {this.props.project.stack.map((item, idx) => (
                        JSXLogoFromStr(
                            item,
                            this.props.darkMode,
                            idx,
                            {
                                gridArea: `${idx+2}/1/${idx+3}/2`,
                                justifySelf: "center",
                                height: "100%"
                            },
                    )))
                    }
                    <div className="project-card" onClick={this.handleClick} data-flipped={this.state.isFlipped}>
                        <div className="project-card-inner">
                            <div className="project-card-front"> 
                                <h2 className="project-title" id={`front-title-${this.props.id}`}>{this.props.project.title}</h2>
                                <span className="divider"/>
                                <div className="img-wrapper">
                                    <img src={this.props.project.img} alt={this.props.project.title}/>
                                </div>
                            </div>
                            <div className="project-card-back">
                                <h2 className="project-title">{this.props.project.title}</h2>
                                <span className="divider"/>
                                <div className="text-box body-text-sm">
                                    <div className="text-bg"/>
                                    <h3 className="project-subtitle">{this.props.project.subtitle}</h3>
                                    <span className="sub-divider"/>
                                    <p className="project-desc">{this.props.mobileView ? this.props.project.shortDesc : this.props.project.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  }