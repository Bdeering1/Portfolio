import React from 'react';
//import { graphql } from 'gatsby';
import ProjectCard from '../components/ProjectCard';
import { throttle } from 'lodash';

const projects = require('../../data/projects.json');

interface ProjectsProps {
    height : number,
    mobileView : boolean,
    darkMode : boolean,
/*     data: {
        edges : Array<{
            node: {
                title : string,
                subtitle : string,
                desc : string,s
                img : string,
                link : string,
                stack : string[]
            }
        }>
    } */
}

export default class Projects extends React.Component<ProjectsProps> {
    sectionRef: React.RefObject<HTMLDivElement>;
    constructor(props) {
        super(props);
        this.sectionRef = React.createRef<HTMLDivElement>();
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.sectionRef.current.scrollLeft = window.innerWidth;
    }

    handleScroll() {
        if (this.sectionRef.current.scrollLeft == 0) {
            this.sectionRef.current.scrollLeft += window.innerWidth * 3;
        } else if (this.sectionRef.current.scrollLeft == window.innerWidth * 4) {
            this.sectionRef.current.scrollLeft -= window.innerWidth * 3;
        }
    }

    render() {
        return (
            <section
                className="projects"
                ref={this.sectionRef}
                onScroll={throttle(this.handleScroll, 5)}
            >
                <ProjectCard project={projects[projects.length - 1]} mobileView={this.props.mobileView} darkMode={this.props.darkMode}  id={0}/>
                {projects.map((proj, idx) => (
                    <ProjectCard project={proj} mobileView={this.props.mobileView} darkMode={this.props.darkMode}  id={idx + 1} key={idx}/>
                ))}
                <ProjectCard project={projects[0]} mobileView={this.props.mobileView} darkMode={this.props.darkMode}  id={projects.length + 1}/>
            </section>
        )
    }
}

/* export const query = graphql`
{
    allProjectsJson {
        edges {
            node {
                title,
                subtitle
                desc,
                img,
                link,
                stack
            }
        }
    }
}
`; */

