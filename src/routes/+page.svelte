<script lang="ts">
	import ChatBox from '$lib/components/ChatBox.svelte'
	import HeadMetas from '$lib/components/HeadMetas.svelte'
</script>

<HeadMetas
	title="Home"
	description="Erik Dunning is a Software Engineer, Web Developer and Digital Artist living in Madison, WI."
/>

<div class="w-full min-h-full grow flex flex-col items-center">
	<div class="flex flex-col gap-8 my-8 items-center">
		<div class="relative size-48 overflow-hidden shadow-2xl rounded-full border-2 border-foreground">
			<enhanced:img src="/static/photos/colorful.jpg" alt="Erik Dunning" class="w-full absolute left-0 -top-8" />
		</div>
		<div class="flex flex-col font-light text-xs items-center gap-2 text-foreground/60">
			<span>SOFTWARE ENGINEER</span>
			<span>WEB DEVELOPER</span>
			<span>DIGITAL ARTIST</span>
		</div>
	</div>
	<ChatBox />
</div>
