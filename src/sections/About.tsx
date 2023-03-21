import React from 'react';
import JSXLogoFromStr from '../components/LightDarkIcons';
const about = require('../../data/about.json');

export default function About(props: { darkMode: boolean }) {
	return (
		<section className='about' id='about' aria-label='about'>
			<div className='rect about-rect' />
			<div className='about-inner'>
				<h1 className='about-title title'>About</h1>
				<p className='about-desc body-text-lg'>{about.desc}</p>
			</div>
			{/*         <div className='stack-callout body-text-lg'>
          <p className='stack-callout-text'>Check out my stack below!</p>
          <p className='stack-callout-arrow'>v</p>
        </div> */}
			<div className='social-links links-wrapper'>
				<a
					href='https://www.linkedin.com/in/bryn-deering/'
					rel='noopener noreferrer'
					aria-label='LinkedIn Link'
					tabIndex={0}
				>
					{JSXLogoFromStr('Linkedin', props.darkMode)}
				</a>
				<a
					href='https://github.com/Bdeering1'
					rel='noopener noreferrer'
					aria-label='Github Link'
					tabIndex={0}
				>
					{JSXLogoFromStr('Github', props.darkMode)}
				</a>
			</div>
		</section>
	);
}
