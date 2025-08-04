<script lang="ts">
	import { mobileMenuState } from '$lib/variables/state.svelte'
	import { IconX } from '@tabler/icons-svelte'
	import Navigation from './Navigation.svelte'
</script>

<dialog
	hidden={!mobileMenuState.useMobileMenu || !mobileMenuState.isMobileMenuOpen}
	class="fixed left-0 top-0 bottom-0 right-0 h-auto w-full bg-background/95 flex flex-col text-foreground"
	open={mobileMenuState.isMobileMenuOpen}
>
	<div class="flex items-center justify-end m-6">
		<button
			type="button"
			class="p-2 rounded-full bg-foreground/10 hover:cursor-pointer"
			aria-label="close mobile navigation"
			onclick={() => {
				mobileMenuState.isMobileMenuOpen = false
			}}
		>
			<IconX class="size-6" />
		</button>
	</div>

	<Navigation />
</dialog>
