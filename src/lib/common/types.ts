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
