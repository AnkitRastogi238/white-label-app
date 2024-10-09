// external dependencies
import type { RegisteredComponent } from '@builder.io/sdk-svelte';

import { CopyrightBanner, CopyrightBannerInfo, SiteNavigation, SiteNavigationInfo } from '../components/footer';
import { Innovation, InnovationInfo } from '../components/innovation';
import { Accordion, AccordionInfo } from '$lib/common/components/accordion';
import { ComingSoon, ComingSoonInfo } from '$lib/common/components/coming-soon';
import { HeroBanner, HeroBannerInfo } from '$lib/common/components/hero-banner';
import { TabularAnchor, TabularAnchorInfo } from '$lib/common/components/history-timeline';
import { SliderVariation, SliderVariationInfo } from '$lib/common/components/slider-variations';
import { Tabs, TabsInfo } from '$lib/common/components/tabs';
import { GenericForm, GenericFormInfo } from '../components/generic-form';


/**
 * Create a list of components based on the page model
 * @param page Given page model
 * @returns List of components
 */
export function create(page: string): RegisteredComponent[] {
  switch (page) {
    case 'main':
      return createMainPageComponents();
    default:
      return createMainPageComponents();
  }
}

/**
 * Prepare the list for main page components
 * @returns builder custom components configuration
 */
function createMainPageComponents(): RegisteredComponent[] {
  return [
    {
      component: ComingSoon,
      ...ComingSoonInfo
    },
    {
      component: Tabs,
      ...TabsInfo
    },
    {
      component: HeroBanner,
      ...HeroBannerInfo
    },
    {
      component: Accordion,
      ...AccordionInfo
    },
    {
      component: SliderVariation,
      ...SliderVariationInfo
    },
    {
      component: Innovation,
      ...InnovationInfo
    },
    {
      component: TabularAnchor,
      ...TabularAnchorInfo
    },
    {
      component: SiteNavigation,
      ...SiteNavigationInfo
    },
    {
      component: CopyrightBanner,
      ...CopyrightBannerInfo
    },
    {
      component: GenericForm,
      ...GenericFormInfo
    }
  ];
}

