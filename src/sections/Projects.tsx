import React from 'react';
//import { graphql } from 'gatsby';
import ProjectCard from '../components/ProjectCard';

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
                desc : string,
                img : string,
                link : string,
                stack : string[]
            }
        }>
    } */
}

export default function Projects(props : ProjectsProps) {
    return (
        <section
            className="projects">
            {projects.map((proj, idx) => (
                <ProjectCard project={proj} mobileView={props.mobileView} darkMode={props.darkMode}  id={idx} key={idx}/>
            ))}
        </section>
    )
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

