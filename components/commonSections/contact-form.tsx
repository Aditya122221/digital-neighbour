"use client"

import { useState } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

interface FormField {
	id: string
	name: string
	type: string
	label: string
	placeholder: string
	required: boolean
	validation?: {
		minLength?: number
		maxLength?: number
		pattern?: string
		required?: boolean
		errorMessage?: string
	}
	gridCols?: string
	options?: Array<{ value: string; label: string }>
	rows?: number
}

interface FormData {
	fields: FormField[]
	submitButton?: {
		text?: string
		type?: string
	}
	disclaimer?: {
		text?: string
		termsLink?: string
		privacyLink?: string
	}
}

interface ContactFormProps {
	formData: FormData
}

export default function ContactForm({ formData }: ContactFormProps) {
	const [formValues, setFormValues] = useState<Record<string, string>>({})
	const [errors, setErrors] = useState<Record<string, string>>({})

	const validateField = (field: FormField, value: string | undefined): string | null => {
		// Handle required validation
		if (field.required) {
			if (!value || (typeof value === "string" && !value.trim())) {
				return `${field.label} is required`
			}
		}

		// If no value and not required, skip further validation
		if (!value || (typeof value === "string" && !value.trim())) {
			return null
		}

		// If no validation rules, return null
		if (!field.validation) {
			return null
		}

		const { minLength, maxLength, pattern, errorMessage } = field.validation

		// For select fields, we only check required (already done above)
		if (field.type === "select") {
			return null
		}

		// For text fields, apply validation rules
		if (minLength && value.length < minLength) {
			return errorMessage || `Minimum ${minLength} characters required`
		}

		if (maxLength && value.length > maxLength) {
			return errorMessage || `Maximum ${maxLength} characters allowed`
		}

		if (pattern) {
			const regex = new RegExp(pattern)
			if (!regex.test(value)) {
				return errorMessage || "Invalid format"
			}
		}

		return null
	}

	const handleChange = (
		fieldId: string,
		value: string,
		field: FormField,
	) => {
		setFormValues((prev) => ({ ...prev, [fieldId]: value }))

		// Clear error when user starts typing
		if (errors[fieldId]) {
			setErrors((prev) => {
				const newErrors = { ...prev }
				delete newErrors[fieldId]
				return newErrors
			})
		}
	}

	const handleBlur = (field: FormField) => {
		const value = formValues[field.id]
		const error = validateField(field, value)
		if (error) {
			setErrors((prev) => ({ ...prev, [field.id]: error }))
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const newErrors: Record<string, string> = {}
		let isValid = true

		formData.fields.forEach((field) => {
			const value = formValues[field.id]
			const error = validateField(field, value)
			if (error) {
				newErrors[field.id] = error
				isValid = false
			}
		})

		setErrors(newErrors)

		if (isValid) {
			// Handle form submission here
			console.log("Form submitted:", formValues)
			// You can add API call here
		}
	}

	const renderField = (field: FormField) => {
		const hasError = !!errors[field.id]
		const baseInputClasses =
			"mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none"

		if (field.type === "select") {
			// Filter out empty string values as Radix UI Select doesn't allow them
			const validOptions = field.options?.filter((option) => option.value !== "") || []
			
			return (
				<div key={field.id} className={field.gridCols ? "" : "w-full"}>
					<Select
						value={formValues[field.id] || undefined}
						onValueChange={(value) => {
							handleChange(field.id, value, field)
						}}
					>
						<SelectTrigger
							className={`${baseInputClasses} ${hasError ? "border-red-500" : "border-gray-300"}`}
						>
							<SelectValue placeholder={field.placeholder} />
						</SelectTrigger>
						<SelectContent>
							{validOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{hasError && (
						<p className="mt-1 text-xs text-red-400">{errors[field.id]}</p>
					)}
				</div>
			)
		}

		if (field.type === "textarea") {
			return (
				<div key={field.id} className="w-full">
					<textarea
						id={field.id}
						name={field.name}
						rows={field.rows || 6}
						placeholder={field.placeholder}
						value={formValues[field.id] || ""}
						onChange={(e) => handleChange(field.id, e.target.value, field)}
						onBlur={() => handleBlur(field)}
						required={field.required}
						className={`${baseInputClasses} resize-none ${hasError ? "border-red-500" : "border-gray-300"}`}
					/>
					{hasError && (
						<p className="mt-1 text-xs text-red-400">{errors[field.id]}</p>
					)}
				</div>
			)
		}

		return (
			<div key={field.id} className={field.gridCols ? "" : "w-full"}>
				<input
					type={field.type}
					id={field.id}
					name={field.name}
					placeholder={field.placeholder}
					value={formValues[field.id] || ""}
					onChange={(e) => handleChange(field.id, e.target.value, field)}
					onBlur={() => handleBlur(field)}
					required={field.required}
					className={`${baseInputClasses} ${hasError ? "border-red-500" : "border-gray-300"}`}
				/>
				{hasError && (
					<p className="mt-1 text-xs text-red-400">{errors[field.id]}</p>
				)}
			</div>
		)
	}

	// Group fields that should be in a grid
	const groupedFields: FormField[][] = []
	let currentGroup: FormField[] = []
	let currentGridCols: string | undefined

	formData.fields.forEach((field) => {
		if (field.gridCols) {
			if (currentGridCols && currentGridCols !== field.gridCols) {
				groupedFields.push([...currentGroup])
				currentGroup = []
			}
			currentGroup.push(field)
			currentGridCols = field.gridCols
		} else {
			if (currentGroup.length > 0) {
				groupedFields.push([...currentGroup])
				currentGroup = []
				currentGridCols = undefined
			}
			groupedFields.push([field])
		}
	})

	if (currentGroup.length > 0) {
		groupedFields.push(currentGroup)
	}

	return (
		<div className="rounded-xl bg-white p-8 shadow-lg">
			<form onSubmit={handleSubmit} className="space-y-6">
				{groupedFields.map((group, groupIndex) => {
					const firstField = group[0]
					if (group.length > 1 && firstField.gridCols) {
						return (
							<div
								key={`group-${groupIndex}`}
								className={`grid grid-cols-1 gap-4 ${firstField.gridCols}`}
							>
								{group.map((field) => renderField(field))}
							</div>
						)
					}
					return (
						<div key={`group-${groupIndex}`}>
							{group.map((field) => renderField(field))}
						</div>
					)
				})}

				{/* Disclaimer */}
				{formData.disclaimer?.text && (
					<p className="text-xs leading-relaxed text-gray-500">
						{formData.disclaimer.text}
					</p>
				)}

				{/* Submit Button */}
				<div className="flex justify-end pt-2">
					<button
						type="submit"
						className="rounded-lg bg-[#5D50EB] px-8 py-3 font-semibold text-white transition-all hover:bg-[#564fa5]"
					>
						{formData.submitButton?.text || "Submit"}
					</button>
				</div>
			</form>
		</div>
	)
}

