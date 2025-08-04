import { browser } from "$app/environment"

export let currentTheme = $state<{ mode: "light" | "dark" }>(
	browser && window.localStorage.getItem("theme")
		? { mode: window.localStorage.getItem("theme") as "light" | "dark" }
		: browser && window.matchMedia("(prefers-color-scheme: dark)").matches
			? { mode: "dark" }
			: { mode: "light" },
)

export const mobileMenuState = $state<{ useMobileMenu: boolean; isMobileMenuOpen: boolean }>({
	useMobileMenu: false,
	isMobileMenuOpen: false,
})

if (browser) {
	// Initialize useMobileMenu based on the window width and react to resizing
	mobileMenuState.useMobileMenu = window.innerWidth < 1024
	window.addEventListener("resize", () => {
		mobileMenuState.useMobileMenu = window.innerWidth < 1024
	})

	if (currentTheme.mode === "dark") {
		document.body.classList.add("dark")
	} else {
		document.body.classList.remove("dark")
	}
}
