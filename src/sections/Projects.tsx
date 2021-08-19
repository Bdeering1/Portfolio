import React from 'react';
//import { graphql } from 'gatsby';
import ProjectCard from '../components/ProjectCard';
import { disableScroll, enableScroll } from '../polyfill/scrolling';
import _ from 'lodash';

const projects = require('../../data/projects.json');

interface ProjectsProps {
    darkMode : boolean,
    height : number,
/*     data: {
        edges : Array<{
            node: {
                title : string,
                subtitle : string,
                desc : string,
                img : string,
                link : string,
                stack : string[]
            }
        }>
    } */
}

interface ProjectsState {
    prevScroll : number
}

export default class Projects extends React.Component<ProjectsProps, ProjectsState> {
    constructor(props) {
        super(props);
        this.state = {
            prevScroll: -1
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e : any) {
/*         let element = e.target;
        if (element.scrollTop < this.props.height * 2) {
            if (this.state.prevScroll !== null && element.scrollTop < this.state.prevScroll) {
                disableScroll();
                setTimeout(() => enableScroll(), 1000);
                this.setState({prevScroll: -1});
            }
            else {
                this.setState({prevScroll: element.scrollTop})
            }
        } */
    }

    render() {
        return (
            <section
                className="projects"
                onScroll={_.throttle(this.handleScroll, 100)}>
                {projects.map((proj, idx) => (
                    <ProjectCard project={proj} darkMode={this.props.darkMode}  id={idx} key={idx}/>
                ))}
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

