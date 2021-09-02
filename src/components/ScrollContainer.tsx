import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { throttle } from 'lodash';

import { pauseScroll } from '../utils/scrolling';

export default function ScrollContainer( props : any ) {
    const ref = useRef(null);
    let scrollAreas : number[] = [];


    useEffect(() => {
        scrollInit();
        pauseScroll('main', 2000);
    }, [])

    function handleScroll() {
        let el = ref.current;
        if (!el.hasAttribute('data-scrolled') && el.scrollTop === scrollAreas[1]) {
            document.querySelector<HTMLElement>('.about-rect').style.animationPlayState = 'running';
            pauseScroll('main', 1000);
            setTimeout(() => {
                document.querySelector<HTMLElement>('.about-title').style.opacity = '1'
                document.querySelector<HTMLElement>('.about-desc').style.opacity = '1'
                document.querySelector<HTMLElement>('.stack-callout').style.opacity = '1'
            }, 250);
            el.setAttribute('data-scrolled', '');
        } if (el.scrollTop > scrollAreas[2]) {
            pauseScroll('projects', 800);
        }
    }

    function scrollInit() {
        const el = ref.current;

        //Getting bounds of scroll containers
        let scrollLeft : number[][] = []; //horizontal scroll containers (if any)
        for (let i = 0; i < el.children.length; i++) {
            let section = el.children[i];
            scrollAreas[i] = Math.round(section.getBoundingClientRect().top);
            scrollLeft[i] = [null];
            if (section.querySelector('[data-scrollable]')) {
                for (let j = 0; j < section.children.length; j++) {
                    scrollLeft[i][j] = Math.round(section.children[j].getBoundingClientRect().left);
                }
            }
        }
        document.getElementById('projects').scrollLeft = window.innerWidth;
    
    
        /* Scroll Events
        -handles scroll restrictions on load and small scroll behaviour fixes
        */
        el.addEventListener("scroll", throttle(() => {
            if (!el.hasAttribute('data-scrolled') && el.scrollTop === scrollAreas[1]) {
                document.querySelector<HTMLElement>('.about-rect').style.animationPlayState = 'running';
                pauseScroll('main', 1000);
                setTimeout(() => {
                    document.querySelector<HTMLElement>('.about-title').style.opacity = '1'
                    document.querySelector<HTMLElement>('.about-desc').style.opacity = '1'
                    document.querySelector<HTMLElement>('.stack-callout').style.opacity = '1'
                }, 250);
                el.setAttribute('data-scrolled', '');
            } if (el.scrollTop > scrollAreas[2]) {
                pauseScroll('projects', 800);
            }
        }, 100));
    
        /* Arrow Key Events
        -designed to work for any number of sections with horizontal scrolling
        -assumes mandatory scroll snap
        */
        window.addEventListener('keydown', (e) => {
            if (el.hasAttribute('data-paused')) return;
            let scrollArea : number;
            for (let i = 0; i < scrollAreas.length; i++) { //determine user's current vertical scroll area
                if (el.scrollTop == scrollAreas[i]) {
                    scrollArea = i;
                }
            }
            if (scrollArea === undefined) return;
    
            if (e.code === "ArrowLeft") {
                let section = el.children[scrollArea];
                if (!section.querySelector('[data-scrollable]') || section.scrollLeft === 0) return;
                for (let i = 0; i < scrollLeft[scrollArea].length; i++) {
                    if (section.scrollLeft === scrollLeft[scrollArea][i]) {
                        section.scrollTo({
                            left: scrollLeft[scrollArea][i - 1],
                            behavior: 'smooth'
                        })
                    }
                }
            } else if (e.code === "ArrowRight") {
                let section = el.children[scrollArea];
                if (!section.querySelector('[data-scrollable]')
                || section.scrollLeft === scrollLeft[scrollArea][scrollLeft[scrollArea].length - 1]) return;
                for (let i = 0; i < scrollLeft[scrollArea].length; i++) {
                    if (section.scrollLeft === scrollLeft[scrollArea][i]) {
                        section.scrollTo({
                            left: scrollLeft[scrollArea][i + 1],
                            behavior: 'smooth'
                        })
                    }
                }
            } else if (e.code === "ArrowUp") {
                if (scrollArea === 0) return;
                el.scrollTo({
                    top: scrollAreas[scrollArea - 1],
                    behavior: 'smooth'
                })
            } else if (e.code === "ArrowDown") {
                if (scrollArea === scrollAreas[scrollAreas.length] - 1) return;
                el.scrollTo({
                    top: scrollAreas[scrollArea + 1],
                    behavior: 'smooth'
                })
            }
        });
    }

    const { scroll } = useSpring({
        scroll: 1000,
        from: { scroll: 0},
        reset: true,
        //reverse: flip,
        //delay: 400,
        //config: config.molasses,
        //onRest: () => set(!flip),
    })


    return <animated.main
        ref={ref}
        id="main"
        onScroll={throttle(handleScroll, 100)}
        //scrollTop={scroll}
    >
        {props.children}
    </animated.main>
}