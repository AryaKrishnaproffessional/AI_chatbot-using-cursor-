const chat = document.querySelector("#chat");
const form = document.querySelector("#input-form");
const input = document.querySelector("#message-input");
const resetButton = document.querySelector("#reset");
const themeToggle = document.querySelector("#theme-toggle");
const sendButton = form.querySelector("button");
const inputForm = form;

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const SOON_WINDOW_DAYS = 60;

const HELP_OPTIONS = [
  { label: "Find internships and graduate programs", value: "internships" },
  { label: "Find jobs", value: "jobs" },
  { label: "Interview practice", value: "interview" },
  { label: "Skills in demand", value: "skills" },
];

const JOB_TYPE_OPTIONS = [
  { label: "Internships & graduate programs", value: "internships" },
  { label: "Jobs", value: "jobs" },
  { label: "Interview practice", value: "interview" },
  { label: "Skills in demand", value: "skills" },
];

const DISCIPLINE_OPTIONS = [
  { label: "Computer Science / IT", value: "software" },
  { label: "Data / Analytics", value: "data" },
  { label: "Engineering", value: "engineering" },
  { label: "Business / Commerce", value: "business" },
  { label: "Marketing / Communications", value: "marketing" },
  { label: "Design / UX", value: "design" },
  { label: "Health / Science", value: "health" },
  { label: "Education", value: "education" },
  { label: "Law", value: "law" },
  { label: "Other / Undeclared", value: "general" },
];

const LOCATION_OPTIONS = [
  { label: "All locations", value: "all" },
  { label: "Sydney", value: "sydney" },
  { label: "Melbourne", value: "melbourne" },
  { label: "Brisbane", value: "brisbane" },
  { label: "Perth", value: "perth" },
  { label: "Adelaide", value: "adelaide" },
  { label: "Canberra", value: "canberra" },
  { label: "Remote", value: "remote" },
];

const LOCATION_LABELS = {
  all: "All locations",
  sydney: "Sydney (NSW)",
  melbourne: "Melbourne (VIC)",
  brisbane: "Brisbane (QLD)",
  perth: "Perth (WA)",
  adelaide: "Adelaide (SA)",
  canberra: "Canberra (ACT)",
  remote: "Remote",
  hybrid: "Hybrid",
};

const LOCATION_SYNONYMS = {
  all: ["all", "all locations", "anywhere", "any location", "all states", "any"],
  sydney: ["sydney", "nsw", "new south wales"],
  melbourne: ["melbourne", "vic", "victoria"],
  brisbane: ["brisbane", "qld", "queensland"],
  perth: ["perth", "wa", "western australia"],
  adelaide: ["adelaide", "sa", "south australia"],
  canberra: ["canberra", "act", "australian capital territory"],
  remote: ["remote", "anywhere", "work from home", "wfh"],
};

const DISCIPLINES = [
  {
    key: "software",
    label: "Computer Science / IT",
    keywords: [
      "computer science",
      "software",
      "programming",
      "developer",
      "it",
      "information technology",
      "coding",
    ],
  },
  {
    key: "data",
    label: "Data / Analytics",
    keywords: [
      "data",
      "analytics",
      "statistics",
      "machine learning",
      "ai",
      "artificial intelligence",
    ],
  },
  {
    key: "engineering",
    label: "Engineering",
    keywords: [
      "engineering",
      "mechanical",
      "electrical",
      "civil",
      "mechatronics",
      "systems",
    ],
  },
  {
    key: "business",
    label: "Business / Commerce",
    keywords: [
      "business",
      "commerce",
      "management",
      "economics",
      "finance",
      "accounting",
    ],
  },
  {
    key: "marketing",
    label: "Marketing / Communications",
    keywords: [
      "marketing",
      "communications",
      "brand",
      "digital marketing",
      "public relations",
    ],
  },
  {
    key: "design",
    label: "Design / UX",
    keywords: ["design", "ux", "ui", "graphic", "product design"],
  },
  {
    key: "health",
    label: "Health / Science",
    keywords: [
      "health",
      "science",
      "biomedical",
      "nursing",
      "biology",
      "chemistry",
      "pharmacy",
    ],
  },
  {
    key: "education",
    label: "Education",
    keywords: ["education", "teaching", "pedagogy"],
  },
  {
    key: "law",
    label: "Law",
    keywords: ["law", "legal", "juris", "llb", "jd"],
  },
  {
    key: "general",
    label: "Other / Undeclared",
    keywords: [],
  },
];

const SKILLS_BY_DISCIPLINE = {
  software: [
    {
      skill: "Programming fundamentals",
      why: "Core requirement for most software roles.",
      improve: "Build two small apps and ask for code reviews.",
    },
    {
      skill: "Data structures and algorithms",
      why: "Common interview topic for internships and grads.",
      improve: "Solve 3 to 5 problems weekly and review patterns.",
    },
    {
      skill: "Git and CI",
      why: "Teams expect version control and automated testing.",
      improve: "Use GitHub with a basic CI pipeline on a project.",
    },
    {
      skill: "Cloud basics",
      why: "Many teams deploy on cloud services.",
      improve: "Complete an intro course on AWS or Azure.",
    },
  ],
  data: [
    {
      skill: "SQL and data modeling",
      why: "Most analytics roles rely on SQL every day.",
      improve: "Practice queries on sample datasets and document them.",
    },
    {
      skill: "Python or R",
      why: "Used for analysis, automation, and reporting.",
      improve: "Build a small analytics project with clear insights.",
    },
    {
      skill: "Data visualization",
      why: "Stakeholders need clear charts and dashboards.",
      improve: "Recreate dashboards in Tableau or Power BI.",
    },
    {
      skill: "Business context",
      why: "Impact comes from tying data to decisions.",
      improve: "Write one-page summaries explaining your findings.",
    },
  ],
  engineering: [
    {
      skill: "CAD and technical drawing",
      why: "Widely required for design and manufacturing roles.",
      improve: "Model a component and document tolerances.",
    },
    {
      skill: "Simulation and analysis",
      why: "Helps validate designs before prototyping.",
      improve: "Run a basic FEA or CFD tutorial project.",
    },
    {
      skill: "Safety and standards",
      why: "Engineering work must meet compliance rules.",
      improve: "Summarize two key standards used in your field.",
    },
    {
      skill: "Project planning",
      why: "Employers want engineers who can deliver milestones.",
      improve: "Create a simple Gantt plan for a study project.",
    },
  ],
  business: [
    {
      skill: "Excel modeling",
      why: "Still the main tool for quick analysis.",
      improve: "Build a model with scenarios and clear assumptions.",
    },
    {
      skill: "Financial literacy",
      why: "Roles expect you to understand key metrics.",
      improve: "Analyze annual reports and summarize key ratios.",
    },
    {
      skill: "Stakeholder communication",
      why: "Business roles require clear updates and buy-in.",
      improve: "Practice concise summaries and structured updates.",
    },
    {
      skill: "Process improvement",
      why: "Employers value efficiency gains.",
      improve: "Map a simple process and propose improvements.",
    },
  ],
  marketing: [
    {
      skill: "Campaign planning",
      why: "Marketing roles run multi-channel campaigns.",
      improve: "Create a campaign brief with audience and goals.",
    },
    {
      skill: "Content strategy",
      why: "Content drives engagement and acquisition.",
      improve: "Draft a content calendar for four weeks.",
    },
    {
      skill: "Analytics and reporting",
      why: "Decisions rely on performance data.",
      improve: "Build a report with KPIs and insights.",
    },
    {
      skill: "Customer research",
      why: "Understanding users improves targeting.",
      improve: "Run a small survey and summarize findings.",
    },
  ],
  design: [
    {
      skill: "Figma or design tools",
      why: "Most teams collaborate in design tools.",
      improve: "Create a small component library and mock screens.",
    },
    {
      skill: "User research",
      why: "Good design starts with user needs.",
      improve: "Run 5 user interviews and synthesize themes.",
    },
    {
      skill: "Prototyping",
      why: "Rapid prototypes speed up feedback.",
      improve: "Build a clickable prototype for a product flow.",
    },
    {
      skill: "Accessibility",
      why: "Accessible design is expected in many industries.",
      improve: "Check color contrast and keyboard navigation.",
    },
  ],
  health: [
    {
      skill: "Research methods",
      why: "Health and science roles need structured inquiry.",
      improve: "Write a short research plan with hypotheses.",
    },
    {
      skill: "Data analysis",
      why: "Evidence-based decisions rely on data.",
      improve: "Analyze a dataset and document conclusions.",
    },
    {
      skill: "Scientific writing",
      why: "Clear reports are essential in health roles.",
      improve: "Summarize a journal article in 500 words.",
    },
    {
      skill: "Lab or clinical safety",
      why: "Compliance is non-negotiable in health settings.",
      improve: "Review safety protocols and create a checklist.",
    },
  ],
  education: [
    {
      skill: "Lesson planning",
      why: "Teaching roles require structured learning plans.",
      improve: "Design a lesson with objectives and activities.",
    },
    {
      skill: "Assessment design",
      why: "Assessment drives learning outcomes.",
      improve: "Create a rubric and example assessment.",
    },
    {
      skill: "Classroom technology",
      why: "Digital tools are common in modern classrooms.",
      improve: "Plan a lesson using an LMS or digital platform.",
    },
    {
      skill: "Student support",
      why: "Inclusive practice is valued by schools.",
      improve: "Draft strategies for diverse learning needs.",
    },
  ],
  law: [
    {
      skill: "Legal research",
      why: "Most entry roles require strong research skills.",
      improve: "Summarize cases and cite authorities clearly.",
    },
    {
      skill: "Drafting and review",
      why: "Contracts and memos are common tasks.",
      improve: "Draft a short memo with clear structure.",
    },
    {
      skill: "Attention to detail",
      why: "Accuracy reduces legal risk.",
      improve: "Practice proofreading and checklist reviews.",
    },
    {
      skill: "Client communication",
      why: "Clients expect clarity and empathy.",
      improve: "Write simple explanations of legal terms.",
    },
  ],
  general: [
    {
      skill: "Communication",
      why: "Clear updates are required in every field.",
      improve: "Practice short written summaries after projects.",
    },
    {
      skill: "Team collaboration",
      why: "Most roles are cross-functional.",
      improve: "Use shared tools and document your contributions.",
    },
    {
      skill: "Problem solving",
      why: "Employers want structured thinking.",
      improve: "Use a simple framework to break down problems.",
    },
    {
      skill: "Digital tools",
      why: "Most workplaces rely on common software.",
      improve: "Build fluency in spreadsheets and presentations.",
    },
  ],
};

const INTERVIEW_PRACTICE_BY_DISCIPLINE = {
  software: {
    focus: "Coding, debugging, and system thinking.",
    questions: [
      "Tell me about a project where you shipped a feature end-to-end.",
      "How would you design a URL shortener or a chat service?",
      "Walk through a bug you fixed and how you found the root cause.",
      "How do you choose data structures for performance and clarity?",
      "What tests would you write for a new API endpoint?",
    ],
    tips: [
      "Prepare two or three STAR stories about teamwork and impact.",
      "Practice explaining trade-offs and assumptions out loud.",
    ],
  },
  data: {
    focus: "Analytics, experimentation, and storytelling.",
    questions: [
      "Describe a data project where you influenced a decision.",
      "How would you validate a dashboard metric that looks wrong?",
      "Explain a model or analysis to a non-technical stakeholder.",
      "What is the difference between correlation and causation?",
      "How would you design an A/B test for a product change?",
    ],
    tips: [
      "Keep a portfolio story with a clear problem, method, and impact.",
      "Practice writing insights in one concise paragraph.",
    ],
  },
  engineering: {
    focus: "Technical fundamentals, safety, and practical design.",
    questions: [
      "Tell me about an engineering project and your role in it.",
      "How do you verify a design meets safety or compliance standards?",
      "Describe a time you balanced cost, time, and quality.",
      "How would you approach troubleshooting a failed component?",
      "What tools or simulations do you use to validate designs?",
    ],
    tips: [
      "Bring a portfolio summary with drawings or calculations.",
      "Review core standards or regulations in your discipline.",
    ],
  },
  business: {
    focus: "Commercial awareness, analysis, and communication.",
    questions: [
      "Walk me through a time you improved a process or result.",
      "How do you prioritize tasks when everything feels urgent?",
      "Describe how you would size a market for a new product.",
      "Tell me about a time you influenced a stakeholder decision.",
      "What business metrics would you track for a growth team?",
    ],
    tips: [
      "Prepare structured answers with a clear outcome and numbers.",
      "Review company news and show commercial curiosity.",
    ],
  },
  marketing: {
    focus: "Campaign strategy, content, and performance.",
    questions: [
      "How would you plan a campaign for a new product launch?",
      "Tell me about content you created that performed well.",
      "How do you decide which channels to invest in?",
      "Describe a time you used data to adjust a campaign.",
      "What metrics matter most for brand vs. performance marketing?",
    ],
    tips: [
      "Bring examples of content briefs or campaigns you led.",
      "Practice tying outcomes to clear KPIs.",
    ],
  },
  design: {
    focus: "User research, prototyping, and design rationale.",
    questions: [
      "Walk me through a design project from brief to delivery.",
      "How do you handle feedback that conflicts with user research?",
      "Describe your process for turning insights into UI decisions.",
      "How do you measure design success after launch?",
      "What accessibility checks do you run on a design?",
    ],
    tips: [
      "Prepare a portfolio story that highlights your decisions.",
      "Practice narrating trade-offs between usability and brand.",
    ],
  },
  health: {
    focus: "Evidence-based practice and safety.",
    questions: [
      "Tell me about a time you followed a strict protocol.",
      "How do you ensure accuracy in data or lab results?",
      "Describe a situation where patient safety was a priority.",
      "How would you handle a conflict in a clinical team?",
      "What motivates you to work in health or science?",
    ],
    tips: [
      "Review core clinical or lab safety procedures.",
      "Prepare examples that show empathy and diligence.",
    ],
  },
  education: {
    focus: "Learning design and classroom practice.",
    questions: [
      "Describe a lesson plan you created and why it worked.",
      "How do you adapt for diverse learning needs?",
      "Tell me about a time you managed classroom behavior.",
      "How do you assess whether students learned a concept?",
      "What is your approach to inclusive education?",
    ],
    tips: [
      "Bring a sample lesson or unit outline to discuss.",
      "Prepare one example of differentiated instruction.",
    ],
  },
  law: {
    focus: "Research, drafting, and attention to detail.",
    questions: [
      "Describe a legal research task and how you approached it.",
      "How do you ensure accuracy when drafting documents?",
      "Tell me about a time you had to manage sensitive information.",
      "How would you explain a complex legal concept to a client?",
      "What area of law are you most interested in and why?",
    ],
    tips: [
      "Prepare a writing sample story that shows structure and clarity.",
      "Review key cases or topics relevant to the firm.",
    ],
  },
  general: {
    focus: "Transferable skills and motivation.",
    questions: [
      "Tell me about a project where you solved a tough problem.",
      "How do you organize your work when priorities change?",
      "Describe a time you worked in a team under pressure.",
      "What strengths would you bring to this role?",
      "Why are you interested in this industry?",
    ],
    tips: [
      "Prepare concise STAR stories with results and numbers.",
      "Show curiosity by asking thoughtful follow-up questions.",
    ],
  },
};

const OPPORTUNITIES = [
  {
    id: "op-001",
    type: "internship",
    title: "Software Engineering Intern",
    company: "NovaApps",
    locations: ["sydney", "remote"],
    disciplines: ["software"],
    opens: "2026-02-20",
    closes: "2026-04-12",
    companyUrl: "https://www.novaapps.com",
    careerUrl: "https://www.novaapps.com/careers",
    description: "Build features with a product squad and mentor.",
  },
  {
    id: "op-002",
    type: "internship",
    title: "Data Analytics Intern",
    company: "Aurora Insights",
    locations: ["melbourne", "remote"],
    disciplines: ["data", "business"],
    opens: "2026-03-05",
    closes: "2026-04-30",
    companyUrl: "https://www.aurorainsights.com",
    careerUrl: "https://www.aurorainsights.com/careers",
    description: "Support dashboards and weekly performance reports.",
  },
  {
    id: "op-003",
    type: "internship",
    title: "UX Design Intern",
    company: "BrightSpark Studio",
    locations: ["remote"],
    disciplines: ["design"],
    opens: "2026-02-25",
    closes: "2026-03-31",
    companyUrl: "https://www.brightsparkstudio.com",
    careerUrl: "https://www.brightsparkstudio.com/careers",
    description: "Create wireframes and prototype new experiences.",
  },
  {
    id: "op-004",
    type: "internship",
    title: "Biomedical Research Intern",
    company: "CivicHealth Labs",
    locations: ["brisbane"],
    disciplines: ["health"],
    opens: "2026-03-10",
    closes: "2026-04-05",
    companyUrl: "https://www.civichealthlabs.com",
    careerUrl: "https://www.civichealthlabs.com/careers",
    description: "Assist with lab studies and clinical data review.",
  },
  {
    id: "op-005",
    type: "internship",
    title: "Mechanical Engineering Vacationer",
    company: "MetroGrid Energy",
    locations: ["perth"],
    disciplines: ["engineering"],
    opens: "2026-02-18",
    closes: "2026-03-20",
    companyUrl: "https://www.metrogridenergy.com",
    careerUrl: "https://www.metrogridenergy.com/careers",
    description: "Support maintenance planning and site inspections.",
  },
  {
    id: "op-006",
    type: "graduate",
    title: "Graduate Program - Technology",
    company: "Coastline Bank",
    locations: ["sydney"],
    disciplines: ["software", "data"],
    opens: "2026-03-01",
    closes: "2026-04-15",
    companyUrl: "https://www.coastlinebank.com",
    careerUrl: "https://www.coastlinebank.com/careers",
    description: "Rotate across engineering, data, and product teams.",
  },
  {
    id: "op-007",
    type: "graduate",
    title: "Graduate Program - Business",
    company: "Skyline Consulting",
    locations: ["melbourne"],
    disciplines: ["business", "marketing"],
    opens: "2026-03-12",
    closes: "2026-04-25",
    companyUrl: "https://www.skylineconsulting.com",
    careerUrl: "https://www.skylineconsulting.com/careers",
    description: "Client rotations in strategy, analytics, and growth.",
  },
  {
    id: "op-008",
    type: "graduate",
    title: "Graduate Program - Engineering",
    company: "Northern Rail",
    locations: ["adelaide"],
    disciplines: ["engineering"],
    opens: "2026-02-28",
    closes: "2026-04-08",
    companyUrl: "https://www.northernrail.com",
    careerUrl: "https://www.northernrail.com/careers",
    description: "Work with maintenance, design, and safety teams.",
  },
  {
    id: "op-009",
    type: "graduate",
    title: "Graduate Program - Education",
    company: "Unity Schools",
    locations: ["canberra"],
    disciplines: ["education"],
    opens: "2026-03-20",
    closes: "2026-04-30",
    companyUrl: "https://www.unityschools.edu.au",
    careerUrl: "https://www.unityschools.edu.au/careers",
    description: "Mentored placements across primary and secondary.",
  },
  {
    id: "op-010",
    type: "job",
    title: "Junior Software Engineer",
    company: "HarborTech",
    locations: ["sydney", "hybrid"],
    disciplines: ["software"],
    opens: "2026-02-10",
    closes: "2026-03-31",
    description: "Ship features and learn from senior engineers.",
  },
  {
    id: "op-011",
    type: "job",
    title: "Senior Software Engineer",
    company: "CloudBridge",
    locations: ["melbourne", "remote"],
    disciplines: ["software"],
    opens: "2026-02-08",
    closes: "2026-04-05",
    description: "Lead projects and mentor a small squad.",
  },
  {
    id: "op-012",
    type: "job",
    title: "DevOps Engineer",
    company: "Summit Infrastructure",
    locations: ["sydney", "remote"],
    disciplines: ["software"],
    opens: "2026-02-14",
    closes: "2026-04-10",
    description: "Own CI/CD pipelines and cloud reliability.",
  },
  {
    id: "op-013",
    type: "job",
    title: "Data Analyst",
    company: "Greenline Retail",
    locations: ["melbourne", "hybrid"],
    disciplines: ["data", "business"],
    opens: "2026-02-12",
    closes: "2026-03-28",
    description: "Analyze sales trends and inform merchandising.",
  },
  {
    id: "op-014",
    type: "job",
    title: "Data Scientist",
    company: "Aurora Energy",
    locations: ["brisbane"],
    disciplines: ["data"],
    opens: "2026-02-18",
    closes: "2026-04-12",
    description: "Develop forecasting models and experiment analysis.",
  },
  {
    id: "op-015",
    type: "job",
    title: "Marketing Coordinator",
    company: "Sunrise Media",
    locations: ["brisbane"],
    disciplines: ["marketing", "business"],
    opens: "2026-02-15",
    closes: "2026-03-29",
    description: "Coordinate campaigns and partner deliverables.",
  },
  {
    id: "op-016",
    type: "job",
    title: "Marketing Manager",
    company: "Pioneer Health",
    locations: ["sydney"],
    disciplines: ["marketing", "business"],
    opens: "2026-02-16",
    closes: "2026-04-02",
    description: "Lead brand campaigns and go-to-market plans.",
  },
  {
    id: "op-017",
    type: "job",
    title: "Product Designer",
    company: "Studio Eight",
    locations: ["melbourne"],
    disciplines: ["design"],
    opens: "2026-02-22",
    closes: "2026-04-15",
    description: "Own product flows from research to launch.",
  },
  {
    id: "op-018",
    type: "job",
    title: "Mechanical Engineer",
    company: "MetroGrid Energy",
    locations: ["perth"],
    disciplines: ["engineering"],
    opens: "2026-02-20",
    closes: "2026-04-08",
    description: "Deliver equipment upgrades and maintenance plans.",
  },
  {
    id: "op-019",
    type: "job",
    title: "Project Engineer",
    company: "Northern Rail",
    locations: ["adelaide"],
    disciplines: ["engineering"],
    opens: "2026-02-24",
    closes: "2026-04-18",
    description: "Coordinate project schedules and site delivery.",
  },
  {
    id: "op-020",
    type: "job",
    title: "Finance Analyst",
    company: "Coastline Bank",
    locations: ["sydney"],
    disciplines: ["business"],
    opens: "2026-02-26",
    closes: "2026-04-20",
    description: "Build forecasts and support monthly reporting.",
  },
  {
    id: "op-021",
    type: "job",
    title: "Learning Designer",
    company: "Unity Schools",
    locations: ["canberra", "remote"],
    disciplines: ["education"],
    opens: "2026-02-21",
    closes: "2026-04-25",
    description: "Create blended learning programs for schools.",
  },
  {
    id: "op-022",
    type: "job",
    title: "Clinical Research Coordinator",
    company: "CivicHealth Labs",
    locations: ["brisbane"],
    disciplines: ["health"],
    opens: "2026-02-19",
    closes: "2026-04-22",
    description: "Support trials, documentation, and participant care.",
  },
  {
    id: "op-023",
    type: "job",
    title: "Legal Research Assistant",
    company: "Anchor Legal",
    locations: ["sydney"],
    disciplines: ["law"],
    opens: "2026-02-22",
    closes: "2026-04-04",
    description: "Support case research and document preparation.",
  },
];

const state = {
  step: "help",
  mode: null,
  disciplineKey: null,
  disciplineLabel: null,
  disciplineRecognized: false,
  locationKey: null,
  locationLabel: null,
  locationMatched: false,
};

let botQueue = Promise.resolve();
let isBotTyping = false;

const THEME_STORAGE_KEY = "careerCompassTheme";

function normalizeInput(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(text) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function updateThemeToggle(theme) {
  if (!themeToggle) {
    return;
  }
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateThemeToggle(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
}

function detectIntent(text) {
  const normalized = normalizeInput(text);
  if (normalized.includes("intern") || normalized.includes("grad")) {
    return "internships";
  }
  if (normalized.includes("job") || normalized.includes("role")) {
    return "jobs";
  }
  if (normalized.includes("interview") || normalized.includes("practice")) {
    return "interview";
  }
  if (normalized.includes("skill")) {
    return "skills";
  }
  return null;
}

function detectAction(text) {
  const normalized = normalizeInput(text);
  if (
    normalized.includes("change location") ||
    normalized.includes("other location") ||
    normalized.includes("other state") ||
    normalized.includes("different state") ||
    normalized.includes("other city") ||
    normalized.includes("location") ||
    normalized.includes("state") ||
    normalized.includes("city")
  ) {
    return "change-location";
  }
  if (
    normalized.includes("study") ||
    normalized.includes("discipline") ||
    normalized.includes("degree") ||
    normalized.includes("major") ||
    normalized.includes("course")
  ) {
    return "change-discipline";
  }
  if (
    normalized.includes("job type") ||
    normalized.includes("role type") ||
    normalized.includes("other job type") ||
    normalized.includes("change type") ||
    normalized.includes("switch type") ||
    normalized.includes("switch job") ||
    normalized.includes("switch role")
  ) {
    return "change-type";
  }
  return null;
}

function resolveDiscipline(text) {
  const normalized = normalizeInput(text);
  for (const discipline of DISCIPLINES) {
    if (discipline.keywords.some((keyword) => normalized.includes(keyword))) {
      return {
        key: discipline.key,
        label: discipline.label,
        recognized: true,
      };
    }
  }
  const fallback = DISCIPLINES.find((discipline) => discipline.key === "general");
  return {
    key: fallback.key,
    label: fallback.label,
    recognized: false,
  };
}

function resolveLocation(text) {
  const normalized = normalizeInput(text);
  for (const [key, synonyms] of Object.entries(LOCATION_SYNONYMS)) {
    if (synonyms.some((value) => normalized.includes(value))) {
      return {
        key,
        label: LOCATION_LABELS[key] || titleCase(key),
        matched: true,
      };
    }
  }
  const rawLabel = titleCase(normalized || text);
  return {
    key: "all",
    label: rawLabel || "All locations",
    matched: false,
  };
}

function formatLocationLabel(location) {
  return LOCATION_LABELS[location] || titleCase(location);
}

function formatLocations(locations) {
  return locations.map(formatLocationLabel).join(", ");
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getOpportunityStatus(opportunity) {
  const now = new Date();
  const openDate = new Date(opportunity.opens);
  const closeDate = new Date(opportunity.closes);
  const daysUntilOpen = Math.ceil((openDate - now) / MS_PER_DAY);
  const isOpen = now >= openDate && now <= closeDate;
  if (isOpen) {
    return {
      text: `Open now (closes ${formatDate(opportunity.closes)})`,
      className: "open",
    };
  }
  if (daysUntilOpen >= 0) {
    return {
      text: `Opens soon (${formatDate(opportunity.opens)})`,
      className: "soon",
    };
  }
  return {
    text: `Closed (${formatDate(opportunity.closes)})`,
    className: "closed",
  };
}

function isOpenOrSoon(opportunity) {
  const now = new Date();
  const openDate = new Date(opportunity.opens);
  const closeDate = new Date(opportunity.closes);
  const daysUntilOpen = Math.ceil((openDate - now) / MS_PER_DAY);
  const isOpen = now >= openDate && now <= closeDate;
  const isSoon = daysUntilOpen >= 0 && daysUntilOpen <= SOON_WINDOW_DAYS;
  return isOpen || (isSoon && now <= closeDate);
}

function matchesDiscipline(opportunity, disciplineKey) {
  if (!disciplineKey || disciplineKey === "general") {
    return true;
  }
  return opportunity.disciplines.includes(disciplineKey);
}

function matchesLocation(opportunity, locationKey, locationMatched) {
  if (locationKey === "all") {
    return true;
  }
  if (locationMatched) {
    if (locationKey === "remote") {
      return opportunity.locations.includes("remote");
    }
    return opportunity.locations.includes(locationKey);
  }
  return (
    opportunity.locations.includes("remote") ||
    opportunity.locations.includes("hybrid")
  );
}

function buildOptions(options) {
  return options.map((option) => ({
    label: option.label,
    value: option.value ?? option.label,
  }));
}

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTypingDelay(text, base = 420) {
  const length = text ? text.length : 0;
  const extra = Math.min(700, Math.max(0, length * 12));
  return Math.min(1100, base + extra);
}

function setInputEnabled(enabled) {
  input.disabled = !enabled;
  sendButton.disabled = !enabled;
  if (enabled) {
    chat.classList.remove("busy");
  } else {
    chat.classList.add("busy");
  }
}

function focusInput(shouldFlash = false) {
  inputForm.scrollIntoView({ behavior: "smooth", block: "end" });
  input.focus({ preventScroll: true });
  if (shouldFlash) {
    inputForm.classList.remove("flash");
    void inputForm.offsetWidth;
    inputForm.classList.add("flash");
    setTimeout(() => {
      inputForm.classList.remove("flash");
    }, 900);
  }
}

function enqueueBotAction(action) {
  botQueue = botQueue.then(action).catch((error) => {
    console.error(error);
    isBotTyping = false;
    setInputEnabled(true);
  });
  return botQueue;
}

function createMessageBubble(sender) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  wrapper.appendChild(bubble);
  chat.appendChild(wrapper);
  return bubble;
}

function createTypingIndicator() {
  const bubble = createMessageBubble("bot");
  bubble.classList.add("typing");
  const indicator = document.createElement("div");
  indicator.className = "typing-indicator";
  for (let i = 0; i < 3; i += 1) {
    const dot = document.createElement("span");
    dot.className = "typing-dot";
    indicator.appendChild(dot);
  }
  bubble.appendChild(indicator);
  scrollToBottom();
  return bubble;
}

async function withTyping(renderFn, delay) {
  isBotTyping = true;
  setInputEnabled(false);
  const indicator = createTypingIndicator();
  await pause(delay);
  indicator.remove();
  renderFn();
  isBotTyping = false;
  setInputEnabled(true);
  focusInput();
}

function createOptions(options) {
  const container = document.createElement("div");
  container.className = "options";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = option.label;
    button.addEventListener("click", () => {
      if (isBotTyping) {
        return;
      }
      focusInput(true);
      addUserMessage(option.label);
      handleUserMessage(option.value);
    });
    container.appendChild(button);
  });
  return container;
}

function addBotMessage(text, options = []) {
  const bubble = createMessageBubble("bot");
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  bubble.appendChild(paragraph);
  if (options.length > 0) {
    bubble.appendChild(createOptions(options));
  }
  scrollToBottom();
}

function addUserMessage(text) {
  const bubble = createMessageBubble("user");
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  bubble.appendChild(paragraph);
  scrollToBottom();
  focusInput();
}

function queueBotMessage(text, options = [], delay = getTypingDelay(text)) {
  enqueueBotAction(() =>
    withTyping(() => addBotMessage(text, options), delay)
  );
}

function queueResultsMessage(headerText, noteText, opportunities) {
  const delay = getTypingDelay(headerText, 520);
  enqueueBotAction(() =>
    withTyping(
      () => addResultsMessage(headerText, noteText, opportunities),
      delay
    )
  );
}

function queueSkillsMessage() {
  enqueueBotAction(() => withTyping(() => showSkills(), 620));
}

function queueInterviewPractice() {
  enqueueBotAction(() => withTyping(() => showInterviewPractice(), 640));
}

function addResultsMessage(headerText, noteText, opportunities) {
  const bubble = createMessageBubble("bot");
  const header = document.createElement("p");
  header.textContent = headerText;
  bubble.appendChild(header);

  if (noteText) {
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = noteText;
    bubble.appendChild(note);
  }

  const summary = document.createElement("div");
  summary.className = "meta summary";
  summary.textContent = `Filters: ${state.disciplineLabel || "Any discipline"} • ${
    state.locationLabel || "All locations"
  } • ${
    state.mode === "jobs"
      ? "Jobs"
      : state.mode === "skills"
      ? "Skills"
      : state.mode === "interview"
      ? "Interview practice"
      : "Internships & graduate programs"
  }`;
  bubble.appendChild(summary);

  if (opportunities.length === 0) {
    const empty = document.createElement("p");
    empty.textContent =
      "I could not find open or opening soon roles for that combination yet. Try another location or discipline.";
    bubble.appendChild(empty);
  } else {
    const cards = document.createElement("div");
    cards.className = "cards";
    opportunities.forEach((opportunity) => {
      cards.appendChild(createOpportunityCard(opportunity));
    });
    bubble.appendChild(cards);

    const linkTip = document.createElement("p");
    linkTip.className = "note";
    linkTip.textContent =
      state.mode === "jobs"
        ? "Listing links open job board search results for the role."
        : "Listing links open the company careers page.";
    bubble.appendChild(linkTip);
  }

  bubble.appendChild(
    createOptions([
      { label: "Change location", value: "change-location" },
      { label: "Change study area", value: "change-discipline" },
      { label: "Switch job type", value: "change-type" },
      { label: "Interview practice", value: "interview" },
      { label: "See skills in demand", value: "skills" },
      { label: "Start a new search", value: "restart" },
    ])
  );
  scrollToBottom();
}

function buildSearchLinks(opportunity) {
  const query = `${opportunity.title} ${opportunity.company}`;
  const primaryLocation = opportunity.locations[0]
    ? formatLocationLabel(opportunity.locations[0])
    : "";
  const encodedQuery = encodeURIComponent(query);
  const encodedLocation = encodeURIComponent(primaryLocation);
  return [
    {
      label: "Search on Seek",
      url: `https://www.seek.com.au/jobs?keywords=${encodedQuery}&where=${encodedLocation}`,
    },
    {
      label: "Search on LinkedIn",
      url: `https://www.linkedin.com/jobs/search/?keywords=${encodedQuery}&location=${encodedLocation}`,
    },
  ];
}

function buildCompanyLinks(opportunity) {
  const links = [];
  if (opportunity.careerUrl) {
    links.push({ label: "Careers page", url: opportunity.careerUrl });
  }
  if (opportunity.companyUrl) {
    links.push({ label: "Company website", url: opportunity.companyUrl });
  }
  return links;
}

function createOpportunityCard(opportunity) {
  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("h4");
  title.textContent = opportunity.title;
  card.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${opportunity.company} • ${getTypeLabel(
    opportunity.type
  )}`;
  card.appendChild(meta);

  const location = document.createElement("div");
  location.className = "meta";
  location.textContent = `Location: ${formatLocations(
    opportunity.locations
  )}`;
  card.appendChild(location);

  const status = getOpportunityStatus(opportunity);
  const statusLine = document.createElement("div");
  statusLine.className = `meta status ${status.className}`;
  statusLine.textContent = status.text;
  card.appendChild(statusLine);

  const description = document.createElement("p");
  description.textContent = opportunity.description;
  card.appendChild(description);

  const links = document.createElement("div");
  links.className = "card-links";
  const linkItems =
    opportunity.type === "job"
      ? buildSearchLinks(opportunity)
      : buildCompanyLinks(opportunity);
  linkItems.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = item.label;
    links.appendChild(link);
  });
  card.appendChild(links);

  return card;
}

function getTypeLabel(type) {
  if (type === "internship") {
    return "Internship";
  }
  if (type === "graduate") {
    return "Graduate Program";
  }
  return "Job";
}

function showSkills() {
  const bubble = createMessageBubble("bot");
  const header = document.createElement("p");
  const disciplineLabel =
    state.disciplineLabel || "your discipline";
  header.textContent = `Skills in demand for ${disciplineLabel} roles:`;
  bubble.appendChild(header);

  const list = document.createElement("ul");
  list.className = "skills-list";
  const skills =
    SKILLS_BY_DISCIPLINE[state.disciplineKey || "general"] ||
    SKILLS_BY_DISCIPLINE.general;
  skills.forEach((item) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = `${item.skill}: `;
    li.appendChild(strong);
    li.appendChild(
      document.createTextNode(`${item.why} Improve by ${item.improve}`)
    );
    list.appendChild(li);
  });
  bubble.appendChild(list);

  const note = document.createElement("p");
  note.className = "note";
  note.textContent = `Location focus: ${
    state.locationLabel || "any location"
  }.`;
  bubble.appendChild(note);

  bubble.appendChild(
    createOptions([
      { label: "Change location", value: "change-location" },
      { label: "Change study area", value: "change-discipline" },
      { label: "Interview practice", value: "interview" },
      { label: "Start a new search", value: "restart" },
      { label: "Find internships and grad programs", value: "internships" },
      { label: "Find jobs", value: "jobs" },
    ])
  );
  scrollToBottom();
}

function showInterviewPractice() {
  const bubble = createMessageBubble("bot");
  const header = document.createElement("p");
  const disciplineLabel = state.disciplineLabel || "your discipline";
  header.textContent = `Interview practice for ${disciplineLabel}:`;
  bubble.appendChild(header);

  const practice =
    INTERVIEW_PRACTICE_BY_DISCIPLINE[state.disciplineKey || "general"] ||
    INTERVIEW_PRACTICE_BY_DISCIPLINE.general;

  const focus = document.createElement("p");
  focus.className = "note";
  focus.textContent = `Focus areas: ${practice.focus}`;
  bubble.appendChild(focus);

  const list = document.createElement("ul");
  list.className = "skills-list";
  practice.questions.forEach((question) => {
    const li = document.createElement("li");
    li.textContent = question;
    list.appendChild(li);
  });
  bubble.appendChild(list);

  const tipsHeader = document.createElement("p");
  tipsHeader.className = "note";
  tipsHeader.textContent = "Preparation tips:";
  bubble.appendChild(tipsHeader);

  const tipsList = document.createElement("ul");
  tipsList.className = "skills-list";
  practice.tips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });
  bubble.appendChild(tipsList);

  bubble.appendChild(
    createOptions([
      { label: "Change study area", value: "change-discipline" },
      { label: "Find internships and grad programs", value: "internships" },
      { label: "Find jobs", value: "jobs" },
      { label: "See skills in demand", value: "skills" },
      { label: "Start a new search", value: "restart" },
    ])
  );
  scrollToBottom();
}

function showResults() {
  state.step = "results";

  if (state.mode === "skills") {
    queueSkillsMessage();
    return;
  }

  if (state.mode === "interview") {
    queueInterviewPractice();
    return;
  }

  const allowedTypes =
    state.mode === "jobs" ? ["job"] : ["internship", "graduate"];
  const disciplineKey = state.disciplineKey || "general";

  const base = OPPORTUNITIES.filter((opportunity) =>
    allowedTypes.includes(opportunity.type)
  );
  const disciplineMatches = base.filter((opportunity) =>
    matchesDiscipline(opportunity, disciplineKey)
  );
  const locationMatches = disciplineMatches.filter((opportunity) =>
    matchesLocation(opportunity, state.locationKey, state.locationMatched)
  );
  let filtered = locationMatches.filter(isOpenOrSoon);
  let noteText = "";

  if (filtered.length === 0) {
    filtered = disciplineMatches.filter(isOpenOrSoon);
    if (filtered.length > 0) {
      noteText =
        "I could not find listings for that exact location. Showing remote or broader options in your discipline.";
    }
  }

  if (
    !state.locationMatched &&
    state.locationLabel &&
    state.locationLabel !== "All locations"
  ) {
    const fallbackNote = `I do not have ${state.locationLabel} mapped yet, so I am showing all locations for now.`;
    noteText = noteText ? `${noteText} ${fallbackNote}` : fallbackNote;
  }

  const modeLabel =
    state.mode === "jobs"
      ? "jobs"
      : "internships and graduate programs";
  const headerText = `Here are ${modeLabel} open or opening soon in ${
    state.locationLabel || "your area"
  } for ${state.disciplineLabel || "your discipline"}.`;

  queueResultsMessage(headerText, noteText, filtered);
}

function askForStudy() {
  state.step = "study";
  queueBotMessage(
    "What are you studying?",
    buildOptions(DISCIPLINE_OPTIONS)
  );
}

function askForLocation() {
  state.step = "location";
  queueBotMessage(
    "Whereabouts would you like to work? You can pick a state, city, or remote.",
    buildOptions(LOCATION_OPTIONS)
  );
}

function askForJobType() {
  state.step = "type";
  queueBotMessage(
    "Which job type should I focus on?",
    buildOptions(JOB_TYPE_OPTIONS)
  );
}

function handleHelpIntent(text) {
  const intent = detectIntent(text);
  if (!intent) {
    queueBotMessage(
      "I can help with internships, graduate programs, jobs, interview practice, or in-demand skills. How can I help?",
      buildOptions(HELP_OPTIONS)
    );
    return;
  }
  state.mode = intent;
  askForStudy();
}

function handleStudyResponse(text) {
  const resolved = resolveDiscipline(text);
  applyDiscipline(resolved);

  if (state.mode === "skills" || state.mode === "interview") {
    showResults();
    return;
  }

  if (!resolved.recognized) {
    queueBotMessage(
      "Thanks! I will look across a broad mix of disciplines. Whereabouts would you like to work?",
      buildOptions(LOCATION_OPTIONS)
    );
    state.step = "location";
    return;
  }

  queueBotMessage(
    `Got it - ${resolved.label}. Whereabouts would you like to work?`,
    buildOptions(LOCATION_OPTIONS)
  );
  state.step = "location";
}

function handleLocationResponse(text) {
  const resolved = resolveLocation(text);
  applyLocation(resolved);
  showResults();
}

function handleJobTypeResponse(text) {
  const intent = detectIntent(text);
  if (!intent) {
    queueBotMessage(
      "Please choose a job type to continue.",
      buildOptions(JOB_TYPE_OPTIONS)
    );
    return;
  }
  state.mode = intent;
  if (intent === "skills" || intent === "interview") {
    if (!state.disciplineKey) {
      askForStudy();
      return;
    }
    showResults();
    return;
  }
  if (!state.disciplineKey) {
    askForStudy();
    return;
  }
  if (!state.locationKey) {
    askForLocation();
    return;
  }
  showResults();
}

function applyDiscipline(resolved) {
  state.disciplineKey = resolved.key;
  state.disciplineLabel = resolved.label;
  state.disciplineRecognized = resolved.recognized;
}

function applyLocation(resolved) {
  state.locationKey = resolved.key;
  state.locationLabel = resolved.label;
  state.locationMatched = resolved.matched;
}

function shouldRestart(text) {
  const normalized = normalizeInput(text);
  return (
    normalized === "restart" ||
    normalized.includes("start over") ||
    normalized.includes("new search")
  );
}

function handleUserMessage(rawText) {
  const text = rawText.trim();
  if (!text) {
    return;
  }

  if (isBotTyping) {
    return;
  }

  if (shouldRestart(text)) {
    startConversation();
    return;
  }

  if (state.step === "help") {
    handleHelpIntent(text);
    return;
  }

  if (state.step === "study") {
    handleStudyResponse(text);
    return;
  }

  if (state.step === "location") {
    handleLocationResponse(text);
    return;
  }

  if (state.step === "type") {
    handleJobTypeResponse(text);
    return;
  }

  if (state.step === "results") {
    const intent = detectIntent(text);
    const action = detectAction(text);
    if (action === "change-location") {
      askForLocation();
      return;
    }
    if (action === "change-discipline") {
      askForStudy();
      return;
    }
    if (action === "change-type") {
      askForJobType();
      return;
    }
    if (intent === "skills") {
      state.mode = "skills";
      showResults();
      return;
    }
    if (intent === "interview") {
      state.mode = "interview";
      if (!state.disciplineKey) {
        askForStudy();
        return;
      }
      showResults();
      return;
    }
    if (intent === "internships" || intent === "jobs") {
      state.mode = intent;
      showResults();
      return;
    }
    const locationGuess = resolveLocation(text);
    if (locationGuess.matched) {
      applyLocation(locationGuess);
      showResults();
      return;
    }
    const disciplineGuess = resolveDiscipline(text);
    if (disciplineGuess.recognized) {
      applyDiscipline(disciplineGuess);
      showResults();
      return;
    }
    queueBotMessage(
      "Want to refine your search? You can switch job type, change location, or update your study area.",
      buildOptions([
        { label: "Switch job type", value: "change-type" },
        { label: "Change location", value: "change-location" },
        { label: "Change study area", value: "change-discipline" },
        { label: "See skills in demand", value: "skills" },
        { label: "Start a new search", value: "restart" },
      ])
    );
  }
}

function scrollToBottom() {
  chat.scrollTop = chat.scrollHeight;
}

function startConversation() {
  chat.innerHTML = "";
  botQueue = Promise.resolve();
  isBotTyping = false;
  setInputEnabled(true);
  state.step = "help";
  state.mode = null;
  state.disciplineKey = null;
  state.disciplineLabel = null;
  state.disciplineRecognized = false;
  state.locationKey = null;
  state.locationLabel = null;
  state.locationMatched = false;

  queueBotMessage(
    "Hi! Type in the box below or tap a button to find internships, graduate programs, jobs, or interview practice. How can I help?",
    buildOptions(HELP_OPTIONS),
    520
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message) {
    return;
  }
  if (isBotTyping) {
    return;
  }
  addUserMessage(message);
  input.value = "";
  handleUserMessage(message);
});

resetButton.addEventListener("click", () => {
  startConversation();
});

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

applyTheme(getInitialTheme());
startConversation();
