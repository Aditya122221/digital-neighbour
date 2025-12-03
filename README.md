## Overview

This repository contains a marketing site built with the [Next.js App Router](https://nextjs.org/docs/app). The project now includes an embedded [Sanity](https://www.sanity.io) Studio to manage structured content and GROQ queries to surface dynamic data on the site.

## Prerequisites

- Node.js `>=20.19` is recommended to satisfy Sanity’s current engine requirements. Earlier versions work for local development but will emit warnings.
- A Sanity project with a dataset (e.g. `production`). Sign in at [sanity.io/manage](https://www.sanity.io/manage) to create one if you have not already.

## Environment Variables

Copy `.env.example` to `.env.local` (create the file if it does not exist) and provide the following keys:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-01
SANITY_API_READ_TOKEN=skY0urReadOnlyToken (optional, only required for private data or preview)

# Contact Form Email Configuration
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=Contact Form <onboarding@resend.dev> (optional)
COMPANY_NAME=Digital Neighbour (optional - used for personalized emails)
```

- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are required for both the Studio and client-side queries.
- `NEXT_PUBLIC_SANITY_API_VERSION` can be any valid date string; update it when you rely on newly released fields.
- `SANITY_API_READ_TOKEN` is optional. Add it if you need authenticated requests (draft previews, private datasets). Generate tokens in the Sanity project settings.
- `RESEND_API_KEY` is required for the contact form to send emails. Get your API key from [Resend](https://resend.com/api-keys) (free tier available).
- `CONTACT_EMAIL` is required. This is the email address where contact form submissions will be sent.
- `RESEND_FROM_EMAIL` is optional. Customize the "from" email address (default: "Contact Form <onboarding@resend.dev>").
- `COMPANY_NAME` is optional. Your company name used in personalized emails (default: "Digital Neighbour").

## Scripts

```bash
npm run dev      # Start Next.js (http://localhost:3000)
npm run build    # Build for production
npm run start    # Serve the production build
npm run lint     # Run lint checks
```

## Sanity Studio

- The Studio lives at `http://localhost:3000/studio` when running `npm run dev`.
- Schemas are defined in `sanity/schemaTypes`. Use the `Service Page` document type and choose the relevant `serviceKey` to reveal a tailored form that mirrors the corresponding JSON structure.
- Update `sanity.config.ts` to register additional tools or customize the Studio experience.
- Use the `Service Page` document type to manage service-specific content (hero, pain points, benefits, FAQs, etc.) that mirrors the previous JSON structure in `data/`.

## Querying Content

- Use the helper in `sanity/lib/fetch.ts` together with GROQ queries from `sanity/lib/queries.ts` to fetch data.
- For example:

  ```ts
  import { sanityFetch } from "@/sanity/lib/fetch";
  import { pageBySlugQuery } from "@/sanity/lib/queries";

  const page = await sanityFetch(pageBySlugQuery, { slug: "about" });
  ```

- Use `sanity/lib/image.ts` to generate optimized image URLs from Sanity assets.

## Deployment

When deploying (e.g. to Vercel):

- Expose the required environment variables in your hosting provider.
- Ensure the `SANITY_API_READ_TOKEN` has the minimum necessary permissions if it is included in the deploy environment.
- Re-run the build pipeline after updating schemas so GROQ queries reflect the latest shapes.

For more on Sanity, see the [Sanity documentation](https://www.sanity.io/docs). For Next.js specifics, refer to the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying).
