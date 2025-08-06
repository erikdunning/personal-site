<script lang="ts" module>
	import Introduction from '$lib/content/testimonials/Introduction.svx'
	import HeadMetas from '$lib/components/HeadMetas.svelte'
	import EdPritchard from '$lib/content/testimonials/quotes/ed-pritchard.svx'
	import SwanandKavitkar from '$lib/content/testimonials/quotes/swanand-kavitkar.svx'
	import StevenBoutcher from '$lib/content/testimonials/quotes/steven-boutcher.svx'

	const quotes = [EdPritchard, SwanandKavitkar, StevenBoutcher]
</script>

<HeadMetas
	title="Testimonials"
	description="Testimonials from clients and colleagues about my work and abilities. Their feedback highlight my skills, professionalism, and the impact of my efforts on projects."
/>

<article class="max-w-5xl w-full mx-auto px-6 prose">
	<Introduction />
	<div class="flex flex-col gap-6 my-20">
		{#each quotes as Quote}
			<div class="quote-container">
				<Quote />
			</div>
		{/each}
	</div>
</article>
