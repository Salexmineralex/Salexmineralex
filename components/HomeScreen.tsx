import { DvdMenu } from "@/components/DvdMenu";
import { cvUrl } from "@/content/contact";

const menu = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Hackathons", href: "/hackathons" },
  { label: "Contact", href: "/contact" },
  { label: "CV", href: cvUrl, meta: "PDF" },
];

export function HomeScreen() {
  return <DvdMenu kicker="Library" menuId="main" items={menu} />;
}
