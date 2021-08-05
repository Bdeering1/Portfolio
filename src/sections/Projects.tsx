import React from 'react';
import ProjectCard from '../components/ProjectCard';
const projects = require('../content/projects.json');

export default function Projects() {
    return (
        <div className="projects">
            {projects.map((proj, idx) => (
                <ProjectCard project={proj} id={idx} key={idx}/>
            ))}
        </div>
    )
}