<script lang="ts" module>
	import { page } from '$app/state'
</script>

<script lang="ts">
	const defaultImage = import.meta.env.VITE_BASE_URL
		? new URL('/photos/colorful.jpg', import.meta.env.VITE_BASE_URL).href
		: '/photos/colorful.jpg'

	const url = import.meta.env.VITE_BASE_URL
		? new URL(page.url.pathname, import.meta.env.VITE_BASE_URL).href
		: page.url.href

	const {
		title,
		description,
		image = defaultImage,
	} = $props<{ title: string; description: string; image?: string }>()
</script>

<svelte:head>
	<title>{title} - Erik Dunning</title>
	<meta name="description" content="Learn more about Erik Dunning." />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<link rel="canonical" href={url} />
</svelte:head>
