<script lang="ts" module>
	import {
		IconBaselineDensityMedium,
		IconBrandGithub,
		IconBrandLinkedin,
		IconMoon,
		IconSun,
	} from '@tabler/icons-svelte'
	import Navigation from './Navigation.svelte'
	import { currentTheme, mobileMenuState } from '$lib/variables/state.svelte'
</script>

<header class="flex items-center h-16 px-6 fixed top-0 right-0 left-0 z-50">
	<button
		aria-label="toggle navigation menu"
		class="lg:hidden items-center justify-center mr-6 hover:cursor-pointer"
		onclick={() => (mobileMenuState.isMobileMenuOpen = !mobileMenuState.isMobileMenuOpen)}
	>
		<IconBaselineDensityMedium class="size-4" />
	</button>
	<a href="/" class="text-md lg:text-lg font-bold font-serif">Erik Dunning</a>
	<div class="grow flex justify-center">
		{#if !mobileMenuState.useMobileMenu}
			<Navigation />
		{/if}
	</div>
	<div class="flex gap-6">
		<button
			type="button"
			class="hover:cursor-pointer"
			onclick={() => {
				console.log('wheee')
				currentTheme.mode = currentTheme.mode === 'dark' ? 'light' : 'dark'
				if (currentTheme.mode === 'light') {
					document.body.classList.remove('dark')
				} else {
					document.body.classList.add('dark')
				}
				window.localStorage.setItem('theme', currentTheme.mode)
			}}
		>
			{#if currentTheme.mode === 'dark'}
				<IconMoon class="size-6" />
			{:else}
				<IconSun class="size-6" />
			{/if}
		</button>
		<a href="https://www.linkedin.com/in/erik-dunning-5361b938/" target="_blank" rel="noopener noreferrer">
			<IconBrandLinkedin class="size-6" />
		</a>
		<a href="https://www.github.com/erikdunning" target="_blank" rel="noopener noreferrer">
			<IconBrandGithub class="size-6" />
		</a>
	</div>
</header>

<style>
	header {
		background: rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	}
</style>
