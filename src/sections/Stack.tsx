import React from 'react';
import JSXLogoFromStr from '../components/LightDarkLogos';

interface StackProps {
    darkMode : boolean
}

const stackArray = ["React", "Redux", "Node", "SASS", "Bootstrap", "Javascript", "CSS", "HTML"]; //add gatsby and graphql to this :)

export default function Stack(props : StackProps) {
    return (
        <section className="stack" id="stack">
            <div className="stack-bar"/>
            <div className="stack-wrapper">
                {stackArray.map((item, idx) => (
                    JSXLogoFromStr(
                        item,
                        props.darkMode,
                        idx
                )))
                }
            </div>
            <div className="stack-bar"/>
        </section>
    )
}