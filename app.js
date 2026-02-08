const chat = document.querySelector("#chat");
const form = document.querySelector("#input-form");
const input = document.querySelector("#message-input");
const resetButton = document.querySelector("#reset");
const themeToggle = document.querySelector("#theme-toggle");
const sendButton = form.querySelector("button");
const inputForm = form;

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const SOON_WINDOW_DAYS = 60;

const MARKET_API = {
  provider: "remotive",
  endpoint: "https://remotive.com/api/remote-jobs",
  enabled: false,
};

const PREMIUM = {
  price: 4.99,
  demoUnlock: true,
};

const MARKET_QUERY_BY_DISCIPLINE = {
  software: "software engineer",
  data: "data analyst",
  engineering: "engineer",
  business: "business analyst",
  marketing: "marketing",
  design: "product designer",
  health: "clinical research",
  education: "education",
  law: "legal",
  general: "graduate",
};

const MARKET_FALLBACK = {
  software: {
    roles: ["Software Engineer", "Backend Engineer", "DevOps Engineer"],
    trends: ["Cloud migration", "AI-assisted development", "Reliability focus"],
    skills: ["JavaScript/TypeScript", "Cloud services", "CI/CD"],
  },
  data: {
    roles: ["Data Analyst", "Data Scientist", "Analytics Engineer"],
    trends: ["Self-serve analytics", "Experimentation", "ML operations"],
    skills: ["SQL", "Python", "Visualization"],
  },
  engineering: {
    roles: ["Project Engineer", "Mechanical Engineer", "Systems Engineer"],
    trends: ["Automation", "Sustainability", "Asset maintenance"],
    skills: ["CAD", "Safety standards", "Project planning"],
  },
  business: {
    roles: ["Business Analyst", "Finance Analyst", "Operations Analyst"],
    trends: ["Cost optimization", "Process automation", "Data-driven planning"],
    skills: ["Excel modeling", "Financial literacy", "Stakeholder updates"],
  },
  marketing: {
    roles: ["Marketing Manager", "Growth Specialist", "Content Strategist"],
    trends: ["Performance marketing", "Lifecycle CRM", "Brand storytelling"],
    skills: ["Campaign analytics", "SEO/SEM", "Content planning"],
  },
  design: {
    roles: ["Product Designer", "UX Researcher", "UI Designer"],
    trends: ["Design systems", "Accessibility", "Rapid prototyping"],
    skills: ["Figma", "User research", "Prototyping"],
  },
  health: {
    roles: ["Clinical Research Coordinator", "Lab Technician", "Health Analyst"],
    trends: ["Digital health", "Evidence-based care", "Clinical trials"],
    skills: ["Research methods", "Data analysis", "Compliance"],
  },
  education: {
    roles: ["Learning Designer", "Curriculum Developer", "Education Coordinator"],
    trends: ["Blended learning", "Student analytics", "Inclusive design"],
    skills: ["Lesson planning", "Assessment design", "LMS tools"],
  },
  law: {
    roles: ["Legal Research Assistant", "Paralegal", "Compliance Analyst"],
    trends: ["Privacy compliance", "RegTech adoption", "Contract automation"],
    skills: ["Legal research", "Drafting", "Attention to detail"],
  },
  general: {
    roles: ["Program Coordinator", "Analyst", "Associate"],
    trends: ["Digital transformation", "Cross-functional delivery", "Automation"],
    skills: ["Communication", "Problem solving", "Digital tools"],
  },
};

const HELP_OPTIONS = [
  { label: "Find internships and graduate programs", value: "internships" },
  { label: "Find jobs", value: "jobs" },
  { label: "Interview practice", value: "interview" },
  { label: "Skills in demand", value: "skills" },
  { label: "Market snapshot", value: "market" },
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
    {
      skill: "AI-assisted development",
      why: "Teams use AI tooling to speed up delivery and reviews.",
      improve: "Practice with an AI coding assistant and verify outputs.",
    },
    {
      skill: "System design foundations",
      why: "Even junior roles benefit from clear architecture thinking.",
      improve: "Sketch system diagrams and explain trade-offs aloud.",
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
    {
      skill: "Machine learning fundamentals",
      why: "Many analytics roles touch basic ML models.",
      improve: "Train a simple model and explain evaluation metrics.",
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
    {
      skill: "Digital tools and automation",
      why: "Modern engineering uses data capture and digital twins.",
      improve: "Explore IoT monitoring or simulation tooling.",
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
    {
      skill: "AI for productivity",
      why: "Business teams are expected to leverage AI tooling.",
      improve: "Automate a report or brief using AI prompts.",
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
    {
      skill: "Marketing automation",
      why: "Automation scales campaigns and personalization.",
      improve: "Build a simple lifecycle flow with CRM tooling.",
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
    {
      skill: "Design systems",
      why: "Consistent components speed up product delivery.",
      improve: "Create a small component library in Figma.",
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
    {
      skill: "Health informatics",
      why: "Digital records and analytics are growing rapidly.",
      improve: "Study how data flows through a clinical system.",
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
    {
      skill: "EdTech fluency",
      why: "Classrooms rely on learning platforms and tools.",
      improve: "Pilot a lesson using an LMS and analytics.",
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
    {
      skill: "Legal tech literacy",
      why: "Firms adopt automation and AI for efficiency.",
      improve: "Review contract automation and e-discovery basics.",
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
    {
      skill: "AI literacy",
      why: "AI tools are now common across most roles.",
      improve: "Practice prompt writing and validate outputs.",
    },
  ],
};

const EXTRA_SKILLS_BY_DISCIPLINE = {
  software: [
    {
      skill: "API design",
      why: "Teams expect consistent, well-documented APIs.",
      improve: "Design a REST API and document it with examples.",
    },
    {
      skill: "Testing strategy",
      why: "Quality relies on unit, integration, and e2e tests.",
      improve: "Add tests that cover edge cases and failure paths.",
    },
    {
      skill: "Performance profiling",
      why: "Slow services cost money and hurt UX.",
      improve: "Profile one app and remove a bottleneck.",
    },
  ],
  data: [
    {
      skill: "Data quality checks",
      why: "Reliable dashboards need clean data pipelines.",
      improve: "Add checks for missing values and anomalies.",
    },
    {
      skill: "Experiment design",
      why: "A/B tests drive product decisions.",
      improve: "Draft an experiment plan with success metrics.",
    },
    {
      skill: "Pipeline automation",
      why: "Automation keeps data fresh and reliable.",
      improve: "Schedule a pipeline and monitor failures.",
    },
  ],
  engineering: [
    {
      skill: "Root cause analysis",
      why: "Engineers must troubleshoot complex failures.",
      improve: "Write a structured RCA for a simulated fault.",
    },
    {
      skill: "Supplier collaboration",
      why: "Many projects rely on vendors and procurement.",
      improve: "Practice writing clear technical requirements.",
    },
    {
      skill: "Sustainability awareness",
      why: "Modern projects must consider energy and waste.",
      improve: "Identify sustainability trade-offs in a design.",
    },
  ],
  business: [
    {
      skill: "Business storytelling",
      why: "Decisions move faster with clear narratives.",
      improve: "Turn a dataset into a 3-slide executive summary.",
    },
    {
      skill: "Pricing analysis",
      why: "Pricing impacts revenue and retention.",
      improve: "Compare competitor pricing and value props.",
    },
    {
      skill: "Risk assessment",
      why: "Leaders expect early warning signals.",
      improve: "Create a simple risk register for a project.",
    },
  ],
  marketing: [
    {
      skill: "SEO fundamentals",
      why: "Organic growth remains cost-effective.",
      improve: "Audit a page and create SEO recommendations.",
    },
    {
      skill: "Paid media optimization",
      why: "Budgets require strong ROI tracking.",
      improve: "Design a weekly optimization checklist.",
    },
    {
      skill: "Customer journey mapping",
      why: "Lifecycle teams need full-funnel alignment.",
      improve: "Map awareness to retention touchpoints.",
    },
  ],
  design: [
    {
      skill: "Usability testing",
      why: "Testing highlights friction before launch.",
      improve: "Run 5 usability tests and synthesize themes.",
    },
    {
      skill: "Interaction design",
      why: "Micro-interactions improve product polish.",
      improve: "Prototype a flow with detailed interactions.",
    },
    {
      skill: "Design handoff",
      why: "Clear specs speed up engineering delivery.",
      improve: "Create annotated specs with tokens and spacing.",
    },
  ],
  health: [
    {
      skill: "Regulatory compliance",
      why: "Healthcare roles require strong compliance awareness.",
      improve: "Review local regulations and summarize key rules.",
    },
    {
      skill: "Patient communication",
      why: "Clear communication improves outcomes.",
      improve: "Practice explaining procedures in plain language.",
    },
    {
      skill: "Clinical documentation",
      why: "Accurate records are essential.",
      improve: "Write structured, consistent notes.",
    },
  ],
  education: [
    {
      skill: "Learning analytics",
      why: "Data improves teaching outcomes.",
      improve: "Review a dataset and propose interventions.",
    },
    {
      skill: "Assessment feedback",
      why: "Feedback drives student growth.",
      improve: "Create a feedback rubric and examples.",
    },
    {
      skill: "Parent communication",
      why: "Families expect clarity and partnership.",
      improve: "Draft concise update templates.",
    },
  ],
  law: [
    {
      skill: "Case summarization",
      why: "Clear summaries speed up decision making.",
      improve: "Summarize a case in five bullet points.",
    },
    {
      skill: "Compliance tracking",
      why: "Regulatory deadlines require vigilance.",
      improve: "Build a simple compliance checklist.",
    },
    {
      skill: "Negotiation basics",
      why: "Legal work often involves negotiation.",
      improve: "Practice a negotiation script and objectives.",
    },
  ],
  general: [
    {
      skill: "Time management",
      why: "Delivery speed depends on prioritization.",
      improve: "Plan weekly goals and review outcomes.",
    },
    {
      skill: "Presentation skills",
      why: "Clear presentations improve stakeholder buy-in.",
      improve: "Deliver a 3-minute summary with visuals.",
    },
    {
      skill: "Customer empathy",
      why: "Understanding users improves decisions.",
      improve: "Interview a user and capture insights.",
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

const AI_ML_FOCUS_SKILLS = [
  {
    skill: "ML fundamentals",
    why: "Helps you understand model strengths and limitations.",
    improve: "Build a small model and compare evaluation metrics.",
    resources: [
      {
        label: "ML basics (YouTube)",
        url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
      },
    ],
  },
  {
    skill: "Model evaluation",
    why: "Hiring managers expect you to explain accuracy trade-offs.",
    improve: "Practice confusion matrices and cross-validation.",
    resources: [
      {
        label: "Model evaluation guide (YouTube)",
        url: "https://www.youtube.com/watch?v=85dtiMz9tSo",
      },
    ],
  },
  {
    skill: "Prompting for AI tools",
    why: "Good prompts improve output quality and consistency.",
    improve: "Iterate on prompts and compare results.",
    resources: [
      {
        label: "Prompt engineering (YouTube)",
        url: "https://www.youtube.com/watch?v=2F2YQ7C5lY0",
      },
    ],
  },
  {
    skill: "Responsible AI",
    why: "Teams need fairness, privacy, and risk awareness.",
    improve: "Review bias, privacy, and model governance basics.",
    resources: [
      {
        label: "Responsible AI overview (YouTube)",
        url: "https://www.youtube.com/watch?v=0P9tG0gT3eM",
      },
    ],
  },
];

const PREMIUM_RESOURCES_BY_DISCIPLINE = {
  software: [
    {
      label: "System design interview (YouTube)",
      url: "https://www.youtube.com/watch?v=MbjObHmDbZo",
    },
    {
      label: "JavaScript full course (YouTube)",
      url: "https://www.youtube.com/watch?v=jS4aFq5-91M",
    },
  ],
  data: [
    {
      label: "Data analyst roadmap (YouTube)",
      url: "https://www.youtube.com/watch?v=7eh4d6sabA0",
    },
    {
      label: "SQL full course (YouTube)",
      url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    },
  ],
  engineering: [
    {
      label: "Mechanical engineering fundamentals (YouTube)",
      url: "https://www.youtube.com/watch?v=G6mIu2gH3oI",
    },
  ],
  business: [
    {
      label: "Business analyst roadmap (YouTube)",
      url: "https://www.youtube.com/watch?v=K2Y5zQ1d0e4",
    },
  ],
  marketing: [
    {
      label: "Digital marketing full course (YouTube)",
      url: "https://www.youtube.com/watch?v=6nJ9YpPzR6A",
    },
  ],
  design: [
    {
      label: "UX design full course (YouTube)",
      url: "https://www.youtube.com/watch?v=_oEa5JBHnUo",
    },
  ],
  health: [
    {
      label: "Clinical research overview (YouTube)",
      url: "https://www.youtube.com/watch?v=KXxXr4g6M1Y",
    },
  ],
  education: [
    {
      label: "Instructional design basics (YouTube)",
      url: "https://www.youtube.com/watch?v=QkY2J9a4m7Q",
    },
  ],
  law: [
    {
      label: "Legal research skills (YouTube)",
      url: "https://www.youtube.com/watch?v=JzE2IY_Hg1A",
    },
  ],
  general: [
    {
      label: "Interview prep playlist (YouTube)",
      url: "https://www.youtube.com/results?search_query=interview+prep+playlist",
    },
  ],
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
  skillFocus: {
    ai: false,
  },
  isPremium: false,
  skillCursor: {},
};

let botQueue = Promise.resolve();
let isBotTyping = false;
let latestPromptElement = null;

const THEME_STORAGE_KEY = "careerCompassTheme";
const PREMIUM_STORAGE_KEY = "careerCompassPremium";

function normalizeInput(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectSkillFocus(text) {
  const normalized = ` ${normalizeInput(text)} `;
  const aiDetected =
    normalized.includes(" ai ") ||
    normalized.includes(" ml ") ||
    normalized.includes("machine learning") ||
    normalized.includes("deep learning") ||
    normalized.includes("artificial intelligence") ||
    normalized.includes("llm");
  return {
    ai: aiDetected,
  };
}

function updateSkillFocus(text) {
  if (!text) {
    return;
  }
  const focus = detectSkillFocus(text);
  state.skillFocus.ai = state.skillFocus.ai || focus.ai;
}

function titleCase(text) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Ignore storage failures in restricted contexts.
  }
}

function getInitialPremiumStatus() {
  const stored = safeStorageGet(PREMIUM_STORAGE_KEY);
  return stored === "true";
}

function setPremiumStatus(enabled) {
  state.isPremium = enabled;
  safeStorageSet(PREMIUM_STORAGE_KEY, enabled ? "true" : "false");
}

function getInitialTheme() {
  const stored = safeStorageGet(THEME_STORAGE_KEY);
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
  themeToggle.setAttribute("aria-pressed", theme === "dark");
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  safeStorageSet(THEME_STORAGE_KEY, theme);
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
  if (
    normalized.includes("market") ||
    normalized.includes("salary") ||
    normalized.includes("trend") ||
    normalized.includes("hiring") ||
    normalized.includes("demand") ||
    normalized.includes("outlook")
  ) {
    return "market";
  }
  if (
    normalized.includes("skill") ||
    normalized.includes("ai") ||
    normalized.includes("ml") ||
    normalized.includes("machine learning")
  ) {
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
  if (
    normalized.includes("refresh skills") ||
    normalized.includes("new skills") ||
    normalized.includes("more skills")
  ) {
    return "refresh-skills";
  }
  if (
    normalized.includes("premium") ||
    normalized.includes("upgrade") ||
    normalized.includes("unlock")
  ) {
    return "premium";
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

function markLatestPrompt(element) {
  if (latestPromptElement) {
    latestPromptElement.classList.remove("prompt-highlight");
  }
  latestPromptElement = element;
}

function jumpToLatestPrompt() {
  if (latestPromptElement) {
    latestPromptElement.scrollIntoView({ behavior: "smooth", block: "end" });
    latestPromptElement.classList.add("prompt-highlight");
    setTimeout(() => {
      latestPromptElement?.classList.remove("prompt-highlight");
    }, 900);
  }
  scrollToBottom();
  focusInput(true);
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
    if (option.value === "premium") {
      button.classList.add("premium");
    }
    button.textContent = option.label;
    button.addEventListener("click", () => {
      if (isBotTyping) {
        return;
      }
      jumpToLatestPrompt();
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
  markLatestPrompt(bubble);
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

function queueMarketInsights() {
  enqueueBotAction(async () => {
    isBotTyping = true;
    setInputEnabled(false);
    const indicator = createTypingIndicator();
    try {
      const delay = getTypingDelay("Fetching market insights...", 520);
      await pause(delay);
      const insights = await fetchMarketInsights(
        state.disciplineKey || "general",
        state.locationLabel || "All locations"
      );
      indicator.remove();
      showMarketInsights(insights);
    } finally {
      indicator.remove();
      isBotTyping = false;
      setInputEnabled(true);
      focusInput();
    }
  });
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
      : state.mode === "market"
      ? "Market snapshot"
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
      { label: "Market snapshot", value: "market" },
      { label: "See skills in demand", value: "skills" },
      { label: "Start a new search", value: "restart" },
    ])
  );
  markLatestPrompt(bubble);
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

function getRotatingSkills(disciplineKey, count = 5) {
  const base = SKILLS_BY_DISCIPLINE[disciplineKey] || SKILLS_BY_DISCIPLINE.general;
  const extra =
    EXTRA_SKILLS_BY_DISCIPLINE[disciplineKey] ||
    EXTRA_SKILLS_BY_DISCIPLINE.general;
  const combined = [...base, ...extra];
  if (combined.length <= count) {
    return combined;
  }
  const cursor = state.skillCursor[disciplineKey] || 0;
  const selected = [];
  for (let i = 0; i < count; i += 1) {
    selected.push(combined[(cursor + i) % combined.length]);
  }
  state.skillCursor[disciplineKey] = (cursor + count) % combined.length;
  return selected;
}

function buildMarketQuery(disciplineKey, locationLabel) {
  const baseQuery =
    MARKET_QUERY_BY_DISCIPLINE[disciplineKey] || disciplineKey || "jobs";
  if (
    locationLabel &&
    locationLabel !== "All locations" &&
    locationLabel !== "all locations"
  ) {
    return `${baseQuery} ${locationLabel}`;
  }
  return baseQuery;
}

function summarizeTop(items, field, limit = 4) {
  const counts = new Map();
  items.forEach((item) => {
    const value = item?.[field];
    if (!value) {
      return;
    }
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([value]) => value);
}

function buildFallbackInsights(disciplineKey) {
  const fallback = MARKET_FALLBACK[disciplineKey] || MARKET_FALLBACK.general;
  return {
    mode: "fallback",
    source: "Curated snapshot",
    roles: fallback.roles,
    trends: fallback.trends,
    skills: fallback.skills,
  };
}

async function fetchMarketInsights(disciplineKey, locationLabel) {
  const query = buildMarketQuery(disciplineKey, locationLabel);
  if (!MARKET_API.enabled) {
    return {
      ...buildFallbackInsights(disciplineKey),
      query,
      note: "Live market API is disabled due to access restrictions. Showing a curated snapshot instead.",
    };
  }

  try {
    const url = new URL(MARKET_API.endpoint);
    url.searchParams.set("search", query);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Market API error: ${response.status}`);
    }
    const data = await response.json();
    const jobs = Array.isArray(data.jobs) ? data.jobs : [];
    if (jobs.length === 0) {
      throw new Error("No market results returned.");
    }
    const topTitles = summarizeTop(jobs, "title");
    const topCompanies = summarizeTop(jobs, "company_name");
    return {
      mode: "live",
      source: "Remotive (remote roles)",
      query,
      total: jobs.length,
      topTitles,
      topCompanies,
    };
  } catch (error) {
    return {
      ...buildFallbackInsights(disciplineKey),
      query,
      note: "Live market API is unreachable. Showing a curated snapshot instead. You can configure MARKET_API in app.js for live data.",
    };
  }
}

function showMarketInsights(insights) {
  const bubble = createMessageBubble("bot");
  const header = document.createElement("p");
  const disciplineLabel = state.disciplineLabel || "your discipline";
  const locationLabel = state.locationLabel || "all locations";
  header.textContent = `Market snapshot for ${disciplineLabel} (${locationLabel})`;
  bubble.appendChild(header);

  const source = document.createElement("p");
  source.className = "note";
  source.textContent = `Source: ${insights.source} • Query: ${insights.query}`;
  bubble.appendChild(source);

  const list = document.createElement("ul");
  list.className = "skills-list";

  if (insights.mode === "live") {
    const totalItem = document.createElement("li");
    totalItem.textContent = `Open roles matched: ${insights.total}`;
    list.appendChild(totalItem);

    if (insights.topTitles?.length) {
      const titlesItem = document.createElement("li");
      titlesItem.textContent = `Common titles: ${insights.topTitles.join(", ")}`;
      list.appendChild(titlesItem);
    }

    if (insights.topCompanies?.length) {
      const companiesItem = document.createElement("li");
      companiesItem.textContent = `Companies hiring: ${insights.topCompanies.join(
        ", "
      )}`;
      list.appendChild(companiesItem);
    }
  } else {
    const rolesItem = document.createElement("li");
    rolesItem.textContent = `Typical roles: ${insights.roles.join(", ")}`;
    list.appendChild(rolesItem);

    const trendsItem = document.createElement("li");
    trendsItem.textContent = `Current trends: ${insights.trends.join(", ")}`;
    list.appendChild(trendsItem);

    const skillsItem = document.createElement("li");
    skillsItem.textContent = `Skills gaining demand: ${insights.skills.join(
      ", "
    )}`;
    list.appendChild(skillsItem);
  }

  bubble.appendChild(list);

  if (insights.note) {
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = insights.note;
    bubble.appendChild(note);
  }

  bubble.appendChild(
    createOptions([
      { label: "Change location", value: "change-location" },
      { label: "Change study area", value: "change-discipline" },
      { label: "Find internships and grad programs", value: "internships" },
      { label: "Find jobs", value: "jobs" },
      { label: "Interview practice", value: "interview" },
      { label: "See skills in demand", value: "skills" },
      { label: "Start a new search", value: "restart" },
    ])
  );
  markLatestPrompt(bubble);
  scrollToBottom();
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
  const disciplineKey = state.disciplineKey || "general";
  const skills = getRotatingSkills(disciplineKey, 5);
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

  if (state.skillFocus.ai) {
    const aiHeader = document.createElement("p");
    aiHeader.className = "note";
    aiHeader.textContent = "AI/ML focus add-ons:";
    bubble.appendChild(aiHeader);

    const aiList = document.createElement("ul");
    aiList.className = "skills-list";
    AI_ML_FOCUS_SKILLS.forEach((item) => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = `${item.skill}: `;
      li.appendChild(strong);
      li.appendChild(
        document.createTextNode(`${item.why} Improve by ${item.improve}`)
      );
      if (state.isPremium && item.resources?.length) {
        const resourceList = document.createElement("ul");
        resourceList.className = "skills-list";
        item.resources.forEach((resource) => {
          const resourceItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = resource.url;
          link.target = "_blank";
          link.rel = "noreferrer";
          link.textContent = resource.label;
          resourceItem.appendChild(link);
          resourceList.appendChild(resourceItem);
        });
        li.appendChild(resourceList);
      }
      aiList.appendChild(li);
    });
    bubble.appendChild(aiList);
  }

  const note = document.createElement("p");
  note.className = "note";
  note.textContent = `Location focus: ${
    state.locationLabel || "any location"
  }. Keep this list updated in app.js to stay current.`;
  bubble.appendChild(note);

  const options = [
    { label: "Refresh skills", value: "refresh-skills" },
    { label: "Change location", value: "change-location" },
    { label: "Change study area", value: "change-discipline" },
    { label: "Market snapshot", value: "market" },
    { label: "Interview practice", value: "interview" },
    { label: "Start a new search", value: "restart" },
    { label: "Find internships and grad programs", value: "internships" },
    { label: "Find jobs", value: "jobs" },
  ];

  const resources =
    PREMIUM_RESOURCES_BY_DISCIPLINE[state.disciplineKey || "general"] ||
    PREMIUM_RESOURCES_BY_DISCIPLINE.general;
  if (state.isPremium && resources?.length) {
    const resourceHeader = document.createElement("p");
    resourceHeader.className = "note";
    resourceHeader.textContent = "Premium learning resources:";
    bubble.appendChild(resourceHeader);

    const resourceList = document.createElement("ul");
    resourceList.className = "skills-list";
    resources.forEach((resource) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = resource.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = resource.label;
      li.appendChild(link);
      resourceList.appendChild(li);
    });
    bubble.appendChild(resourceList);
  } else {
    const premiumNote = document.createElement("p");
    premiumNote.className = "note";
    premiumNote.textContent = `Video resources are a premium add-on ($${PREMIUM.price}).`;
    bubble.appendChild(premiumNote);
    options.unshift({
      label: `Unlock video resources ($${PREMIUM.price})`,
      value: "premium",
    });
  }

  bubble.appendChild(createOptions(options));
  markLatestPrompt(bubble);
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
      { label: "Market snapshot", value: "market" },
      { label: "Find internships and grad programs", value: "internships" },
      { label: "Find jobs", value: "jobs" },
      { label: "See skills in demand", value: "skills" },
      { label: "Start a new search", value: "restart" },
    ])
  );
  markLatestPrompt(bubble);
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

  if (state.mode === "market") {
    queueMarketInsights();
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
      "I can help with internships, graduate programs, jobs, interview practice, market snapshots, or in-demand skills. How can I help?",
      buildOptions(HELP_OPTIONS)
    );
    return;
  }
  state.mode = intent;
  askForStudy();
}

function handleStudyResponse(text) {
  updateSkillFocus(text);
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
  updateSkillFocus(text);
  const intent = detectIntent(text);
  if (!intent) {
    queueBotMessage(
      "Please choose a job type to continue.",
      buildOptions(JOB_TYPE_OPTIONS)
    );
    return;
  }
  state.mode = intent;
  if (intent === "skills" || intent === "interview" || intent === "market") {
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

function handlePremiumAction() {
  if (state.isPremium) {
    queueBotMessage("Premium is already unlocked. Enjoy the extra resources!");
    return;
  }
  if (PREMIUM.demoUnlock) {
    setPremiumStatus(true);
    queueBotMessage(
      `Premium unlocked for preview. Video resources are now available for $${PREMIUM.price}.`
    );
    if (state.mode === "skills") {
      showResults();
    }
    return;
  }
  queueBotMessage(
    `Premium resources cost $${PREMIUM.price}. Checkout is not configured yet.`
  );
}

function handleMarketRequest(text) {
  state.mode = "market";
  const disciplineGuess = resolveDiscipline(text);
  if (disciplineGuess.recognized) {
    applyDiscipline(disciplineGuess);
  }
  const locationGuess = resolveLocation(text);
  if (locationGuess.matched) {
    applyLocation(locationGuess);
  }
  if (!state.disciplineKey) {
    askForStudy();
    return true;
  }
  if (!state.locationKey) {
    askForLocation();
    return true;
  }
  showResults();
  return true;
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

  updateSkillFocus(text);
  const action = detectAction(text);
  if (action === "premium") {
    handlePremiumAction();
    return;
  }
  if (action === "refresh-skills") {
    state.mode = "skills";
    showResults();
    return;
  }

  const globalIntent = detectIntent(text);
  if (globalIntent === "market" && state.step !== "results") {
    handleMarketRequest(text);
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
    if (action === "refresh-skills") {
      state.mode = "skills";
      showResults();
      return;
    }
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
    if (intent === "market") {
      state.mode = "market";
      const locationGuess = resolveLocation(text);
      if (locationGuess.matched) {
        applyLocation(locationGuess);
      }
      const disciplineGuess = resolveDiscipline(text);
      if (disciplineGuess.recognized) {
        applyDiscipline(disciplineGuess);
      }
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
      "Want to refine your search? You can switch job type, change location, update your study area, or ask for a market snapshot.",
      buildOptions([
        { label: "Switch job type", value: "change-type" },
        { label: "Change location", value: "change-location" },
        { label: "Change study area", value: "change-discipline" },
        { label: "Market snapshot", value: "market" },
        { label: "See skills in demand", value: "skills" },
        { label: "Start a new search", value: "restart" },
      ])
    );
  }
}

function scrollToBottom() {
  chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
}

function startConversation() {
  chat.innerHTML = "";
  botQueue = Promise.resolve();
  isBotTyping = false;
  latestPromptElement = null;
  setInputEnabled(true);
  state.isPremium = getInitialPremiumStatus();
  state.step = "help";
  state.mode = null;
  state.disciplineKey = null;
  state.disciplineLabel = null;
  state.disciplineRecognized = false;
  state.locationKey = null;
  state.locationLabel = null;
  state.locationMatched = false;
  state.skillFocus = { ai: false };
  state.skillCursor = {};

  queueBotMessage(
    "Hi! Type in the box below or tap a button to find internships, graduate programs, jobs, market snapshots, or interview practice. How can I help?",
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
