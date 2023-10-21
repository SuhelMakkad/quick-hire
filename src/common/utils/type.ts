export type Job = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  createdAt: string;
  minExperience: number;
  maxExperience: number;
  minSalary: number;
  maxSalary: number;
  categories: string[];
  locations: string[];
};
