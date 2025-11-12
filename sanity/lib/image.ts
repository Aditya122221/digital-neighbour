import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

export const urlForImage = (source: Image) => builder.image(source);
