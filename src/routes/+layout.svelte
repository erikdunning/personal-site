<script module lang="ts">
	import '../app.css'
	import 'prism-themes/themes/prism-synthwave84.min.css'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import MobileMenu from '$lib/components/MobileMenu.svelte'
</script>

<script lang="ts">
	const { children } = $props()
</script>

<div class="flex flex-col min-h-screen relative w-full overflow-x-hidden pt-20">
	<Header />
	<main class="grow relative flex flex-col text-foreground">
		{@render children()}
	</main>
	<Footer />
</div>

<MobileMenu />
