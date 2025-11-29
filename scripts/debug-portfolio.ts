import "dotenv/config";

import { client } from "../sanity/lib/client";

async function main() {
  const heroDocs = await client.fetch(
    `*[_type == "portfolioHero"]|order(_createdAt desc){
			_id,
			_createdAt,
			label,
			title
		}`,
  );

  const projectDocs = await client.fetch(
    `*[_type == "portfolioProject"]|order(_createdAt desc){
			_id,
			_createdAt,
			"projectCount": count(projects),
			"headlines": projects[].headline
		}`,
  );

  console.log(
    JSON.stringify(
      {
        heroDocs,
        projectDocs,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
