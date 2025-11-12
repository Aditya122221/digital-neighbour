import { type SchemaTypeDefinition } from "sanity"

import { sectionTypes } from "./objects/sections"
import { seoServiceType } from "./seo"

export const schemaTypes: SchemaTypeDefinition[] = [
	seoServiceType,
	...sectionTypes,
]
