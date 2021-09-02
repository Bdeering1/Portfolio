export default function pageMount(functions : any) {

    function updateDimensions() {
        setTimeout(() => { //fixes issue with rotation on mobile
            let innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            document.documentElement.style.setProperty('--inner-height', `${innerHeight}px`);
            functions.setMobileView(window.matchMedia("(max-width: 768px)").matches)
        }, 400);
    }

    function updateTheme() {
        functions.setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', updateDimensions);
    window.onblur = () => {document.title = 'Bryn Deering'};
    window.onfocus = () => {document.title = 'Portfolio'};

    updateDimensions();
    updateTheme();

    return function pageUnmount() {
        window.removeEventListener('resize', updateDimensions);
        window.removeEventListener('orientationchange', updateDimensions);
        window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", updateTheme);
    }
}