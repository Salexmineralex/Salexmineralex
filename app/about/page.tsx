import type { Metadata } from "next";
import { Scene } from "@/components/Scene";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Scene kicker="About" title={profile.name}>
      {profile.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <h2>Studies</h2>
      <p className="stack">{profile.skills}</p>
      <p>{profile.interests}</p>
      <h2>Studies</h2>
      <ul className="studies">
        {profile.studies.map((study) => (
          <li key={study}>{study}</li>
        ))}
      </ul>
    </Scene>
  );
}
