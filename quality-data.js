window.qualityDiagnostic = {
  stages: [
    {
      value: 1,
      name: "Uncertainty",
      summary: "Quality is not yet managed as a formal business discipline. Problems are accepted as part of doing business."
    },
    {
      value: 2,
      name: "Awakening",
      summary: "Management recognizes quality problems and begins to see the need for improvement, but methods remain inconsistent."
    },
    {
      value: 3,
      name: "Enlightenment",
      summary: "Quality improvement is organized, cost of quality is better understood, and management starts using prevention-oriented practices."
    },
    {
      value: 4,
      name: "Wisdom",
      summary: "Quality management is disciplined, prevention is normal, and teams use mature problem-solving and improvement routines."
    },
    {
      value: 5,
      name: "Certainty",
      summary: "Quality is embedded in management thinking. Prevention, measurement, and continuous improvement are part of how the business runs."
    }
  ],
  categories: [
    {
      id: "management",
      name: "Management Understanding and Attitude",
      prompt: "How does leadership understand and act on quality?",
      recommendation: "Start with quality leadership alignment. Clarify the business impact of quality, define expected leader behaviors, and connect quality to customer and financial outcomes.",
      academyPath: "Quality Academy: Quality Leadership, Cost of Quality, Risk-Based Thinking",
      choices: [
        "Quality is mostly viewed as inspection, rework, or the quality department's responsibility.",
        "Leaders recognize quality issues but mainly react when problems become visible.",
        "Management supports quality improvement and begins using data to guide decisions.",
        "Leaders actively manage quality as a prevention system and coach others to do the same.",
        "Quality is part of strategic and daily leadership decisions across the business."
      ]
    },
    {
      id: "organization",
      name: "Quality Organization Status",
      prompt: "How is quality responsibility organized across the company?",
      recommendation: "Move quality responsibility closer to where decisions are made. Build shared quality knowledge among supervisors, engineering, purchasing, and leaders.",
      academyPath: "Quality Academy: Quality Planning, Internal Auditing, Supplier Quality, Customer Quality",
      choices: [
        "Quality responsibility is unclear or concentrated in a small quality function.",
        "A quality function exists, but it often works separately from operations and engineering.",
        "Quality responsibilities are becoming clearer across functions and processes.",
        "Quality is integrated into operations, engineering, purchasing, and management routines.",
        "Quality ownership is broadly shared and built into the operating system."
      ]
    },
    {
      id: "problem-handling",
      name: "Problem Handling",
      prompt: "How does the organization respond to quality problems?",
      recommendation: "Standardize root cause and corrective action. Coach teams to define problems, verify causes, test countermeasures, and prevent recurrence.",
      academyPath: "Quality Academy: Root Cause Analysis, CAPA, Problem Solving Workshop",
      choices: [
        "Problems are handled through firefighting, sorting, rework, or customer appeasement.",
        "The company reacts faster than before, but fixes often address symptoms.",
        "Teams use structured problem-solving on important issues, with mixed consistency.",
        "Root cause and corrective action are disciplined, verified, and reviewed.",
        "Problems are prevented through strong feedback loops, learning, and process control."
      ]
    },
    {
      id: "cost-of-quality",
      name: "Cost of Quality",
      prompt: "How well does the company understand the cost of poor quality?",
      recommendation: "Build a practical cost-of-quality view. Start with visible scrap, rework, complaints, returns, premium freight, inspection burden, and prevention costs.",
      academyPath: "Quality Academy: Cost of Quality, Delivered Quality, Basic Data Analysis",
      choices: [
        "Quality costs are unknown or treated as unavoidable operating noise.",
        "Some obvious costs are tracked, but the full cost of poor quality is unclear.",
        "Cost of quality is measured in selected areas and used in some decisions.",
        "Cost of quality is visible, reviewed, and linked to improvement priorities.",
        "Cost of quality is a normal management metric used to prevent waste and protect customers."
      ]
    },
    {
      id: "improvement-actions",
      name: "Quality Improvement Actions",
      prompt: "How are quality improvements selected and sustained?",
      recommendation: "Create a focused quality improvement plan. Prioritize a few issues, assign owners, set review cadence, and sustain gains through standards and audits.",
      academyPath: "Quality Academy: Corrective and Preventive Action, Quality Planning, Internal Auditing",
      choices: [
        "Improvement is sporadic and usually starts after a major issue.",
        "Improvement actions are launched, but follow-through and sustainment are inconsistent.",
        "Improvement projects are selected and tracked, though capability varies by team.",
        "Improvement actions are prioritized, resourced, verified, and sustained.",
        "Prevention-focused improvement is continuous and integrated into business planning."
      ]
    },
    {
      id: "company-posture",
      name: "Company Quality Posture",
      prompt: "Which statement best describes the overall quality culture?",
      recommendation: "Use the diagnostic profile to set a quality maturity roadmap. Build the next layer of capability without adding bureaucracy the business cannot sustain.",
      academyPath: "Quality Academy roadmap plus targeted assessments and fractional leadership support",
      choices: [
        "Quality is a recurring struggle and customer issues are a normal part of operations.",
        "The company knows quality must improve but has not yet built a reliable system.",
        "The company is building quality discipline and can point to meaningful progress.",
        "Quality practices are mature, cross-functional, and consistently reinforced.",
        "The company is confident in its quality system and uses it as a competitive advantage."
      ]
    }
  ]
};
