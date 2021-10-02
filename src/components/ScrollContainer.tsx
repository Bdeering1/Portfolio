import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { throttle, debounce } from 'lodash';

import { pauseScroll } from '../utils/scrolling';

export default function ScrollContainer(props: any) {
  const ref = useRef(null);
  const [scrollDestY, setScrollDestY] = useState(0);
  const [blinkScroll, setBlinkScroll] = useState(false);
  const [scrollDestX, setScrollDestX] = useState([]);
  const [scrollPtsX, setScrollPtsX] = useState([]);

  useEffect(() => {
    let scrollPtsX = scrollInit();
    setScrollPtsX(scrollPtsX);
    pauseScroll('main', 2000);
    //pauseScroll('projects', 2000);
  }, []);

  function scrollInit() {
    const el = ref.current;

    /* Initialize scrollDestX array */
    for (let i = 0; i < props.children.length; i++) {
      setScrollDestX((arr) => [...arr, 0]);
    }

    let scrollPtsY: number[] = []; /* vertical scroll containers */
    let scrollPtsX: number[][] = []; /* horizontal scroll containers (if any) */
    for (let i = 0; i < el.children.length; i++) {
      let section = el.children[i];
      scrollPtsY[i] = Math.round(section.getBoundingClientRect().top);
      scrollPtsX[i] = [null];
      if (section.hasAttribute('data-scroll-x')) {
        section.style.scrollSnapType = 'none';
        section.scrollLeft = 0;
        for (let j = 0; j < section.children.length; j++) {
          scrollPtsX[i][j] = Math.round(
            section.children[j].getBoundingClientRect().left
          );
        }
        section.style.scrollSnapType = '';
        setScrollDestX((arr) => [
          ...arr.slice(0, i),
          scrollPtsX[i][0],
          ...arr.slice(i + 1)
        ]);
      }
    }

    /* additional elements are added on either to create 'infinite' scroll effect,
             this ensures scrolling starts at the intended first element */
    //document.getElementById('projects').scrollLeft = scrollPtsX[3][1]; //Safari seems to calculate scroll with margin taken into account
    setScrollDestX((arr) => [
      ...arr.slice(0, 3),
      scrollPtsX[3][1],
      ...arr.slice(3 + 1)
    ]);

    /* Scroll Events
            -handles scroll restrictions on load and scroll behaviour fixes
            -triggers on react-spring scrolling
        */
    el.addEventListener(
      'scroll',
      debounce(() => {
        if (
          !el.hasAttribute('data-scrolled') &&
          el.scrollTop >= scrollPtsY[1]
        ) {
          document.querySelector<HTMLElement>(
            '.about-rect'
          ).style.animationPlayState = 'running';
          document.querySelector<HTMLElement>(
            '.socials-wrapper'
          ).style.animationPlayState = 'running';

          pauseScroll('main', 1000);
          setTimeout(() => {
            document.querySelector<HTMLElement>('.about-inner').style.opacity =
              '1';
          }, 250);
          el.setAttribute('data-scrolled', '');
        } else if (el.scrollTop > scrollPtsY[2]) {
          //pauseScroll('projects', 800);
        }
        setBlinkScroll(true);
        setScrollDestY(el.scrollTop);
        setBlinkScroll(false);
      }, 100)
    );

    /* Arrow Key Events
        -designed to work for any number of sections with horizontal scrolling
        -assumes mandatory scroll snap
        */
    window.addEventListener(
      'keydown',
      throttle((e) => {
        if (el.hasAttribute('data-paused')) return;
        let scrollAreaY: number;
        for (let i = 0; i < scrollPtsY.length; i++) {
          if (el.scrollTop == scrollPtsY[i]) {
            /* user's current vertical scroll */
            scrollAreaY = i;
          }
        }
        /* prevents weird behaviour on partial scroll */
        if (scrollAreaY === undefined) return;

        let scrollDir: string;
        let loopStart: number;
        let loopEnd: number;
        switch (e.code) {
          case 'ArrowLeft':
            if (scrollPtsX[scrollAreaY] === null) break;
            scrollDir = 'horizontal';
            loopStart = 1;
            loopEnd = scrollPtsX[scrollAreaY].length;
            break;
          case 'ArrowRight':
            if (scrollPtsX[scrollAreaY] === null) break;
            scrollDir = 'horizontal';
            loopStart = 0;
            loopEnd = scrollPtsX[scrollAreaY].length - 1;
            break;
          case 'ArrowUp':
            if (scrollAreaY === 0) break;
            scrollDir = 'vertical';
            break;
          case 'ArrowDown':
            if (scrollAreaY === scrollPtsY.length - 1) break;
            scrollDir = 'vertical';
            break;
          default:
            return;
        }

        if (scrollDir === 'horizontal') {
          let section = el.children[scrollAreaY];
          for (let i = loopStart; i < loopEnd; i++) {
            if (section.scrollLeft === scrollPtsX[scrollAreaY][i]) {
              section.style.scrollSnapType = 'none';
              let scrollX =
                scrollPtsX[scrollAreaY][i + (e.code === 'ArrowLeft' ? -1 : 1)];
              setScrollDestX((arr) => [
                ...arr.slice(0, scrollAreaY),
                scrollX,
                ...arr.slice(scrollAreaY + 1)
              ]);
              break;
            }
          }
        } else if (scrollDir === 'vertical') {
          el.style.scrollSnapType = 'none';
          setScrollDestY(
            scrollPtsY[scrollAreaY + (e.code === 'ArrowUp' ? -1 : 1)]
          );
        }
      }, 900)
    );

    return scrollPtsX;
  }

  const { scroll } = useSpring({
    scroll: scrollDestY,
    immediate: blinkScroll,
    onRest: () => {
      ref.current.style.scrollSnapType = 'y mandatory';
    }
  });

  return (
    <animated.main ref={ref} id='main' scrollTop={scroll}>
      {React.Children.map(props.children, (child, idx) =>
        React.cloneElement(
          child,
          scrollDestX[idx] !== null
            ? { scrollX: scrollDestX[idx], scrollPtsX: scrollPtsX[idx] }
            : {}
        )
      )}
    </animated.main>
  );
}
