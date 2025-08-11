<script lang="ts">
	import HeadMetas from '$lib/components/HeadMetas.svelte'
	import Introduction from '$lib/content/about/Introduction.svx'
	import InfoAccordion from '$lib/components/InfoAccordion.svelte'
</script>

<HeadMetas title="About" description="Learn more about Erik Dunning." />

<article class="max-w-5xl w-full mx-auto px-6 prose h-full grow">
	<Introduction />
</article>

<div class="relative">
	<enhanced:img src="/static/photos/dogs.webp" width="3000" height="500" alt="Luci and Samson" class="w-full" />
	<div class="dogs"></div>
</div>

<style>
	.dogs {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to bottom,
			oklch(from var(--background) l c h / 1) 3%,
			oklch(from var(--background) l c h / 0) 10%
		);
	}
</style>
