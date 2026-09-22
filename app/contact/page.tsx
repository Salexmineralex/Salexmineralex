import type { Metadata } from "next";
import { DvdMenu } from "@/components/DvdMenu";
import { contactLinks } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <DvdMenu kicker="Contact" menuId="contact" backHref="/" items={contactLinks} />
  );
}
