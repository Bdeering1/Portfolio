import React, { useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import { noScrollFocus } from '../polyfill/scrolling';
import { throttle } from 'lodash';

const projects = require('../../data/projects.json');

interface ProjectsProps {
    height : number,
    mobileView : boolean,
    darkMode : boolean,
}

export default function Projects(props : ProjectsProps) {
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current.scrollLeft = window.innerWidth;
        noScrollFocus(scrollRef.current);
    }, []);

    const handleScroll = (e : any) => {
        let element = e.target;
        if (!element) return;
        if (element.scrollLeft == 0) {
            element.scrollLeft += window.innerWidth * 3;
        } else if (element.scrollLeft == window.innerWidth * 4) {
            element.scrollLeft -= window.innerWidth * 3;
        }
    }

    return (
        <section
            className="projects"
            ref={scrollRef}
            onScroll={throttle(handleScroll, 7)}
            tabIndex={-1}
        >
                <ProjectCard project={projects[projects.length - 1]} mobileView={props.mobileView} darkMode={props.darkMode}  id={0}/>
                {projects.map((proj, idx) => (
                    <ProjectCard project={proj} mobileView={props.mobileView} darkMode={props.darkMode}  id={idx + 1} key={idx}/>
                ))}
                <ProjectCard project={projects[0]} mobileView={props.mobileView} darkMode={props.darkMode}  id={projects.length + 1}/>
        </section>
    )
}