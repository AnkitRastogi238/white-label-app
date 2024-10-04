// external dependencies
import type { RegisteredComponent } from '@builder.io/sdk-svelte';
import { ComingSoon, ComingSoonInfo } from '$lib/common/components/coming-soon';
import { Tabs, TabsInfo } from '$lib/common/components/tabs';
import { HeroBanner, HeroBannerInfo } from '$lib/common/components/hero-banner';
import { Accordion, AccordionInfo } from '$lib/common/components/accordion';
import { SliderVariation, SliderVariationInfo } from '$lib/common/components/slider-variations';

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
    }
  ];
}

