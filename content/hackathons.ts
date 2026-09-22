import data from "./hackathons.json";

export type Competition = {
  id: string;
  title: string;
  meta: string;
  points: string[];
  href?: string;
  hrefLabel?: string;
};

export const hackathons = data as Competition[];
