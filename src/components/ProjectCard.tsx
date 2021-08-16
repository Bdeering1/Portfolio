import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import JSXLogoFromStr from '../components/LightDarkLogos';

interface ProjectCardProps {
    project: {
        title : string,
        subtitle : string
        desc : string,
        img : string,
        link: string,
        stack: string[]
    },
    darkMode : boolean
    id : number,
    width : number,
    height : number
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

    componentDidMount() {
        console.log(this.props.project);
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
                        JSXLogoFromStr(
                            item,
                            {
                                gridArea: `${idx+2}/1/${idx+3}/2`,
                                justifySelf: "center",
                                height: "100%"
                            },
                            this.props.darkMode,
                            idx
                    )))
                    }
                    <div className="project-card" onClick={this.handleClick} data-flipped={this.state.isFlipped}>
                        <div className="project-card-inner">
                            <div className="project-card-front"> 
                                <h2 className="project-title" id={`front-title-${this.props.id}`}>{this.props.project.title}</h2>
                                <span className="divider"/>
                                <div className="img-wrapper">
                                    {/* <StaticImage
                                        src="../assets/images/visual-sorting-sm.png"
                                        alt={this.props.project.title}
                                        placeholder="blurred"
                                        transformOptions={{fit: "cover", cropFocus: "bottom"}}
                                        style={{height: "100%", maxHeight: "100%"}}
                                    /> */}
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