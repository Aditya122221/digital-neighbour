import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

// Helper function to format email content dynamically based on form data
const formatEmailContent = (
	formData: any,
	formType: string = "contact",
	sourcePage?: string
) => {
	const { firstName, lastName, email, phone, website, budget, hearAbout, message } = formData

	// Get company name from environment or use default
	const companyName = process.env.COMPANY_NAME || "Digital Neighbour"
	const companyEmail = process.env.CONTACT_EMAIL || "your-email@example.com"

	// Get user's name for personalization
	const userName = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || email.split("@")[0]
	const greeting = firstName || lastName ? `Hi ${firstName || userName.split(" ")[0]},` : "Hello,"

	// Determine form type and format subject accordingly
	let emailSubject: string
	let formSource = sourcePage || "Contact Form"

	if (formType === "simple" || website) {
		emailSubject = `🎯 New Lead: ${website || "Website Inquiry"} - ${userName}`
	} else {
		emailSubject = `📧 New Contact Form Submission from ${userName}`
	}

	// Format budget display if present
	const formatBudget = (budget: string) => {
		if (!budget) return ""
		const budgetMap: Record<string, string> = {
			"under-5k": "Under $5,000",
			"5k-10k": "$5,000 - $10,000",
			"10k-25k": "$10,000 - $25,000",
			"25k-50k": "$25,000 - $50,000",
			"50k-plus": "$50,000+",
		}
		return budgetMap[budget] || budget
	}

	// Format hearAbout display
	const formatHearAbout = (source: string) => {
		if (!source) return ""
		const sourceMap: Record<string, string> = {
			google: "Google Search",
			"social-media": "Social Media",
			referral: "Referral",
			other: "Other",
		}
		return sourceMap[source] || source
	}

	// Build HTML email content
	const fields: Array<{ label: string; value: string; icon?: string }> = []

	if (firstName || lastName) {
		const fullName = `${firstName || ""} ${lastName || ""}`.trim()
		if (fullName) fields.push({ label: "Full Name", value: fullName, icon: "👤" })
	}

	if (email) fields.push({ label: "Email Address", value: email, icon: "📧" })
	if (website) fields.push({ label: "Website", value: website, icon: "🌐" })
	if (phone) fields.push({ label: "Phone Number", value: phone, icon: "📱" })
	if (budget) fields.push({ label: "Monthly Marketing Budget", value: formatBudget(budget), icon: "💰" })
	if (hearAbout) fields.push({ label: "How did they hear about us?", value: formatHearAbout(hearAbout), icon: "🔍" })
	if (message) fields.push({ label: "Message", value: message, icon: "💬" })

	// Get current date and time
	const now = new Date()
	const timestamp = now.toLocaleString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	})

	const emailHtml = `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<style>
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}
					body {
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
						line-height: 1.6;
						color: #333;
						background-color: #f5f5f5;
						padding: 20px;
					}
					.email-container {
						max-width: 600px;
						margin: 0 auto;
						background-color: #ffffff;
						border-radius: 12px;
						overflow: hidden;
						box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					}
					.email-header {
						background: linear-gradient(135deg, #5D50EB 0%, #0e0e59 100%);
						color: white;
						padding: 30px 30px 25px;
						text-align: center;
					}
					.email-header h1 {
						font-size: 24px;
						font-weight: 600;
						margin-bottom: 8px;
						letter-spacing: -0.5px;
					}
					.email-header p {
						font-size: 14px;
						opacity: 0.9;
						margin: 0;
					}
					.email-body {
						padding: 30px;
					}
					.greeting {
						font-size: 18px;
						font-weight: 600;
						color: #0e0e59;
						margin-bottom: 20px;
						padding-bottom: 15px;
						border-bottom: 2px solid #f0f0f0;
					}
					.intro-text {
						font-size: 15px;
						color: #555;
						margin-bottom: 25px;
						line-height: 1.7;
					}
					.field-group {
						margin-bottom: 20px;
						background-color: #f9f9f9;
						border-radius: 8px;
						padding: 18px;
						border-left: 4px solid #5D50EB;
					}
					.field-label {
						font-size: 12px;
						font-weight: 600;
						color: #666;
						text-transform: uppercase;
						letter-spacing: 0.5px;
						margin-bottom: 8px;
						display: flex;
						align-items: center;
						gap: 6px;
					}
					.field-value {
						font-size: 16px;
						color: #1a1a1a;
						word-break: break-word;
					}
					.field-value a {
						color: #5D50EB;
						text-decoration: none;
						font-weight: 500;
					}
					.field-value a:hover {
						text-decoration: underline;
					}
					.message-box {
						background-color: #ffffff;
						border: 1px solid #e0e0e0;
						border-radius: 6px;
						padding: 15px;
						white-space: pre-wrap;
						min-height: 80px;
						font-size: 15px;
						line-height: 1.6;
						color: #333;
					}
					.footer-info {
						background-color: #f9f9f9;
						padding: 20px 30px;
						border-top: 1px solid #e0e0e0;
						font-size: 12px;
						color: #666;
						text-align: center;
					}
					.footer-info p {
						margin: 5px 0;
					}
					.cta-button {
						display: inline-block;
						background-color: #5D50EB;
						color: white;
						padding: 12px 24px;
						border-radius: 6px;
						text-decoration: none;
						font-weight: 600;
						margin-top: 10px;
						font-size: 14px;
					}
					.source-badge {
						display: inline-block;
						background-color: #0e0e59;
						color: white;
						padding: 6px 12px;
						border-radius: 20px;
						font-size: 11px;
						font-weight: 600;
						letter-spacing: 0.5px;
						margin-top: 10px;
					}
				</style>
			</head>
			<body>
				<div class="email-container">
					<div class="email-header">
						<h1>✨ New Form Submission</h1>
						<p>You have received a new inquiry from your website</p>
					</div>
					<div class="email-body">
						<div class="greeting">
							${greeting}
						</div>
						<p class="intro-text">
							You have received a new ${formType === "simple" ? "lead inquiry" : "contact form submission"} from your website. Here are the details:
						</p>
						${fields
							.map(
								(field) => `
							<div class="field-group">
								<div class="field-label">
									${field.icon ? `<span>${field.icon}</span>` : ""}
									<span>${field.label}</span>
								</div>
								<div class="${field.label === "Message" ? "message-box" : "field-value"}">
									${field.label === "Website" && field.value
									? `<a href="${field.value.startsWith("http") ? field.value : `https://${field.value}`}" target="_blank">${field.value}</a>`
									: field.label === "Email Address"
									? `<a href="mailto:${field.value}">${field.value}</a>`
									: field.label === "Phone Number"
									? `<a href="tel:${field.value}">${field.value}</a>`
									: field.value.replace(/\n/g, "<br>")}
								</div>
							</div>
						`
							)
							.join("")}
						${sourcePage ? `<div class="source-badge">📍 Source: ${sourcePage}</div>` : ""}
						<div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
							<p style="margin-bottom: 15px; font-weight: 600; color: #0e0e59;">Quick Actions:</p>
							<div style="display: flex; gap: 10px; flex-wrap: wrap;">
								<a href="mailto:${email}?subject=Re: Your Inquiry" class="cta-button">📧 Reply to ${userName}</a>
								${phone ? `<a href="tel:${phone}" class="cta-button" style="background-color: #0e0e59;">📞 Call Now</a>` : ""}
							</div>
						</div>
					</div>
					<div class="footer-info">
						<p><strong>${companyName}</strong></p>
						<p>Form submitted on ${timestamp}</p>
						<p style="margin-top: 10px; font-size: 11px; color: #999;">
							This is an automated notification from your website contact form.
						</p>
					</div>
				</div>
			</body>
		</html>
	`

	const emailText = `
${greeting}

You have received a new ${formType === "simple" ? "lead inquiry" : "contact form submission"} from your website.

${fields.map((field) => `${field.label}: ${field.value}`).join("\n")}

${sourcePage ? `\nSource: ${sourcePage}` : ""}

Quick Actions:
- Reply to: ${email}
${phone ? `- Call: ${phone}` : ""}

---
Submitted on: ${timestamp}
${companyName}
	`

	return { emailSubject, emailHtml, emailText }
}

export async function POST(request: NextRequest) {
	try {
		// Check if Resend is configured
		if (!resend || !resendApiKey) {
			console.error("RESEND_API_KEY environment variable is not set")
			return NextResponse.json(
				{ error: "Email service is not configured. Please set RESEND_API_KEY" },
				{ status: 500 }
			)
		}

		const body = await request.json()
		const { email, firstName, lastName, website, phone, sourcePage } = body

		// Validate required fields - email is always required
		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 })
		}

		// For contact form, require firstName and lastName
		// For simple form, require at least website or phone
		if (firstName === undefined && lastName === undefined) {
			// It's a simple form - need website or phone
			if (!website && !phone) {
				return NextResponse.json(
					{ error: "Please provide website or phone number" },
					{ status: 400 }
				)
			}
		} else {
			// It's a contact form - require firstName and lastName
			if (!firstName || !lastName) {
				return NextResponse.json(
					{ error: "First name and last name are required" },
					{ status: 400 }
				)
			}
		}

		// Get the recipient email from environment variable
		const recipientEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_RECIPIENT

		if (!recipientEmail) {
			console.error("CONTACT_EMAIL environment variable is not set")
			return NextResponse.json(
				{ error: "Email configuration error: CONTACT_EMAIL is required" },
				{ status: 500 }
			)
		}

		// Get the from email from environment variable or use a default
		const fromEmail =
			process.env.RESEND_FROM_EMAIL || "Contact Form <onboarding@resend.dev>"

		// Get source page from referer or request
		let pageSource = sourcePage || "Contact Form"
		
		try {
			const referer = request.headers.get("referer")
			if (referer) {
				const url = new URL(referer)
				const pathname = url.pathname
				// Format pathname nicely
				if (pathname === "/") {
					pageSource = "Home Page"
				} else if (pathname === "/contact") {
					pageSource = "Contact Page"
				} else {
					// Convert /seo/example to "SEO Service Page"
					const pathParts = pathname.split("/").filter(Boolean)
					const serviceName = pathParts[0]
						.split("-")
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(" ")
					pageSource = `${serviceName} Page`
				}
			}
		} catch {
			// Use default if referer parsing fails
		}

		// Determine form type
		const formType = website ? "simple" : "contact"

		// Format email content
		const { emailSubject, emailHtml, emailText } = formatEmailContent(
			body,
			formType,
			pageSource
		)

		// Send email using Resend
		const data = await resend.emails.send({
			from: fromEmail,
			to: [recipientEmail],
			replyTo: email,
			subject: emailSubject,
			html: emailHtml,
			text: emailText,
		})

		if (data.error) {
			console.error("Error sending email:", data.error)
			return NextResponse.json(
				{ error: "Failed to send email", details: data.error },
				{ status: 500 }
			)
		}

		return NextResponse.json(
			{
				success: true,
				message: "Form submitted successfully",
				emailId: data.data?.id,
			},
			{ status: 200 }
		)
	} catch (error: any) {
		console.error("Error processing form:", error)
		return NextResponse.json(
			{ error: "Internal server error", message: error.message },
			{ status: 500 }
		)
	}
}
