export interface Project {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  tools: string[];
  problem: string;
  dataSource: string;
  scale: string;
  methodology: string[];
  insights: { stat: string; label: string; detail: string }[];
  impact: string;
}

export const projects: Project[] = [
  {
    slug: "parsons-hackathon",
    number: "01",
    title: "Parsons Creative Hackathons",
    subtitle:
      "An interactive web application built in a 46-hour sprint to visualize the environmental impacts of global data infrastructure.",
    category: "UI/UX Design",
    year: "2025",
    tools: ["React", "D3.js", "Figma", "Node.js"],
    problem:
      "Data centers consume enormous amounts of energy and water, yet most people have no intuitive sense of the scale of that impact. The challenge was to make this abstract, global problem tangible and interactive within a 46-hour hackathon window.",
    dataSource:
      "Publicly available data center energy consumption reports, IEA global electricity statistics, and water usage datasets from hyperscale cloud providers.",
    scale: "Visualizing data across 100+ countries and 10,000+ data center facilities worldwide.",
    methodology: [
      "Defined problem scope and user personas in the first 4 hours",
      "Sourced and cleaned global data center energy and water datasets",
      "Designed low-fidelity wireframes and iterated on information hierarchy in Figma",
      "Built interactive map and chart components using D3.js and React",
      "Conducted rapid usability tests with fellow participants and iterated on feedback",
      "Presented final prototype to a panel of judges at the end of the sprint",
    ],
    insights: [
      { stat: "46h", label: "Build time", detail: "Full sprint from brief to demo" },
      { stat: "100+", label: "Countries", detail: "Global data center coverage" },
      { stat: "3", label: "Iterations", detail: "Design cycles during the sprint" },
      { stat: "Top 5", label: "Placement", detail: "Final judging results" },
    ],
    impact:
      "The prototype demonstrated how data-driven storytelling can shift public perception of tech's environmental footprint — making invisible infrastructure costs visible and actionable for everyday users.",
  },
  {
    slug: "h1b-predictive-model",
    number: "02",
    title: "H-1B Visa Approval Predictive Model",
    subtitle:
      "A machine learning model using 1M+ historical visa records to predict approval probability and identify key decision factors.",
    category: "Machine Learning",
    year: "2024",
    tools: ["Python", "PyTorch", "Scikit-learn", "Pandas", "Tableau"],
    problem:
      "H-1B visa approval is opaque and unpredictable for applicants and employers alike. The goal was to surface which factors most strongly influence approval outcomes so applicants could make more informed decisions.",
    dataSource:
      "USCIS public H-1B disclosure data spanning 2017–2023, including employer, wage level, occupation code, and case status fields.",
    scale: "Over 1 million historical visa application records across 6 fiscal years.",
    methodology: [
      "Acquired and merged USCIS disclosure datasets across multiple fiscal years",
      "Cleaned and encoded categorical features including SOC codes, employer names, and wage levels",
      "Performed exploratory data analysis to identify class imbalance and key feature correlations",
      "Trained and compared Logistic Regression, Random Forest, and a PyTorch neural network",
      "Evaluated models using precision, recall, and AUC-ROC on a held-out test set",
      "Built a Tableau dashboard to communicate feature importance and approval trends",
    ],
    insights: [
      { stat: "1M+", label: "Records", detail: "Training data volume" },
      { stat: "89%", label: "Accuracy", detail: "Best model on test set" },
      { stat: "6 yrs", label: "Coverage", detail: "FY 2017–2023 data" },
      { stat: "3", label: "Models", detail: "Compared for final selection" },
    ],
    impact:
      "The model revealed that wage level and employer size are the strongest predictors of approval — insights that can directly inform how companies structure H-1B filings to improve success rates.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
