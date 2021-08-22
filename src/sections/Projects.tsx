import React, { useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import { throttle } from 'lodash';

const projects = require('../../data/projects.json');

interface ProjectsProps {
    height : number,
    mobileView : boolean,
    darkMode : boolean,
}

export default function Projects(props : ProjectsProps) {
    const scrollRef = useRef(null);
    const enableDrag = () => {
        document.querySelector<HTMLElement>('.projects-scroll').style.scrollSnapType = 'none';
    }
    const disableDrag = () => {
        setTimeout(() => {
            document.querySelector<HTMLElement>('.projects-scroll').style.scrollSnapType = '';
        }, 200);
    }

    useEffect(() => {
        scrollRef.current.scrollLeft = window.innerWidth;
        scrollRef.current.addEventListener('mousedown', enableDrag);
        scrollRef.current.addEventListener('mouseup', disableDrag);
    }, []);

    const handleScroll = () => {
        let element = scrollRef.current;
        if (element.scrollLeft == 0) {
            element.scrollLeft += window.innerWidth * 3;
        } else if (element.scrollLeft == window.innerWidth * 4) {
            element.scrollLeft -= window.innerWidth * 3;
        }
    }

    return (
        <section className="projects">
            <ScrollContainer
                className="projects-scroll"
                vertical={false}
                innerRef={scrollRef}
                onScroll={throttle(handleScroll, 7)}
            >
                <ProjectCard project={projects[projects.length - 1]} mobileView={props.mobileView} darkMode={props.darkMode}  id={0}/>
                {projects.map((proj, idx) => (
                    <ProjectCard project={proj} mobileView={props.mobileView} darkMode={props.darkMode}  id={idx + 1} key={idx}/>
                ))}
                <ProjectCard project={projects[0]} mobileView={props.mobileView} darkMode={props.darkMode}  id={projects.length + 1}/>
            </ScrollContainer>
        </section>
    )
}