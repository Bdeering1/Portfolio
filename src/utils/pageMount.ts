export default function pageMount(functions: any) {
	let newake_font = new FontFace(
		'Newake',
		'url(./fonts/newake.woff2), url(/fonts/newake.woff)'
	);
	newake_font.display = 'swap';
	newake_font.load().then(function (loaded_font) {
		document.fonts.add(loaded_font);
	});

	function updateDimensions() {
		setTimeout(() => {
			//fixes issue with rotation on mobile
			let innerHeight =
				window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight;
			document.documentElement.style.setProperty(
				'--inner-height',
				`${innerHeight}px`
			);
			functions.setMobileView(window.matchMedia('(max-width: 768px)').matches);
		}, 400);
	}

	function updateTheme() {
		functions.setDarkMode(
			true //window.matchMedia('(prefers-color-scheme: dark)').matches
		);
	}

	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', updateTheme);
	window.addEventListener('resize', updateDimensions);
	window.addEventListener('orientationchange', updateDimensions);
	window.onblur = () => {
		document.title = "Bryn's Portfolio";
	};
	window.onfocus = () => {
		document.title = 'Bryn Deering - Portfolio';
	};

	updateDimensions();
	updateTheme();

	return function pageUnmount() {
		window.removeEventListener('resize', updateDimensions);
		window.removeEventListener('orientationchange', updateDimensions);
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.removeEventListener('change', updateTheme);
	};
}
