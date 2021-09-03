import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { throttle } from 'lodash';

import ProjectCard from '../components/ProjectCard';

const projects = require('../../data/projects.json');

interface ProjectsProps {
    mobileView : boolean,
    darkMode : boolean,
    scrollX? : number
}

export default function Projects(props : ProjectsProps) {
    const [blinkScroll, setBlinkScroll] = useState(false);
    const [scrollX,  setScrollX] = useState(0);

    const { scroll } = useSpring({
        scroll: scrollX,
        immediate: blinkScroll,
        //from: {scroll: ref.current ? ref.current.scrollLeft : 0}
        //reset: true,
        onRest: () => {blinkScroll ? setBlinkScroll(false) : null}
    })

    useEffect(() => {
        setScrollX(props.scrollX);
    }, [props.scrollX])

    const handleScroll = (e : any) => {
        let el = e.target;
        if (!el) return;
        if (el.scrollLeft == 0) {
            setBlinkScroll(true);
            setScrollX(el.scrollLeft + window.innerWidth * 3);
        } else if (el.scrollLeft == window.innerWidth * 4) {
            setBlinkScroll(true);
            setScrollX(el.scrollLeft - window.innerWidth * 3);
        }
    }

    return (
        <animated.section
            className="projects"
            id="projects"
            onScroll={throttle(handleScroll, 7)}
            data-scroll-x={true}
            scrollLeft={scroll}
        >
                <ProjectCard project={projects[projects.length - 1]} mobileView={props.mobileView} darkMode={props.darkMode}  id={0}/>
                {projects.map((proj, idx) => (
                    <ProjectCard project={proj} mobileView={props.mobileView} darkMode={props.darkMode}  id={idx + 1} key={idx}/>
                ))}
                <ProjectCard project={projects[0]} mobileView={props.mobileView} darkMode={props.darkMode}  id={projects.length + 1}/>
        </animated.section>
    )
}