export const onInitialClientRender = () => {
    document.getElementById("___loader").style.opacity = 0;
    setTimeout(function() {
        document.getElementById("___loader").remove();
    }, 1250)
}