import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import Footer from "@/components/core/footer"
import Navbar from "@/components/core/navbar"
import {
	getAllResources,
	getResourceBySlug,
	type ResourceArticle,
} from "@/lib/resources-data"
import { buildMetadata } from "@/lib/site-metadata"

const summarizeContent = (input?: string, limit = 150) => {
	if (!input) return ""
	const normalized = input.replace(/\s+/g, " ").trim()
	if (normalized.length <= limit) return normalized
	return `${normalized.slice(0, Math.max(0, limit - 3))}...`
}

const formatImageSrc = (image?: string) => {
	if (!image) return undefined
	if (/^(https?:)?\/\//.test(image) || image.startsWith("data:")) {
		return image
	}
	return image.startsWith("/") ? image : `/${image}`
}

export async function generateStaticParams() {
	const resources = await getAllResources()
	return resources.map((resource) => ({ slug: resource.slug }))
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> {
	const resource = await getResourceBySlug(params.slug)

	if (!resource) {
		return buildMetadata({
			title: "Resource",
			description:
				"Explore insights, playbooks, and guides from the Digital Neighbour team.",
			path: `/resources/${params.slug}`,
			type: "article",
		})
	}

	const description =
		resource.excerpt ||
		summarizeContent(resource.content) ||
		`Learn from Digital Neighbour's perspective on ${resource.title}.`

	return buildMetadata({
		title: resource.title,
		description,
		path: `/resources/${params.slug}`,
		type: "article",
	})
}

export default async function ResourceSlugPage({
	params,
}: {
	params: { slug: string }
}) {
	const [currentResource, resources] = await Promise.all([
		getResourceBySlug(params.slug),
		getAllResources(),
	])

	if (!currentResource) {
		notFound()
	}

	const otherResources = resources
		.filter((resource) => resource.slug !== params.slug)
		.slice(0, 3)

	const heroImage = formatImageSrc(currentResource.image)

	return (
		<main>
			<div className="relative bg-black">
				<Navbar />
			</div>

			<section className="relative mt-16 h-[60vh] w-full md:mt-20 md:h-[70vh]">
				{heroImage && (
					<Image
						src={heroImage}
						alt={currentResource.title}
						fill
						className="object-cover"
						priority
					/>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
					<div className="container mx-auto max-w-7xl">
						<div className="mb-4 flex items-center gap-3 text-sm text-white/80">
							<span className="rounded-full border border-white/20 bg-primary/20 px-3 py-1 font-medium text-white backdrop-blur-sm">
								{
									currentResource.category
								}
							</span>
							<span>
								{new Date(
									currentResource.date
								).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
							</span>
						</div>
						<h1 className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
							{currentResource.title}
						</h1>
					</div>
				</div>
			</section>

			<section className="bg-white px-6 py-12 md:py-20">
				<div className="container mx-auto max-w-4xl">
					{currentResource.content && (
						<div className="prose prose-lg max-w-none">
							<p className="whitespace-pre-line text-lg leading-relaxed text-blackbrown/90 md:text-xl">
								{
									currentResource.content
								}
							</p>
						</div>
					)}
				</div>
			</section>

			<section className="bg-pink/20 px-6 py-12 md:py-20">
				<div className="container mx-auto max-w-7xl">
					<h2 className="mb-8 text-center text-3xl font-bold text-blackbrown md:mb-12 md:text-4xl">
						More Insights
					</h2>
					<div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{otherResources.map(
							(resource) => (
								<ResourceCard
									key={
										resource.slug
									}
									resource={
										resource
									}
								/>
							)
						)}
					</div>
					<div className="text-center">
						<Link
							href="/resources"
							className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						>
							View More Resources
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="ml-2 h-4 w-4"
							>
								<path
									d="M13.5 4.5l6 6-6 6m5.25-6H4.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	)
}

function ResourceCard({ resource }: { resource: ResourceArticle }) {
	const imageSrc = formatImageSrc(resource.image)

	return (
		<Link
			href={`/resources/${resource.slug}`}
			className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition hover:shadow-md"
		>
			<div className="aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-muted">
				{imageSrc ? (
					<Image
						src={imageSrc}
						alt={resource.title}
						width={640}
						height={400}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				) : null}
			</div>
			<div className="p-5">
				<div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
					<span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
						{resource.category}
					</span>
					<span>
						{new Date(
							resource.date
						).toLocaleDateString()}
					</span>
				</div>
				<h3 className="mb-2 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
					{resource.title}
				</h3>
				<p className="line-clamp-2 text-sm text-muted-foreground">
					{resource.excerpt}
				</p>
				<div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
					Read more
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
					>
						<path
							d="M13.5 4.5l6 6-6 6m5.25-6H4.5"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
		</Link>
	)
}
