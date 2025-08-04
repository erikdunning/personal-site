<script lang="ts">
	import { browser } from '$app/environment'
	import { afterNavigate } from '$app/navigation'
	import { mobileMenuState } from '$lib/variables/state.svelte'

	let pages = [
		{ name: 'Home', path: '/', active: false },
		{ name: 'About', path: '/about', active: false },
		{ name: 'Résumé', path: '/resume', active: false },
		{ name: 'Testimonials', path: '/testimonials', active: false },
		{ name: 'Contact', path: '/contact', active: false },
		{ name: 'Projects', path: '/projects', active: false },
	]

	const refreshLinks = () => {
		if (browser) {
			const currentPath = window.location.pathname
			pages = pages.map((page) => {
				if (currentPath.startsWith(page.path)) {
					page.active = true
					if (page.path === '/') {
						page.active = currentPath === page.path // Ensure only root is active for '/'
					}
				} else {
					page.active = false
				}
				return page
			})
		}
	}

	refreshLinks()
	afterNavigate(() => refreshLinks())
</script>

<nav class="my-8 font-serif">
	<ul class="flex text-base-content gap-8 px-6" class:flex-col={mobileMenuState.useMobileMenu}>
		{#each pages as page (page.path + page.active)}
			<li class="flex items-center justify-center w-full lg:w-fit">
				<a
					class="text-lg lg:text-sm"
					class:opacity-50={!page.active}
					href={page.path}
					onclick={() => {
						mobileMenuState.isMobileMenuOpen = false
					}}>{page.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>
