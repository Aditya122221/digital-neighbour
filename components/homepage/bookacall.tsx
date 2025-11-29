import BookACallClient from "./bookacall-client"
import { getBookACallSectionData, type BookACallData } from "@/lib/book-a-call-data"

type BookACallProps = {
	data?: BookACallData
}

const hasContent = (data?: BookACallData) =>
	Boolean(
		data?.heading ||
			data?.description ||
			data?.subDescription ||
			data?.buttonText ||
			data?.buttonLink ||
			data?.illustrationImage
	)

export default async function BookACall({ data }: BookACallProps) {
	const sectionData = hasContent(data) ? data! : await getBookACallSectionData()
	return <BookACallClient data={sectionData} />
}

