import { CBExamSimulator } from "@/components/CBExamSimulator/CBExamSimulator";
import { exams } from "@/data/examSimulator";

export default function ExamSimulator() {
  return <CBExamSimulator exams={exams} />;
}
