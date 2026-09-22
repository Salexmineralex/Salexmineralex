export type Role = {
  id: string;
  title: string;
  org: string;
  place: string;
  dates: string;
  points: string[];
  tools: string;
};

export const experience: Role[] = [
  {
    id: "gmv",
    title: "Software Engineer",
    org: "GMV",
    place: "Madrid",
    dates: "06/24 – Now",
    points: [
      "Developed Java applications for the defense and space sectors.",
      "Designed IAM systems with Keycloak for a secure environment with more than 100 users.",
      "Worked as DevOps on microservice architectures.",
    ],
    tools: "Java, IAM, Keycloak, Liferay, Linux, SonarQube",
  },
  {
    id: "santander",
    title: "Software Engineer",
    org: "Banco Santander",
    place: "Madrid",
    dates: "11/23 – 06/24",
    points: [
      "Built applications with Java, Spring Boot, JPA, and Hibernate.",
      "Worked in Agile teams using Kanban and Scrum.",
    ],
    tools: "Git, SQL, SonarQube, Java, Spring Boot, JPA, Hibernate, Jenkins",
  },
  {
    id: "airbus",
    title: "Software Engineer",
    org: "Airbus",
    place: "Madrid",
    dates: "04/22 – 11/22",
    points: [
      "Developed .NET applications with C# and Blazor for electronic component manufacturing.",
      "Maintained legacy ASP.NET systems using SQL Server and GitLab.",
    ],
    tools: ".NET, C#, Blazor, ASP.NET, SQL Server, GitLab",
  },
];
