// ============================================================
// EVENT CONFIGURATION — Edit this file to update all content
// ============================================================

export const EVENT_CONFIG = {
  // ── Basic Info ──────────────────────────────────────────────
  name: "XYZ",
  tagline: "Machine Learning Prediction Challenge",
  description:
    "Engineer intelligent prediction models using real-world datasets. Compete, iterate, and present against the sharpest minds in data science.",
  organizer: "Data Analytics Club",
  year: new Date().getFullYear(),

  // ── Contact ──────────────────────────────────────────────────
  contact: {
    email: "dac@college.edu",
    phone: "+91 98765 43210",
    location: "Data Science Lab, Block A, College Campus",
    socialLinks: {
      twitter: "https://twitter.com/dac_club",
      linkedin: "https://linkedin.com/company/dac-club",
      instagram: "https://instagram.com/dac_club",
      github: "https://github.com/dac-club",
    },
  },

  // ── Navigation ───────────────────────────────────────────────
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Problem Statements", href: "#problem-statements" },
    { label: "Timeline", href: "#timeline" },
    { label: "Prizes", href: "#prizes" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  // ── Stats (Hero) ─────────────────────────────────────────────
  stats: [
    { label: "Participants", value: "500+" },
    { label: "Prize Pool", value: "₹50K" },
    { label: "Problem Sets", value: "4" },
    { label: "Days", value: "35" },
  ],

  // ── About ────────────────────────────────────────────────────
  about: {
    heading: "What is XYZ?",
    body: "A premier machine learning competition designed by the Data Analytics Club to challenge your analytical and predictive modelling skills using real-world data.",
    specs: [
      { key: "Format", value: "Individual or Team (≤ 3 members)" },
      { key: "Domain", value: "Supervised ML · Time Series · Anomaly Detection" },
      { key: "Evaluation", value: "Model Score (70%) · Presentation (30%)" },
      { key: "Duration", value: "35-day competition window" },
    ],
  },

  // ── Why Participate ───────────────────────────────────────────
  whyParticipate: [
    {
      number: "01",
      title: "Real-World Data",
      description: "Work with industry-sourced datasets that go beyond textbook examples.",
    },
    {
      number: "02",
      title: "Expert Mentorship",
      description: "Access office hours with faculty researchers and industry data scientists.",
    },
    {
      number: "03",
      title: "Showcase Your Work",
      description: "Present your solution to a jury of academic and industry judges.",
    },
    {
      number: "04",
      title: "Career Advantage",
      description: "Winners gain direct referrals to internship and research opportunities.",
    },
  ],

  // ── Problem Statements ──────────────────────────────────────
  // ✏️ Edit these cards from this single file
  problemStatements: [
    {
      id: 1,
      title: "House Price Prediction",
      category: "Regression",
      difficulty: "Beginner",
      description:
        "Predict residential property prices using structured tabular data — location features, amenities, and historical market trends.",
      tags: ["XGBoost", "Feature Engineering", "SHAP"],
      specs: [
        { key: "Metric", value: "RMSE" },
        { key: "Data", value: "Structured tabular" },
      ],
    },
    {
      id: 2,
      title: "Customer Churn Prediction",
      category: "Classification",
      difficulty: "Intermediate",
      description:
        "Build a binary classifier to flag customers at risk of leaving a subscription service, enabling proactive retention actions.",
      tags: ["LightGBM", "Imbalanced Data", "Calibration"],
      specs: [
        { key: "Metric", value: "F1-Score" },
        { key: "Data", value: "Tabular + temporal" },
      ],
    },
    {
      id: 3,
      title: "Fraud Detection",
      category: "Anomaly Detection",
      difficulty: "Advanced",
      description:
        "Identify fraudulent financial transactions in a highly skewed dataset under strict false-positive constraints.",
      tags: ["Isolation Forest", "SMOTE", "Ensemble"],
      specs: [
        { key: "Metric", value: "Precision-Recall AUC" },
        { key: "Data", value: "Transaction logs" },
      ],
    },
    {
      id: 4,
      title: "Sales Forecasting",
      category: "Time Series",
      difficulty: "Intermediate",
      description:
        "Forecast multi-step ahead retail sales across product categories using temporal patterns and external regressors.",
      tags: ["Prophet", "LSTM", "Lag Features"],
      specs: [
        { key: "Metric", value: "MAPE" },
        { key: "Data", value: "Time series" },
      ],
    },
  ],

  // ── Timeline ─────────────────────────────────────────────────
  timeline: [
    { date: "Aug 1", title: "Registration Opens", description: "Portal opens for individual and team registrations.", index: "01" },
    { date: "Aug 15", title: "Dataset Release", description: "Training datasets and full problem statement details published.", index: "02" },
    { date: "Aug 15 – Sep 5", title: "Development Phase", description: "Intensive 21-day model development and experimentation window.", index: "03" },
    { date: "Sep 5", title: "Submission Deadline", description: "Final model files, notebooks, and reports due at 23:59 IST.", index: "04" },
    { date: "Sep 10", title: "Presentations", description: "Top 10 shortlisted teams present to the judges panel.", index: "05" },
    { date: "Sep 12", title: "Results & Awards", description: "Winners announced; prizes and certificates distributed.", index: "06" },
  ],

  // ── Prizes ────────────────────────────────────────────────────
  prizes: [
    {
      rank: "1st Place",
      amount: "₹25,000",
      perks: ["Gold medal", "Industry referral letter", "Research publication opportunity", "Internship fast-track"],
      accent: "blue",
    },
    {
      rank: "2nd Place",
      amount: "₹15,000",
      perks: ["Silver medal", "Certificate of excellence", "Mentorship session"],
      accent: "purple",
    },
    {
      rank: "3rd Place",
      amount: "₹10,000",
      perks: ["Bronze medal", "Certificate of excellence"],
      accent: "indigo",
    },
  ],

  // ── FAQ ──────────────────────────────────────────────────────
  faq: [
    {
      question: "Who can participate?",
      answer: "Any currently enrolled undergraduate or postgraduate student can participate. You must register with a valid college email address.",
    },
    {
      question: "Can teams participate?",
      answer: "Yes. Teams of up to 3 members are allowed. Each member must register individually using the same team name on the form.",
    },
    {
      question: "What tools and libraries are allowed?",
      answer: "Python-based ML frameworks (scikit-learn, TensorFlow, PyTorch, XGBoost, LightGBM, etc.) are fully permitted. R is allowed. Pre-trained LLMs applied directly to competition data are not.",
    },
    {
      question: "How are submissions evaluated?",
      answer: "Submissions are scored on a held-out test set using task-specific metrics (RMSE, F1-score, etc.). Methodology and presentation account for 30% of the final score.",
    },
    {
      question: "Is there a registration fee?",
      answer: "No. XYZ is completely free to participate in for all registered students.",
    },
    {
      question: "Will datasets be provided?",
      answer: "Yes. Official datasets are provided on Dataset Release day. Participants may supplement with publicly available external data unless specified otherwise per problem statement.",
    },
  ],

  // ── Downloads ────────────────────────────────────────────────
  downloads: {
    dataset: "/api/downloads/dataset",
    rulebook: "/api/downloads/rulebook",
  },
};

export type ProblemStatement = (typeof EVENT_CONFIG.problemStatements)[0];
export type TimelineEvent = (typeof EVENT_CONFIG.timeline)[0];
export type FAQItem = (typeof EVENT_CONFIG.faq)[0];
export type Prize = (typeof EVENT_CONFIG.prizes)[0];
