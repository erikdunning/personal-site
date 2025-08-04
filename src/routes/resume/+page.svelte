<script lang="ts">
	import Introduction from '$lib/content/resume/Introduction.svx'
	import EmploymentHistory from '$lib/content/resume/EmploymentHistory.svx'
	import Education from '$lib/content/resume/Education.svx'
	import Skills from '$lib/content/resume/Skills.svx'
	import References from '$lib/content/resume/References.svx'
	import AdditionalNotes from '$lib/content/resume/AdditionalNotes.svx'
	import HeadMetas from '$lib/components/HeadMetas.svelte'
</script>

<HeadMetas
	title="Résumé"
	description="View Erik Dunning's resume to learn about his skills, experience, and education in web development."
/>

<article class="max-w-5xl w-full mx-auto px-6 prose">
	<Introduction />
	<EmploymentHistory />
	<Education />
	<Skills />
	<References />
	<AdditionalNotes />
</article>
