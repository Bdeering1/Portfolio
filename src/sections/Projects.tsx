import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { debounce } from 'lodash';

import ProjectCard from '../components/ProjectCard';

const projects = require('../../data/projects.json');

interface ProjectsProps {
    mobileView : boolean,
    darkMode : boolean,
    scrollX? : number,
    scrollPtsX?: number[]
}

export default function Projects(props : ProjectsProps) {
    const ref = useRef(null);
    const [blinkScroll, setBlinkScroll] = useState(true);
    const [scrollX,  setScrollX] = useState(0);

    const { scroll } = useSpring({
        scroll: scrollX,
        immediate: blinkScroll,
        config: {tension: 80, friction: 12},
        onRest: () => {
            console.log("on rest activating");
            //if (blinkScroll) setBlinkScroll(false);
            ref.current.style.scrollSnapType = "x mandatory";
        }
    })

    useEffect(() => {
        setScrollX(props.scrollX);
        console.log(`setting scrollX to: ${props.scrollX}`);
    }, [props.scrollX]);

    const handleScroll = debounce((e : any) => {
        let el = e.target;
        if (!el) return;
        //console.log(`scrolling from: ${el.scrollLeft}`);
        console.log("SCROLL END");
        if (el.scrollLeft === props.scrollPtsX[0] ) {
            console.log("inifite scroll left (100)");
            setBlinkScroll(true);
            setScrollX(props.scrollPtsX[props.scrollPtsX.length - 2]);
            setBlinkScroll(false);
        } else if (el.scrollLeft === props.scrollPtsX[props.scrollPtsX.length - 1]) {
            console.log(`inifite scroll right (${el.scrollLeft})`);
            setBlinkScroll(true);
            setScrollX(props.scrollPtsX[1]);
            setBlinkScroll(false);
            console.log("scrollX: " + scrollX + " !")
        }
        else {
            console.log(`scroll end setter (${el.scrollLeft})`);
            setBlinkScroll(true);
            setScrollX(el.scrollLeft);
            setBlinkScroll(false);
        }
    }, 50);

    return (
        <animated.section
            className="projects"
            id="projects"
            onScroll={handleScroll}
            data-scroll-x={true}
            scrollLeft={scroll}
            ref={ref}
        >
            <ProjectCard project={projects[projects.length - 1]} mobileView={props.mobileView} darkMode={props.darkMode}  id={0}/>
            {projects.map((proj, idx) => (
                <ProjectCard project={proj} mobileView={props.mobileView} darkMode={props.darkMode}  id={idx + 1} key={idx}/>
            ))}
            <ProjectCard project={projects[0]} mobileView={props.mobileView} darkMode={props.darkMode}  id={projects.length + 1}/>
        </animated.section>
    )
}