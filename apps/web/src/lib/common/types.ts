import type { Blocks } from '@builder.io/sdk-svelte';

export interface ILink {
    text?: string;
    href: string;
    target?: string;
}

/**
 * Represent the interface for the ImageData
 * src- the src of ImageData
 * alt-  the alt of ImageData
 */
export interface ImageData {
    src: string;
    altText: string;
}

export interface IGenericImage {
    src: string | undefined;
    alt: string | undefined;
    class?: string;
    height?: string;
    width?: string;
    loading?: 'lazy' | 'eager';
    'data-testid'?: string;
    'data-icon'?: string | undefined;
}


/**
 * children - builder Blocks for drag and drop component
 * tabName - name of the tab and type string
 * tabApiName - Api name of the tab
 */
export interface Tab {
    children: Blocks;
    name: string;
    apiName: string;
}

export interface ICustomNavigation {
    navWrapperClassList?: string;
    commonIconClassList?: string;
    prevIconClassList?: string;
    nextIconClassList?: string;
    prevTestId?: string;
    nextTestId?: string;
    isDefaultNav?: boolean;
    iconStyles?: string;
}

export interface ICustomPagination {
    wrapperClassList?: string;
    paginationClassList?: string;
    isDefaultPagination?: boolean;
}

export interface ISwiperStyle {
    wrapperClassList?: string;
    containerClassList?: string;
}

export interface Image {
    src: string;
    altText: string;
}

export interface GridCardList {
    image: Image;
    name: string;
    designation: string;
    content: string;
    active: boolean;
}

export interface AccordionData {
    title: string;
    subTitle: string;
    theme: string;
    isTitleRequired: boolean;
    cardList: GridCardList[];
}

/**
 * Represents the data for Accordion Item.
 * icon - Icon for the Accordion Item
 * subHeading - SubH eading for the Accordion Item
 * description - Description for the Accordion Item
 * expandedAccordion - Track the index of the currently expanded accordion.
 */
export interface accordionItem {
    icon: string;
    subTitle: string;
    description: string;
    index?: number;
    expandedAccordion?: any;
}

export interface ILink {
    text?: string;
    href: string;
    target?: string;
}

/**
 * Represents the list of ICard.
 *
 */
export interface CardList {
    cardList: Array<ICard>;
}

/**
 * Represent the interface for the cardsData
 * cardTitle-string
 * cardDescription-string
 * cardImage-string
 * cardImageAltText-string
 * cardCTALink-string
 * cardCTAText-string
 */
export interface ICard {
    title: string;
    description?: string;
    icon?: string;
    count?: number;
    image: Image;
    isLastCard?: boolean;
    link?: ILink;
}


/**
 * type - The type of the block (e.g., 'text', 'image', 'video').
 * content - The content of the block. (e.g, 'text', 'image' or any custom component)
 */
export interface BuilderBlock {
    type: string;
    content: string;
}

/**
 * id- number
 */
export interface Id {
    id: number;
}

/**
 * Represents a single tab in the timeline.
 *
 * title - The title of the timeline tab.
 * svgIcon - The SVG code representing the icon for the tab.
 * subTitle - The year or year range for the timeline tab.
 * image - The URL or path to the image for the timeline tab.
 * altText - The alt Text for the image.
 * id - unique id for each section.
 * textImageAlignment - The alignment of the text and image in the timeline tab.
 * description - The description text for the timeline tab.
 * subList - An array of sub-list items for the timeline tab.
 */
export interface TabularAnchor {
    title: string;
    svgIcon: string; // Assuming svgIcon is a string representing the SVG code
    subTitle: string;
    image: string;
    altText: string;
    id: string;
    textImageAlignment: 'imageOnRight-textOnLeft' | 'imageOnLeft-textOnRight';
    description: string;
    subList: SubList[];
}

/**
 * Represents a sub-list item within a timeline tab.
 *
 * title - The title text for the sub-list item.
 * description - The description text for the sub-list item.
 */
export interface SubList {
    title: string;
    description: string;
}


/**
 * Represents a single document in the document list.
 * docRef - The reference to the document.
 */
export interface DocList {
    docRef: DocRef;
    name?: string;
    s3_id?: string;
    version?: string;
    isPublic?: boolean
}

/**
 * Represents the reference to a document.
 * id - The unique identifier of the document.
 * value - The value object containing the document data.
 */
export interface DocRef {
    id: string;
    value: Value;
}

/**
 * Represents the value object containing the document data.
 * data - The data object containing the document details.
 * modelId - The unique identifier of the model.
 * name - The name of the document.
 * id - The unique identifier of the document.
 */
export interface Value {
    data: DocData;
    modelId: string;
    name: string;
    id: string;
}

/**
 * Represents the data object containing the document details.
 * docType - The type of the document.
 * docTitle - The title of the document.
 * docLink - The link to the document.
 */
export interface DocData {
    docType: string;
    docTitle: string;
    docLink: string;
}

/**
 * Represents a document type and its associated document list.
 * docType - The type of the document.
 * documents - The list of documents for the specified document type.
 */
export interface DocType {
    docType: string;
    documents: DocList[];
}
