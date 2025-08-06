<script lang="ts" module>
	import { IconRobot } from '@tabler/icons-svelte'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import { createMLCEngine, processRequest } from '$lib/utils/chat-main'
	import { checkWebGPUSupport } from '$lib/utils/web-gpu-support'
	import { IconSend2 } from '@tabler/icons-svelte'

	import type { MLCEngineInterface } from '@mlc-ai/web-llm'
</script>

<script lang="ts">
	const placeholder = 'Ask this LLM (AI bot) about me!' + '\n' + 'Example: Where did you go to school?'
	const unsupported = 'Unsupported browser or device!'

	let ref: HTMLTextAreaElement
	let hasWebGPU = $state(false)
	let isSupportedBrowser = $state(true)
	let enabled = $derived(hasWebGPU && isSupportedBrowser)
	let running = $state(false)
	let value = $state('')
	let engine: MLCEngineInterface | null = $state(null)

	const evaluateCurrentQuestion = async () => {
		if (ref && ref.value && enabled && !running) {
			try {
				running = true
				engine ||= await createMLCEngine()
				await processRequest(engine, ref.value)
			} catch (e) {
				console.error(e)
			}
			running = false
		}
	}

	beforeNavigate(() => {
		engine?.interruptGenerate()
		running = false
	})

	afterNavigate(async () => {
		ref?.focus()
		hasWebGPU = await checkWebGPUSupport()
	})
</script>

<div class="flex flex-col gap-8 w-full py-10 bg-accent/5 items-center justify-center p-6">
	<div class="max-w-md flex flex-col gap-4">
		<h2>Virtual Assistant</h2>
		<p class="text-sm">
			This is a little demo bot that answers questions about me and my work experience using LLM (AI) processing
			in the browser given markdown files used to build the site as context. Ask away!
		</p>
		<p class="text-xs opacity-60">
			It's built on some bleeding edge browser APIs (WebGPU / WASM with Web Workers) so it may not work 100% of
			the time or on all devices and using Chrome / Edge on a desktop or laptop computer is recommended for GPU
			support!
		</p>
	</div>
	<div
		class="flex flex-col gap-4 p-6 border border-foreground rounded-sm w-full max-w-xl mx-6 bg-foreground/5 relative"
	>
		<textarea
			bind:this={ref}
			bind:value
			rows="3"
			disabled={!enabled}
			id="user-question"
			class="block w-full max-w-xl border border-foreground p-4 font-mono bg-foreground/5 text-mono text-foreground rounded-sm text-xs overflow-x-hidden overflow-y-auto"
			onkeydown={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault()
					evaluateCurrentQuestion()
				}
			}}
			placeholder={enabled ? placeholder : unsupported}
		></textarea>
		<div class="flex justify-end items-center gap-8 text-sm">
			{#if running}
				<button
					type="button"
					disabled={!running}
					onclick={() => {
						engine?.interruptGenerate()
						running = false
					}}>Cancel</button
				>
			{:else if enabled}
				<button
					type="button"
					onclick={async (e) => {
						console.log(value)
						if (ref) {
							value = ''
							ref.focus()
						}
					}}>Clear</button
				>
			{/if}
			{#if enabled}
				<button
					type="button"
					disabled={running}
					class:grayscale={running}
					onclick={evaluateCurrentQuestion}
					class="flex gap-4 items-center justify-center bg-accent-foreground px-4 py-1 rounded-md"
					><div>Ask</div>
					<IconSend2 class="block size-4"></IconSend2></button
				>
			{/if}
		</div>
		<span
			class="text-xs capitalize bg-background rounded-sm absolute left-4 -top-3 px-2 py-1 border border-foreground"
			>Question</span
		>
	</div>

	<div class="p-6 border border-foreground rounded-sm w-full max-w-xl mx-6 bg-foreground/5 relative">
		<div class="flex items-center justify-center mb-2 gap-4">
			<IconRobot class="size-6" />
			<span id="loading-label" class="bg-transparent w-full rounded-sm border-none text-xs">
				{enabled ? (running ? 'Loading...' : 'Waiting for a question!') : 'Unsupported browser!'}
			</span>
		</div>
		<div
			id="generated-response"
			class="text-sm text-foreground bg-foreground/5 w-full border-none rounded-sm h-full p-4 prose"
		>
			{#if running}
				<p>
					This chat box is powered by a WebGPU assisted LLM running entirely in your browser! Please be
					patient as it may take a few moments to download models process your questions depending on your
					device's hardware and internet connection speed. <span class="text-destructive"
						>Close the tab if your system becomes unresponsive as running the LLM is very resource
						intensive!</span
					>
				</p>
			{:else if enabled}
				<p>Please ask a question above!</p>
				<p class="text-accent">
					NOTE: If this is your first question, you may have to download up to 1GB of data that will be cached
					for subsequent questions!
				</p>
				<p>
					Computing LLM responses is <span class="text-destructive">very resource intensive</span> so close
					the tab if your system becomes unresponsive! You must have a dedicated GPU and may have to enable a
					<a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API">WebGPU feature flag</a> in your
					browser to use this feature!
				</p>
			{:else}
				<p>Your device or browser is unsupported!</p>
				<p class="text-accent">
					You must have a dedicated GPU and may have to enable a <a
						href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API">WebGPU feature flag</a
					> in your browser to use this feature for Firefox or Safari!
				</p>
			{/if}
		</div>
		<span
			class="text-xs capitalize bg-background rounded-sm absolute left-4 -top-3 px-2 py-1 border border-foreground"
			>Answer</span
		>
	</div>
</div>
