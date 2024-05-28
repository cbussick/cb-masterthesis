import { MPMIExamSimulator } from "@/components/MPMIExamSimulator/MPMIExamSimulator";
import { exams } from "@/data/examSimulator";

export default function ExamSimulator() {
  return <MPMIExamSimulator exams={exams} />;
}
