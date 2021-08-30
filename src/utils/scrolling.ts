/* Enable/Disable Scrolling
-used to fix unwanted scrolling behaviour when moving between multiple scroll containers
source: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
*/
export function disableScroll(id : string) {
    document.getElementById(id).addEventListener('scroll', preventDefault, false); // older FF
    document.getElementById(id).addEventListener('wheel', preventDefault, wheelOpt()); // modern desktop
}
export function enableScroll(id : string) {
    document.getElementById(id).removeEventListener('scroll', preventDefault, false);
    document.getElementById(id).removeEventListener('wheel', preventDefault, false);
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

/* Arrow Key Scrolling
-designed to work for any number of sections with horizontal scrolling
-assumes mandatory scroll snap
*/
export function arrowKeyScroll(el : HTMLElement) {
    let scrollTop : number[] = []; //array for vertical scroll container
    let scrollLeft : number[][] = []; //array for horizontal scroll containers (if any)
    for (let i = 0; i < el.children.length; i++) {
        let section = el.children[i];
        scrollTop[i] = Math.round(section.getBoundingClientRect().top);
        scrollLeft[i] = [null];
        if (section.querySelector('[data-scrollable]')) {
            for (let j = 0; j < section.children.length; j++) {
                scrollLeft[i][j] = Math.round(section.children[j].getBoundingClientRect().left);
            }
        }
    }

    window.addEventListener('keydown', (e) => {
        let scrollArea : number;
        for (let i = 0; i < scrollTop.length; i++) { //determine user's current vertical scroll area
            if (el.scrollTop == scrollTop[i]) {
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
                top: scrollTop[scrollArea - 1],
                behavior: 'smooth'
            })
        } else if (e.code === "ArrowDown") {
            if (scrollArea === scrollTop[scrollTop.length] - 1) return;
            el.scrollTo({
                top: scrollTop[scrollArea + 1],
                behavior: 'smooth'
            })
            //scrollElementTo(el, {y: scrollTop[scrollArea + 1]});
        }
    });

    return scrollTop;
}

interface locX {
    x: number
}
interface locY {
    y: number
}
async function scrollElementTo(el : HTMLElement, loc : locX | locY) {
    let scrollIncrement : number;
    if ((loc as locX).x) {
        while(el.scrollLeft !== (loc as locX).x) {

        }
    } else {
        scrollIncrement = el.scrollTop < (loc as locY).y ? 2 : -2;
        while(el.scrollTop !== (loc as locY).y) {
            el.scrollBy(0, scrollIncrement);
            await sleep(1);
        }
    }
}

function sleep(ms :  number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}