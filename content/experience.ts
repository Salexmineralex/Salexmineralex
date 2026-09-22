import data from "./experience.json";

export type Role = {
  id: string;
  title: string;
  org: string;
  place: string;
  dates: string;
  points: string[];
  tools: string;
};

export const experience = data as Role[];
