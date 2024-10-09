<script lang="ts">
	// external dependencies
	import { Content, isPreviewing } from '@builder.io/sdk-svelte';

	import '../styles/app.scss';
	import { page } from '$app/stores';
	import * as ComponentFactory from '$lib/common/utils/component-factory';
	import * as constant from '$lib/config/constant';
	import FloatingButton from '$src/lib/common/components/button/FloatingButton.svelte';
	import { ComingSoon } from '$src/lib/common/components/coming-soon';
	import Header from '$src/lib/common/components/header/Header.svelte';

	// this data comes from the function in `+layout.server.js`, which runs on the server only
	export let data: any;
	$: isNews = $page?.url?.pathname.includes('/news');
	$: canShowContent = data?.content || isPreviewing();
	const canShowFooterContent = data?.footerContent || isPreviewing();
</script>

<Header navData={data?.navBar?.data} />
<slot />

<FloatingButton />
<div role="presentation">
	{#if !isNews}
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
			<ComingSoon />
		{/if}
	{/if}
</div>
{#if canShowFooterContent}
	<footer>
		<Content
			model="common-footer"
			content={data.footerContent}
			apiKey={constant.API_KEY}
			customComponents={ComponentFactory.create('main')}
		/>
		<!-- OneTrust Cookies Settings link start -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a title="Cookies" class="ot-sdk-show-settings hidden">Change your cookie settings</a>
		<!-- OneTrust Cookies Settings link end -->
	</footer>
{/if}
