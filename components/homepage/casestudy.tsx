import CaseStudyClient from "./casestudy-client"
import caseStudiesData from "@/data/case.json"

export default function CaseStudy() {
	return <CaseStudyClient caseStudiesList={caseStudiesData} />
}
