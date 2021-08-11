import React from 'react';
const about = require('../content/about.json');

export default function About() {
    return (
        <section className="about">
            <h1 className="about-title">ABOUT</h1>
            <p className="about-desc">{about.desc}</p>
        </section>
    )
}