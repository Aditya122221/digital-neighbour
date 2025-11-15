import portfolioData from "@/data/portfolio.json"

export type PortfolioMetric = {
	value: string
	label: string
}

export type PortfolioProject = {
	id: number
	slug: string
	logoText: string
	headline: string
	metrics: PortfolioMetric[]
	tags: string[]
	image: string
	imageAlt?: string
	content?: string
}

export type PortfolioHeroContent = {
	label: string
	title: string
	description: string
}

type PortfolioJson = {
	hero?: Partial<PortfolioHeroContent>
	projects?: PortfolioProject[]
}

const DEFAULT_HERO: PortfolioHeroContent = {
	label: "Portfolio",
	title: "Success stories from brands we've helped grow",
	description:
		"Discover how our strategic approach drives measurable results for businesses across industries.",
}

const parsedData = portfolioData as PortfolioJson
const projectsArray = Array.isArray(parsedData.projects)
	? parsedData.projects
	: []
const projectMap = new Map(projectsArray.map((project) => [project.slug, project]))

export function getPortfolioHero(): PortfolioHeroContent {
	const hero = parsedData.hero ?? {}

	return {
		label: hero.label ?? DEFAULT_HERO.label,
		title: hero.title ?? DEFAULT_HERO.title,
		description: hero.description ?? DEFAULT_HERO.description,
	}
}

export function getPortfolioProjects(): PortfolioProject[] {
	return projectsArray
}

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
	if (!slug) return undefined
	return projectMap.get(slug)
}

