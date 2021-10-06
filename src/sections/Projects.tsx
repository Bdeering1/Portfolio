import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { debounce } from 'lodash';

import ProjectCard from '../components/ProjectCard';

const projects = require('../../data/projects.json');

interface ProjectsProps {
	mobileView: boolean;
	darkMode: boolean;
	scrollX?: number;
	scrollPtsX?: number[];
}

export default function Projects(props: ProjectsProps) {
	const ref = useRef(null);
	const [blinkScroll, setBlinkScroll] = useState(true);
	const [scrollX, setScrollX] = useState(0);

	const { scroll } = useSpring({
		scroll: scrollX,
		immediate: blinkScroll,
		onRest: () => {
			//if (blinkScroll) setBlinkScroll(false);
			ref.current.style.scrollSnapType = 'x mandatory';
		}
	});

	useEffect(() => {
		setScrollX(props.scrollX);
    document.querySelectorAll<HTMLElement>('.project-links').forEach((el) => {
			el.classList.add('fade-in-links');
		});
	}, [props.scrollX]);

	const handleScroll = debounce((e: any) => {
		let el = e.target;
		if (!el) return;
		if (el.scrollLeft === props.scrollPtsX[0]) {
			setBlinkScroll(true);
			setScrollX(props.scrollPtsX[props.scrollPtsX.length - 2]);
			setBlinkScroll(false);
		} else if (
			el.scrollLeft === props.scrollPtsX[props.scrollPtsX.length - 1]
		) {
			setBlinkScroll(true);
			setScrollX(props.scrollPtsX[1]);
			setBlinkScroll(false);
		} else {
			setBlinkScroll(true);
			setScrollX(el.scrollLeft);
			setBlinkScroll(false);
		}
	}, 50);

	return (
		<animated.section
			className='projects'
			id='projects'
			aria-label='projects'
			onScroll={handleScroll}
			data-scroll-x={true}
			scrollLeft={scroll}
			ref={ref}
		>
			<ProjectCard
				project={projects[projects.length - 1]}
				mobileView={props.mobileView}
				darkMode={props.darkMode}
				id={0}
			/>
			{projects.map((proj, idx) => (
				<ProjectCard
					project={proj}
					mobileView={props.mobileView}
					darkMode={props.darkMode}
					id={idx + 1}
					key={idx}
				/>
			))}
			<ProjectCard
				project={projects[0]}
				mobileView={props.mobileView}
				darkMode={props.darkMode}
				id={-1} /* last element has id of -1 */
			/>
		</animated.section>
	);
}