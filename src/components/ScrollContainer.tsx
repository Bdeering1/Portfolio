import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { throttle } from 'lodash';

import { pauseScroll } from '../utils/scrolling';

export default function ScrollContainer( props : any ) {
    const ref = useRef(null);
    const [scrollDest, setScrollDest] = useState(0);
    const [scrollDestX, setScrollDestX] = useState([]);

    useEffect(() => {
        scrollInit();
        pauseScroll('main', 2000);
    }, [])

    function scrollInit() {
        for (let i = 0; i < props.children.length; i++) {
            setScrollDestX(arr => ([...arr, null]));
        }
        const el = ref.current;

        let scrollPtsY : number[] = []; /* vertical scroll containers */
        let scrollPtsX : number[][] = []; /* horizontal scroll containers (if any) */
        for (let i = 0; i < el.children.length; i++) {
            let section = el.children[i];
            scrollPtsY[i] = Math.round(section.getBoundingClientRect().top);
            scrollPtsX[i] = [null];
            if (section.hasAttribute('data-scroll-x')) {
                for (let j = 0; j < section.children.length; j++) {
                    scrollPtsX[i][j] = Math.round(section.children[j].getBoundingClientRect().left);
                    setScrollDestX(arr => [...arr.slice(0,i), 0, ...arr.slice(i+1)]);
                }
            }
        }
        /* additional elements are added on either to create 'infinite' scroll effect,
             this ensures scrolling starts at the intended first element */
        document.getElementById('projects').scrollLeft = window.innerWidth;
        setScrollDestX(arr => [...arr.slice(0,3), window.innerWidth, ...arr.slice(3+1)]);
    
        /* Scroll Events
            -handles scroll restrictions on load and scroll behaviour fixes
            -triggers on react-spring scrolling
        */
        el.addEventListener("scroll", throttle(() => {
            if (!el.hasAttribute('data-scrolled') && el.scrollTop === scrollPtsY[1]) {
                document.querySelector<HTMLElement>('.about-rect').style.animationPlayState = 'running';
                pauseScroll('main', 1000);
                setTimeout(() => {
                    document.querySelector<HTMLElement>('.about-title').style.opacity = '1'
                    document.querySelector<HTMLElement>('.about-desc').style.opacity = '1'
                    document.querySelector<HTMLElement>('.stack-callout').style.opacity = '1'
                }, 250);
                el.setAttribute('data-scrolled', '');
            } if (el.scrollTop > scrollPtsY[2]) {
                pauseScroll('projects', 800);
            }
        }, 100));
    
        /* Arrow Key Events
        -designed to work for any number of sections with horizontal scrolling
        -assumes mandatory scroll snap
        */
        window.addEventListener('keydown', (e) => {
            if (el.hasAttribute('data-paused')) return;
            let scrollAreaY : number;
            for (let i = 0; i < scrollPtsY.length; i++) {
                if (el.scrollTop == scrollPtsY[i]) {
                    /* user's current vertical scroll */
                    scrollAreaY = i;
                }
            }
            /* prevents weird behaviour on partial scroll */
            if (scrollAreaY === undefined) return;
    
            let scrollDir : string;
            let loopStart : number;
            let loopEnd : number;
            switch(e.code) {
                case "ArrowLeft":
                    if (scrollPtsX[scrollAreaY] === null) break;
                    scrollDir =  "horizontal";
                    loopStart = 1;
                    loopEnd = scrollPtsX[scrollAreaY].length;
                    break;
                case "ArrowRight":
                    if (scrollPtsX[scrollAreaY] === null) break;
                    scrollDir =  "horizontal";
                    loopStart = 0;
                    loopEnd = scrollPtsX[scrollAreaY].length - 1;
                    break;
                case "ArrowUp":
                    if (scrollAreaY === 0) break;
                    scrollDir = "vertical";
                    break;
                case "ArrowDown":
                    if (scrollAreaY === scrollPtsY.length - 1) break;
                    scrollDir = "vertical";
                    break;
                default:
                    return;
            }

            if (scrollDir === "horizontal") {
                let section = el.children[scrollAreaY];
                for (let i = loopStart; i < loopEnd; i++) {
                    if (section.scrollLeft === scrollPtsX[scrollAreaY][i]) {
                        let scrollX = scrollPtsX[scrollAreaY][i + (e.code === "ArrowLeft" ? -1 : 1)];
                        setScrollDestX(arr => [...arr.slice(0,scrollAreaY), scrollX, ...arr.slice(scrollAreaY+1)]);
                        /* section.scrollTo({
                            left: scrollPtsX[scrollAreaY][i + (e.code === "ArrowLeft" ? -1 : 1)],
                            behavior: 'smooth'
                        }); */
                        break;
                    }
                }
            } else if (scrollDir === "vertical") {
                ref.current.style.scrollSnapType = "none";
                setScrollDest(scrollPtsY[scrollAreaY + (e.code === "ArrowUp" ? -1 : 1)]);
                //ref.current.style.scrollSnapType = "y mandatory";
            }
        });
    }

    const { scroll } = useSpring({
        scroll: scrollDest,
        //reset: true,
        //onScrollEnd: ref.current ? ref.current.style.scrollSnapType = "y mandatory" : null
    })


    return <animated.main
        ref={ref}
        id="main"
        scrollTop={scroll}
    >
        {React.Children.map(
            props.children,
            (child, idx) => React.cloneElement(child, scrollDest[idx] !== null ? {scrollX: scrollDestX[idx]} : {})
        )}
    </animated.main>
}