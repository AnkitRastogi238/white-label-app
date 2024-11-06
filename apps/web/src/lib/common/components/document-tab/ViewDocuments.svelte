<!-- <script lang="ts">
	// external dependencies

	import { logger } from '@white-label/ui/services';
	import { handleDocumentDownload } from '$src/lib/services/document-services';
	import { getHeaders } from '$src/lib/services/headers.service';
	
	// internal dependencies
	import Tab from './DocumentTab.svelte';
	import { page } from '$app/stores';
	import { DocIcon } from '$lib/assets/icons';
	import { LoadMoreButton } from '$lib/common/components/button';
	import DownloadFile from '$lib/common/components/download-file/DownloadFile.svelte';
	import ValidationPopup from '$lib/common/components/validation-popup/ValidationPopup.svelte';
	import type { IDocumentDownload } from '$lib/common/types';
	import type { DocType } from '$lib/product/types';
	import { userInfoStore } from '$src/lib/common/store';
	import { API_BASE_URL, CLOUD_FRONT_BASE_URL, PRODUCT_ASSET_ENDPOINT } from '$src/lib/config/api';
	import { DOCUMENTS_LIST_TYPE, PRIVATE_DOCUMENTS_LIST_TYPE } from '$src/lib/config/constant';

	export let secondaryCategory;
	export let model;

	// whether to show private documents or not
	$: showPrivateDocuments = false;
	//to show modal or not
	let showModal = false;

	/**
	 * The title of the component.
	 */
	export let title: string;

	/**
	 * Padding prop taken as a boolean value
	 */
	export let isPaddingRequired: boolean;
	/**
	 * The text to be displayed on the call-to-action (CTA) button.
	 */
	export let ctaText: string;

	/**
	 * The unique Id.
	 */
	export let referenceAnchorId: string | null;

	/**
	 * The index of the currently active tab.
	 *
	 * Defaults to 0.
	 */
	let activeTab: number = 0;

	/**
	 * The number of documents to be displayed.
	 *
	 * Defaults to 12.
	 */
	let displayedDocuments: number = 12;

	/**
	 * An array of document objects.
	 */
	let docArray: DocType[] = [];

	/**
	 * Reference to the DownloadFile component.
	 * This allows us to call the handleDocumentDownload method.
	 */

	let downloadDocument: IDocumentDownload;

	$: role = 0;

	$: userInfoStore.subscribe((value) => {
		role = parseInt(value?.role?.split(' ').pop() || '0', 10);
	});

	const fetchDocuments = async () => {
		let url = `${API_BASE_URL}${PRODUCT_ASSET_ENDPOINT(role)}`;
		let queryParams = '';
		const catalogueId = $page?.url?.pathname?.includes('/cn/')
			? $page?.url?.pathname?.split('/')[2]
			: '';

		switch (true) {
			case !!(secondaryCategory && model):
				queryParams = `secondaryCategory=${secondaryCategory?.value?.data?.salesforceApiName || secondaryCategory?.value?.data?.title}&models=${model?.value?.data?.salesforceApiName || model?.value?.data?.title}`;
				break;
			case !!secondaryCategory:
				queryParams = `secondaryCategory=${secondaryCategory?.value?.data?.salesforceApiName || secondaryCategory?.value?.data?.title}`;
				break;
			case !!model:
				queryParams = `models=${model?.value?.data?.salesforceApiName || model?.value?.data?.title}`;
				break;
			case !!catalogueId:
				queryParams = `catalogueId=${catalogueId}`;
				break;
			default:
				break;
		}

		if (queryParams) {
			try {
				const fetchOptions = {
					method: 'GET',
					...(role > 0 ? { headers: getHeaders() } : {}) // Add headers only if role > 0
				};

				let response = await fetch(url + queryParams, fetchOptions);

				const jsonResponse = await response.json();
				const docHardcodedArray = Object.values(DOCUMENTS_LIST_TYPE).map((key: string) => ({
					docType: key,
					documents: []
				}));

				docArray = [...docHardcodedArray];

				jsonResponse?.result?.data?.forEach((ele: any) => {
					const findIndex = docArray.findIndex(
						(e) => e?.docType?.toLowerCase() === ele.type?.toLowerCase()
					);

					const documentsWithIsPublic = ele.documents.map((doc: any) => ({
						...doc, // Spread existing document properties
						isPublic: ele.isPublic // Include isPublic from the current element
					}));

					if (findIndex !== -1) {
						docArray[findIndex]['documents'] = [
							...docArray[findIndex]['documents'],
							...documentsWithIsPublic
						];
					} else {
						docArray.push({ docType: ele.type, documents: documentsWithIsPublic });
					}
				});
			} catch (error) {
				logger.error(error);
			}
		}
	};
	/**
	 * Transforms the document data into a grouped object, where the keys are the document types
	 * and the values are arrays of documents of that type.
	 *
	 *
	 * The block first uses the `reduce` method to iterate over the `documents.data.docList` array
	 * and group the documents by their `docType` field. The resulting `GroupedDocuments` object
	 * is stored in the `result` variable.
	 *
	 * If the `result` variable is truthy, the block then maps over the entries of the `result` object,
	 * creating an array of `GroupedDocument` objects, where each object has a `docType` field and a
	 * `documents` field containing the array of documents of that type. This array is then assigned
	 * to the `docArray` variable.
	 *
	 */

	$: if (showPrivateDocuments && role) {
		fetchDocuments();
	} else if (!showPrivateDocuments && !role) {
		fetchDocuments();
	}

	/**
	 * Increases the number of documents to be displayed.
	 *
	 * This function increments the `displayedDocuments` variable by 12,
	 * effectively increasing the number of documents to be displayed.
	 *
	 */
	const handleLoadMoreDocuments = () => {
		displayedDocuments += 12;
	};

	//handle after successful signin ,changing showPrivateDocuments false to true
	const handleShowPrivateDocuments = () => {
		showPrivateDocuments = true;
	};

	$: if (activeTab == 2 || activeTab == 3) {
		showModal = true;
	} else {
		showModal = false;
	}

	//handle case when  user logged in , it display private documents
	$: getDocumentsBasedOnAuthenication = () => {
		if (PRIVATE_DOCUMENTS_LIST_TYPE.includes(docArray[activeTab]['docType']?.toLowerCase())) {
			if (showPrivateDocuments) return docArray[activeTab]?.documents;
			else return [];
		} else return docArray[activeTab]?.documents;
	};

	let anchorRef: HTMLAnchorElement;
</script>

{#if docArray?.length > 0}
	<div class="documents" id={referenceAnchorId}>
		<div
			class="pb-12 pl-6 md:px-12 lg:px-14 lg:pb-lk60 {isPaddingRequired
				? 'pt-12 lg:pt-lk60'
				: 'pt-0 lg:pt-0'}"
		>
			<p
				class="text-lkea-blue-300 font-roboto text-4xl font-light leading-lk142P mb-6 md:mb-12"
				data-testId="title"
			>
				{title}
			</p>

			<div class="md:flex md:gap-8 lg:gap-lk30">
				<div class="document-tab relative">
					<div
						class="border-b-2 w-full absolute bottom-lk1 -z-10 border-lkea-gray-350 md:hidden"
					></div>
					<div
						class="flex scroll-smooth overflow-auto [scrollbar-width:none] md:block md:overflow-hidden"
					>
						<Tab bind:activeTab {docArray} bind:showPrivateDocuments />
					</div>
				</div>
				{#if docArray[activeTab] != undefined}
					<a
						href={undefined}
						download="download"
						rel="noopener noreferrer"
						bind:this={anchorRef}
						class="hidden">Download</a
					>
					<div class="pt-6 md:pt-0 pr-6 md:pr-0 md:w-full">
						<div class="lg:gap-x-lk30 grid grid-col-1 flex-auto lg:grid-cols-2">
							{#each getDocumentsBasedOnAuthenication()?.slice(0, displayedDocuments) as activeDoc, index}
								{#key activeTab}
									<DownloadFile
										href={`${CLOUD_FRONT_BASE_URL}${activeDoc?.s3_id}`}
										downloadName={activeDoc?.name || ''}
										bind:this={downloadDocument}
									/>
									<button
										on:click={() => {
											activeDoc?.isPublic
												? downloadDocument?.handleDocumentDownload(
														`${CLOUD_FRONT_BASE_URL}${activeDoc?.s3_id}`,
														activeDoc?.name || ''
													)
												: handleDocumentDownload({ ...activeDoc }, anchorRef);
										}}
										class="py-3.5 rounded-lk10 border-lkea-gray-300 border shadow-lk3 w-full lg:mb-5
                      {index !==
										docArray[activeTab]?.documents?.slice(0, displayedDocuments)?.length - 1
											? ' mb-3'
											: ''}"
									>
										<div class="flex items-center px-6 gap-4 w-full">
											<img src={DocIcon} alt="google-docs" class="w-6 h-6" />
											<span
												class="font-light font-poppins [word-break:break-word] text-base text-left leading-8 text-lkea-blue-300"
											>
												{activeDoc?.name}
											</span>
										</div>
									</button>
								{/key}
							{/each}
						</div>
						{#if docArray[activeTab]?.documents.length > displayedDocuments}
							<div class="flex justify-center mt-9 lg:mt-4">
								<LoadMoreButton
									onClick={handleLoadMoreDocuments}
									{ctaText}
									classList={'text-lkea-blue-300 border border-lkea-blue-300 bg-white px-3 py-1 rounded-lk5 flex items-center gap-3'}
									imageClassList={'bg-lkea-blue-300 w-lk18 h-lk18 flex justify-center items-center rounded-full rotate-90'}
									color={'white'}
									svgClassList={'w-3 h-3'}
								/>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<ValidationPopup bind:isModalOpen={showModal} handleClick={handleShowPrivateDocuments} /> -->
