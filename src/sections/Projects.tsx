import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { disableScroll, enableScroll } from '../polyfill/scrolling';
import _ from 'lodash';

const projects = require('../../data/projects.json');

interface ProjectsProps {
    darkMode : boolean,
    width : number,
    height : number
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
        let element = e.target;
        if (element.scrollTop < this.props.height * 2) {
            if (this.state.prevScroll !== null && element.scrollTop < this.state.prevScroll) {
                disableScroll();
                setTimeout(() => enableScroll(), 1000);
                this.setState({prevScroll: -1});
            }
            else {
                this.setState({prevScroll: element.scrollTop})
            }
        }
    }

    render() {
        let rotationAdjustment = (this.props.width - this.props.height) / 2;
        return (
            <section
                className="projects"
                onScroll={_.throttle(this.handleScroll, 100)}
                style={{
                    width: this.props.height, //switched to fit screen since section is rotated 90deg
                    height: this.props.width,
                    transform: `rotate(-90deg) translate(${rotationAdjustment}px, ${rotationAdjustment}px)`
                }}>
                {projects.map((proj, idx) => (
                    <ProjectCard project={proj} darkMode={this.props.darkMode} id={idx} width={this.props.width} height={this.props.height} key={idx}/>
                ))}
            </section>
        )
    }
}