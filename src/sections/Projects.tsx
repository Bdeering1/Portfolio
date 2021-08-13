import React from 'react';
import ProjectCard from '../components/ProjectCard';
const projects = require('../content/projects.json');

interface ProjectsProps {
    darkMode : boolean,
    width : number,
    height : number
}

export default function Projects(props : ProjectsProps) {
    let rotationAdjustment = (props.width - props.height) / 2;
    return (
        <section
            className="projects"
            style={{
                width: props.height,
                height: props.width,
                transform: `rotate(-90deg) translate(${rotationAdjustment}px, ${rotationAdjustment}px)`
            }}>
            {projects.map((proj, idx) => (
                <ProjectCard project={proj} darkMode={props.darkMode} id={idx} width={props.width} height={props.height} key={idx}/>
            ))}
        </section>
    )
}