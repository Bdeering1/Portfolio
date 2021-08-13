export function disableScroll() {
    document.querySelector('.projects').addEventListener('scroll', preventDefault, false); // older FF
    document.querySelector('.projects').addEventListener('wheel', preventDefault, wheelOpt()); // modern desktop
}

export function enableScroll() {
    document.querySelector('.projects').removeEventListener('scroll', preventDefault, false);
    document.querySelector('.projects').removeEventListener('wheel', preventDefault, false);
}

function preventDefault(e) {
    e.preventDefault();
}
function wheelOpt() {
    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; } 
        }));
    } catch(e) {}

    return supportsPassive ? { passive: false } : false;
}