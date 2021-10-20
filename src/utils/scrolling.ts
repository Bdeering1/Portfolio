/* Pause Scroll
    -used to fix unwanted scrolling behaviour when moving between multiple scroll containers
    source: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
*/
export function pauseScroll(id : string, delay : number) {
    let el = document.getElementById(id);
    el.setAttribute('data-paused', '');
    el.addEventListener('scroll', preventDefault, false); // older FF
    el.addEventListener('wheel', preventDefault, wheelOpt()); // modern desktop
    setTimeout(() => {
        el.removeEventListener('scroll', preventDefault, false);
        el.removeEventListener('wheel', preventDefault, false);
        el.removeAttribute('data-paused');
    }, delay);
}

function preventDefault(e) {
    e.preventDefault();
}
function wheelOpt() {
    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
        window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
            get: function () { supportsPassive = true; } 
        }));
    } catch(e) {}

    return supportsPassive ? { passive: false } : false;
}

export function animateAbout() {
	document.querySelector<HTMLElement>('.about-rect').style.animationPlayState = 'running';
	document.querySelector<HTMLElement>('.social-links').classList.add('fade-in-links');

	setTimeout(() => {
		document.querySelector<HTMLElement>('.about-inner').style.opacity = '1';
	}, 250);
}