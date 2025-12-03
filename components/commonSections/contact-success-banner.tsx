"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function ContactSuccessBanner() {
	const searchParams = useSearchParams()
	const [showSuccess, setShowSuccess] = useState(false)

	useEffect(() => {
		const success = searchParams.get("success")
		if (success === "true") {
			setShowSuccess(true)
			// Clear the success parameter from URL after showing
			const timer = setTimeout(() => {
				window.history.replaceState({}, "", "/contact")
				setShowSuccess(false)
			}, 5000) // Hide after 5 seconds

			return () => clearTimeout(timer)
		}
	}, [searchParams])

	if (!showSuccess) return null

	return (
		<div className="mx-auto w-full max-w-7xl px-4 pt-8">
			<div className="rounded-lg bg-green-50 border border-green-200 p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<svg
							className="h-5 w-5 text-green-600 mr-3"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<p className="text-sm font-medium text-green-800">
							Thank you! Your message has been sent successfully. We'll get
							back to you soon.
						</p>
					</div>
					<button
						onClick={() => {
							window.history.replaceState({}, "", "/contact")
							setShowSuccess(false)
						}}
						className="text-green-600 hover:text-green-800"
					>
						<svg
							className="h-5 w-5"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

