<script lang="ts">
	// external dependencies
	import { Content, isPreviewing } from '@builder.io/sdk-svelte';

	import '../styles/app.scss';
	import * as ComponentFactory from '$lib/common/utils/component-factory';
	import * as constant from '$lib/config/constant';

	// this data comes from the function in `+layout.server.js`, which runs on the server only
	export let data: any;
	$: canShowContent = data?.content || isPreviewing();
</script>

<slot />

<div role="presentation">
	{#if canShowContent}
		<!-- Add your API key below -->
		<Content
			model="page"
			content={data.content}
			apiKey={constant.API_KEY}
			customComponents={ComponentFactory.create('main')}
			enrich={true}
		/>
	{:else}
		Content Not Found
	{/if}
</div>
