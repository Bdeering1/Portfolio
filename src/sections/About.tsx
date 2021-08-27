import React from 'react';
const about = require('../../data/about.json');

export default function About() {
    return (
        <section className="about" id="about">
            <h1 className="about-title">ABOUT</h1>
            <p className="about-desc body-text-lg">{about.desc}</p>
            <div className="stack-callout body-text-lg">
                <p className="stack-callout-text">Check out my stack below!</p>
                <p className="stack-callout-arrow">v</p>
            </div>
        </section>
    )
}