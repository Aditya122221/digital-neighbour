import ApartClient from "./apart-client"
import apartData from "@/data/apart.json"

export default function Apart() {
	return (
		<ApartClient
			oursList={apartData.ours}
			othersList={apartData.others}
		/>
	)
}
