import React from 'react';
import ProjectCard from '../components/ProjectCard';
const projects = require('../content/projects.json');

interface ProjectsProps {
    width : number,
    height : number
}

export default function Projects(props : ProjectsProps) {
    return (
        <section
            className="projects"
            style={{
                width: props.height,
                height: props.width,
                transform: `rotate(-90deg) translateY(${(props.width - props.height) / 2}px)`
            }}>
            {projects.map((proj, idx) => (
                <ProjectCard project={proj} id={idx} width={props.width} height={props.height} key={idx}/>
            ))}
        </section>
    )
}