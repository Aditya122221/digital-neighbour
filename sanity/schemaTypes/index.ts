import { type SchemaTypeDefinition } from "sanity"

import { sectionTypes } from "./objects/sections"
import { seoServiceType } from "./seo"
import { paidAdvertisingServiceType } from "./paidAdvertising"
import { socialMarketingServiceType } from "./socialMarketing"
import { contentMarketingServiceType } from "./contentMarketing"
import { webDevelopmentServiceType } from "./webDevelopment"
import { appDevelopmentServiceType } from "./appDevelopment"
import { hostingServiceType } from "./hosting"
import { aiAutomationServiceType } from "./aiAutomation"
import { dataAnalyticsServiceType } from "./dataAnalytics"
import { industriesServiceType } from "./industries"
import { professionalMarketingServiceType } from "./professionalMarketing"
import { marketingAgencyPageType } from "./marketingAgency"
import { resourcesPageType } from "./resource"
import { portfolioPageType } from "./portfolio"
import { aboutPageType } from "./about"
import { homePageType } from "./home"
import { apartPageType } from "./apart"
import { casePageType } from "./case"

export const schemaTypes: SchemaTypeDefinition[] = [
	homePageType,
	apartPageType,
	casePageType,
	marketingAgencyPageType,
	seoServiceType,
	paidAdvertisingServiceType,
	socialMarketingServiceType,
	contentMarketingServiceType,
	webDevelopmentServiceType,
	appDevelopmentServiceType,
	hostingServiceType,
	aiAutomationServiceType,
	dataAnalyticsServiceType,
	industriesServiceType,
	professionalMarketingServiceType,
	resourcesPageType,
	aboutPageType,
	portfolioPageType,
	...sectionTypes,
]
