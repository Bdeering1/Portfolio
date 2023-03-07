import React from 'react';
import JSXLogoFromStr from '../components/LightDarkIcons';

interface StackProps {
    darkMode : boolean
}

const stackArray = ["Typescript", "Node", "Mongo", "Docker", "React", "Redux", "C#", "Blazor", "SASS", "HTML"];

export default function Stack(props : StackProps) {
    return (
			<section className='stack' id='stack' aria-label='stack'>
				<h1 className='stack-title title'>Stack</h1>
				<div className='stack-wrapper'>
					{stackArray.map((item, idx) =>
						JSXLogoFromStr(item, props.darkMode, idx)
					)}
				</div>
			</section>
		);
}