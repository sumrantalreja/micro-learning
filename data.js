/* ============================================================
   LEARNAI — Course & Cohort Data
   ============================================================ */
const COHORTS = [
  {
    id: 'grad',
    icon: '🎓',
    title: 'Fresh Graduate',
    subtitle: 'Break into AI roles',
    desc: 'Land your first AI/ML job in 90 days with a verified portfolio and interview prep.',
    techRequired: true,
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
    tags: ['Entry Level','Job Ready','Portfolio'],
    path: 'AI Career Launchpad',
    tagline: 'Land your first AI role in 90 days',
    modules: [
      {
        id: 'g1', title: 'AI Fundamentals', icon: '🤖', color: '#3B82F6',
        free: true, lessons: [
          { id:'g1l1', title:'What is AI & Machine Learning?',        dur:'8 min',  free:true,  done:true  },
          { id:'g1l2', title:'Types of AI: Narrow vs General vs AGI', dur:'6 min',  free:true,  done:true  },
        ]
      },
      {
        id: 'g2', title: 'Python for AI', icon: '🐍', color: '#10B981',
        free: false, lessons: [
          { id:'g2l1', title:'Python Crash Course for AI',            dur:'10 min', free:true,  done:false },
          { id:'g2l2', title:'NumPy & Pandas Essentials',             dur:'12 min', free:false, done:false },
          { id:'g2l3', title:'Data Visualisation with Matplotlib',    dur:'9 min',  free:false, done:false },
        ]
      },
      {
        id: 'g3', title: 'Machine Learning Basics', icon: '📊', color: '#8B5CF6',
        free: false, lessons: [
          { id:'g3l1', title:'Supervised vs Unsupervised Learning',   dur:'11 min', free:false, done:false },
          { id:'g3l2', title:'Training Your First Model',             dur:'14 min', free:false, done:false },
          { id:'g3l3', title:'Evaluation Metrics That Matter',        dur:'8 min',  free:false, done:false },
          { id:'g3l4', title:'Overfitting & Regularisation',          dur:'10 min', free:false, done:false },
        ]
      },
      {
        id: 'g4', title: 'Portfolio Projects', icon: '🏗️', color: '#F59E0B',
        free: false, lessons: [
          { id:'g4l1', title:'Building a Sentiment Analyser',         dur:'18 min', free:false, done:false },
          { id:'g4l2', title:'Image Classifier from Scratch',         dur:'20 min', free:false, done:false },
          { id:'g4l3', title:'Deploy Your Model on Hugging Face',     dur:'15 min', free:false, done:false },
        ]
      },
      {
        id: 'g5', title: 'Interview Prep', icon: '💼', color: '#EF4444',
        free: false, lessons: [
          { id:'g5l1', title:'Top 20 ML Interview Questions',         dur:'12 min', free:false, done:false },
          { id:'g5l2', title:'Live Mock Interview Session',           dur:'30 min', free:false, done:false },
        ]
      }
    ]
  },
  {
    id: 'nontech',
    icon: '⚡',
    title: 'Working Professional',
    subtitle: 'No coding. Just results.',
    desc: 'Use AI to 10× your output in Marketing, HR, Finance, or Ops — zero coding, zero jargon. Just tools that work.',
    techRequired: false,
    color: '#10B981',
    gradient: 'linear-gradient(135deg,#059669,#10B981)',
    tags: ['No Code','Productivity','Tools'],
    path: 'AI Power User',
    tagline: 'Become the AI expert in your team',
    modules: [
      {
        id: 'n1', title: 'AI Tools Overview', icon: '🛠️', color: '#10B981',
        free: true, lessons: [
          { id:'n1l1', title:'AI Tools Landscape 2024',               dur:'7 min',  free:true,  done:true  },
          { id:'n1l2', title:'Choosing the Right AI Tool for Your Job',dur:'8 min', free:true,  done:true  },
        ]
      },
      {
        id: 'n2', title: 'ChatGPT & Prompt Engineering', icon: '💬', color: '#8B5CF6',
        free: false, lessons: [
          { id:'n2l1', title:'Prompt Engineering 101',                dur:'9 min',  free:true,  done:false },
          { id:'n2l2', title:'Advanced Prompting Techniques',         dur:'11 min', free:false, done:false },
          { id:'n2l3', title:'Building a Prompt Library',             dur:'8 min',  free:false, done:false },
        ]
      },
      {
        id: 'n3', title: 'AI for Your Industry', icon: '🏢', color: '#F59E0B',
        free: false, lessons: [
          { id:'n3l1', title:'AI in Marketing & Content',             dur:'10 min', free:false, done:false },
          { id:'n3l2', title:'AI in Finance & Analysis',              dur:'10 min', free:false, done:false },
          { id:'n3l3', title:'AI in HR & Recruiting',                 dur:'9 min',  free:false, done:false },
          { id:'n3l4', title:'AI in Project Management',              dur:'8 min',  free:false, done:false },
        ]
      },
      {
        id: 'n4', title: 'Automating Your Workflow', icon: '🔄', color: '#06B6D4',
        free: false, lessons: [
          { id:'n4l1', title:'Zapier + AI: Workflow Automation',      dur:'12 min', free:false, done:false },
          { id:'n4l2', title:'No-Code AI Apps with Make.com',         dur:'14 min', free:false, done:false },
          { id:'n4l3', title:'AI Agents for Repetitive Tasks',        dur:'11 min', free:false, done:false },
        ]
      },
      {
        id: 'n5', title: 'AI Strategy & Leadership', icon: '🎯', color: '#EF4444',
        free: false, lessons: [
          { id:'n5l1', title:'Building an AI-First Mindset',          dur:'9 min',  free:false, done:false },
          { id:'n5l2', title:'Presenting AI ROI to Leadership',       dur:'10 min', free:false, done:false },
        ]
      }
    ]
  },
  {
    id: 'switcher',
    icon: '🔄',
    title: 'Career Switcher',
    subtitle: 'Move into AI engineering',
    desc: 'Transition from dev / analyst / data roles into AI Engineering with a solid technical foundation.',
    techRequired: true,
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg,#6D28D9,#8B5CF6)',
    tags: ['Technical','LLMs','Engineering'],
    path: 'AI Engineering Transition',
    tagline: 'Go from code to AI products in 12 weeks',
    modules: [
      {
        id: 's1', title: 'Modern AI Stack', icon: '🏗️', color: '#8B5CF6',
        free: true, lessons: [
          { id:'s1l1', title:'LLMs: How They Actually Work',          dur:'10 min', free:true,  done:true  },
          { id:'s1l2', title:'The AI Engineering Landscape',          dur:'8 min',  free:true,  done:true  },
        ]
      },
      {
        id: 's2', title: 'LLM APIs & Integration', icon: '🔌', color: '#3B82F6',
        free: false, lessons: [
          { id:'s2l1', title:'OpenAI API Deep Dive',                  dur:'12 min', free:true,  done:false },
          { id:'s2l2', title:'Anthropic Claude API & Best Practices', dur:'11 min', free:false, done:false },
          { id:'s2l3', title:'RAG: Retrieval Augmented Generation',   dur:'14 min', free:false, done:false },
        ]
      },
      {
        id: 's3', title: 'Building AI Products', icon: '🚀', color: '#10B981',
        free: false, lessons: [
          { id:'s3l1', title:'LangChain & LlamaIndex',                dur:'15 min', free:false, done:false },
          { id:'s3l2', title:'Vector Databases Explained',            dur:'12 min', free:false, done:false },
          { id:'s3l3', title:'Building a Production RAG Pipeline',    dur:'20 min', free:false, done:false },
          { id:'s3l4', title:'Evals: Testing AI Application Quality', dur:'12 min', free:false, done:false },
        ]
      },
      {
        id: 's4', title: 'MLOps & Deployment', icon: '⚙️', color: '#F59E0B',
        free: false, lessons: [
          { id:'s4l1', title:'Containerising AI Apps with Docker',    dur:'13 min', free:false, done:false },
          { id:'s4l2', title:'CI/CD for ML Models',                   dur:'11 min', free:false, done:false },
          { id:'s4l3', title:'Monitoring LLM Apps in Production',     dur:'10 min', free:false, done:false },
        ]
      },
      {
        id: 's5', title: 'System Design for AI', icon: '📐', color: '#EF4444',
        free: false, lessons: [
          { id:'s5l1', title:'Designing Scalable AI Systems',         dur:'14 min', free:false, done:false },
          { id:'s5l2', title:'AI System Design Interview Prep',       dur:'18 min', free:false, done:false },
        ]
      }
    ]
  },
  {
    id: 'entrepreneur',
    icon: '🚀',
    title: 'Entrepreneur',
    subtitle: 'Ship AI products, no deep tech',
    desc: 'Build, launch, and monetise AI products — from MVP to paying customers. No deep tech or coding background required.',
    techRequired: false,
    color: '#F97316',
    gradient: 'linear-gradient(135deg,#EA580C,#F97316)',
    tags: ['No-Code MVP','Product','Revenue'],
    path: 'AI Business Builder',
    tagline: 'Ship your first AI product in 30 days',
    modules: [
      {
        id: 'e1', title: 'AI Business Opportunities', icon: '💡', color: '#F97316',
        free: true, lessons: [
          { id:'e1l1', title:'$100K AI Business Ideas in 2024',       dur:'9 min',  free:true,  done:true  },
          { id:'e1l2', title:'Validating Your AI Product Idea',       dur:'8 min',  free:true,  done:true  },
        ]
      },
      {
        id: 'e2', title: 'Building AI MVPs', icon: '🔨', color: '#8B5CF6',
        free: false, lessons: [
          { id:'e2l1', title:'AI MVP in a Weekend',                   dur:'12 min', free:true,  done:false },
          { id:'e2l2', title:'No-Code AI with Bubble + OpenAI',       dur:'14 min', free:false, done:false },
          { id:'e2l3', title:'Deploying with Vercel & Railway',       dur:'10 min', free:false, done:false },
        ]
      },
      {
        id: 'e3', title: 'AI Product Strategy', icon: '🗺️', color: '#3B82F6',
        free: false, lessons: [
          { id:'e3l1', title:'Product-Led Growth for AI Tools',       dur:'10 min', free:false, done:false },
          { id:'e3l2', title:'Freemium vs Premium: Which to Choose?', dur:'9 min',  free:false, done:false },
          { id:'e3l3', title:'User Onboarding That Converts',         dur:'11 min', free:false, done:false },
          { id:'e3l4', title:'Retention Mechanics for AI Products',   dur:'10 min', free:false, done:false },
        ]
      },
      {
        id: 'e4', title: 'Monetising AI Products', icon: '💰', color: '#10B981',
        free: false, lessons: [
          { id:'e4l1', title:'Pricing Models for AI SaaS',            dur:'11 min', free:false, done:false },
          { id:'e4l2', title:'Sales Funnels for Solo Founders',       dur:'10 min', free:false, done:false },
          { id:'e4l3', title:'Cold Outreach with AI',                 dur:'8 min',  free:false, done:false },
        ]
      },
      {
        id: 'e5', title: 'Scaling AI Businesses', icon: '📈', color: '#EF4444',
        free: false, lessons: [
          { id:'e5l1', title:'When to Hire vs Automate',              dur:'9 min',  free:false, done:false },
          { id:'e5l2', title:'Fundraising for AI Startups',           dur:'12 min', free:false, done:false },
        ]
      }
    ]
  }
];

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    monthly: 0,
    annual: 0,
    desc: 'Start learning with no commitment.',
    cta: 'Get Started Free',
    ctaStyle: 'btn-outline',
    features: [
      { text: '2 free modules per course',       yes: true  },
      { text: 'Community forum access',          yes: true  },
      { text: 'Progress tracking',               yes: true  },
      { text: '1 project template',              yes: true  },
      { text: 'Full course library',             yes: false },
      { text: 'Live mentor sessions',            yes: false },
      { text: 'Course certificate',              yes: false },
      { text: 'Job board access',                yes: false },
      { text: '1-on-1 mentorship',               yes: false },
      { text: 'Placement guarantee',             yes: false },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 19,
    annual: 12,
    desc: 'Everything you need to upskill fast.',
    cta: 'Start Pro — 7 Days Free',
    ctaStyle: 'btn-primary',
    popular: true,
    features: [
      { text: '2 free modules per course',       yes: true  },
      { text: 'Community forum access',          yes: true  },
      { text: 'Progress tracking',               yes: true  },
      { text: '1 project template',              yes: true  },
      { text: 'Full course library',             yes: true  },
      { text: 'Live mentor sessions',            yes: true  },
      { text: 'Course certificate',              yes: true  },
      { text: 'Job board access',                yes: true  },
      { text: '1-on-1 mentorship',               yes: false },
      { text: 'Placement guarantee',             yes: false },
    ]
  },
  {
    id: 'proplus',
    name: 'Pro+',
    monthly: 49,
    annual: 32,
    desc: 'Guaranteed outcomes with dedicated support.',
    cta: 'Get Pro+',
    ctaStyle: 'btn-coral',
    features: [
      { text: '2 free modules per course',       yes: true  },
      { text: 'Community forum access',          yes: true  },
      { text: 'Progress tracking',               yes: true  },
      { text: '1 project template',              yes: true  },
      { text: 'Full course library',             yes: true  },
      { text: 'Live mentor sessions',            yes: true  },
      { text: 'Course certificate',              yes: true  },
      { text: 'Job board access',                yes: true  },
      { text: '1-on-1 mentorship',               yes: true  },
      { text: 'Placement guarantee',             yes: true  },
    ]
  }
];

const ROLE_SUGGESTIONS = {
  tech: [
    'Software Engineer','Data Analyst','Backend Developer','Frontend Developer',
    'Full Stack Developer','DevOps Engineer','Data Scientist','Product Manager',
    'QA Engineer','Mobile Developer','Cloud Engineer','Fresh Graduate / Student'
  ],
  nontech: [
    'Marketing Manager','HR Manager','Finance Analyst','Operations Manager',
    'Content Writer','Sales Manager','Business Analyst','Founder / CEO',
    'Project Manager','Customer Success Manager','Consultant','Educator / Teacher'
  ]
};

const ROLE_CONTEXT = {
  grad: {
    default: { why: 'land your first AI role', focus: 'Python, ML fundamentals, and portfolio projects', tag: '🎓 Career Launchpad' }
  },
  nontech: {
    'Marketing Manager':         { why: 'automate content and campaigns with AI', focus: 'prompt engineering and AI content tools', tag: '📣 Marketing AI' },
    'HR Manager':                { why: 'streamline hiring and HR ops with AI', focus: 'AI tools for HR workflows', tag: '👥 HR AI' },
    'Finance Analyst':           { why: 'accelerate financial analysis with AI', focus: 'AI for data, reporting, and forecasting', tag: '📊 Finance AI' },
    'Sales Manager':             { why: 'use AI to close more deals faster', focus: 'AI prospecting and CRM automation', tag: '💰 Sales AI' },
    'Operations Manager':        { why: 'automate repetitive ops work with AI', focus: 'workflow automation and AI agents', tag: '⚙️ Ops AI' },
    'Content Writer':            { why: 'scale your content output 10× with AI', focus: 'AI writing tools and prompt engineering', tag: '✍️ Content AI' },
    'Business Analyst':          { why: 'use AI for faster, deeper analysis', focus: 'AI tools for data and decision-making', tag: '🔍 Analysis AI' },
    'Project Manager':           { why: 'manage projects smarter with AI', focus: 'AI planning tools and task automation', tag: '📋 PM AI' },
    'Customer Success Manager':  { why: 'deliver better customer outcomes with AI', focus: 'AI for customer insights and automation', tag: '🤝 CS AI' },
    'Consultant':                { why: 'deliver AI-powered insights to clients', focus: 'AI tools and no-code automation', tag: '💼 Consulting AI' },
    default:                     { why: 'become the AI power user in your team', focus: 'AI tools and productivity workflows', tag: '⚡ AI Power User' }
  },
  switcher: {
    'Software Engineer':        { why: 'go from building apps to building AI products', focus: 'LLM APIs, RAG pipelines, and MLOps', tag: '🔌 AI Engineering' },
    'Backend Developer':        { why: 'add AI superpowers to your backend stack', focus: 'LLM integration and system design for AI', tag: '⚙️ AI Backend' },
    'Frontend Developer':       { why: 'build AI-native user experiences', focus: 'LLM APIs and AI UI patterns', tag: '🎨 AI Frontend' },
    'Full Stack Developer':     { why: 'ship end-to-end AI products', focus: 'full-stack AI development and deployment', tag: '🚀 Full-Stack AI' },
    'Data Analyst':             { why: 'level up from analysis to AI engineering', focus: 'ML models and LLM pipelines', tag: '📈 AI Analytics' },
    'Data Scientist':           { why: 'move from ML research to production AI', focus: 'LLMOps and production AI systems', tag: '🧪 Applied AI' },
    'DevOps Engineer':          { why: 'own the AI infrastructure layer', focus: 'MLOps, Docker, and model deployment', tag: '🏗️ AI Infra' },
    'Product Manager':          { why: 'build and lead AI product development', focus: 'AI product strategy and LLM prototyping', tag: '🗺️ AI Product' },
    default:                    { why: 'transition into AI engineering', focus: 'LLM APIs, vector databases, and MLOps', tag: '🔄 AI Engineering' }
  },
  entrepreneur: {
    'Founder / CEO':            { why: 'ship your first AI product and find paying customers', focus: 'AI MVPs, pricing, and go-to-market', tag: '🚀 AI Founder' },
    'Consultant':               { why: 'build AI tools and sell them to clients', focus: 'no-code AI apps and service productisation', tag: '💼 AI Consulting' },
    default:                    { why: 'build and launch a profitable AI business', focus: 'no-code AI tools and product strategy', tag: '💡 AI Builder' }
  }
};

const TESTIMONIALS = [
  {
    text: '"LearnAI got me my first ML internship in 8 weeks. The bite-sized format meant I could study during my commute. The portfolio project was what sealed the deal in my interview."',
    name: 'Priya Sharma', role: 'ML Intern @ Razorpay', avatar: 'PS', color: '#3B82F6'
  },
  {
    text: '"As a marketing manager I was intimidated by AI. The non-tech path was perfect — practical, zero jargon. I automated 40% of my weekly reporting in the first month."',
    name: 'Rahul Mehta', role: 'Marketing Manager @ Flipkart', avatar: 'RM', color: '#10B981'
  },
  {
    text: '"Switched from backend dev to AI engineering in 3 months. LearnAI\'s structured path and the LLM modules were exactly what I needed. Got a 40% salary bump."',
    name: 'Aisha Khan', role: 'AI Engineer @ Sarvam AI', avatar: 'AK', color: '#8B5CF6'
  }
];

const QUIZ = {
  question: 'What is the key difference between a Transformer and an RNN architecture?',
  options: [
    'Transformers process tokens sequentially while RNNs use attention',
    'Transformers use self-attention to process all tokens in parallel, while RNNs process sequentially',
    'RNNs are better for long-range dependencies than Transformers',
    'Transformers require more training data in all cases'
  ],
  correct: 1,
  explanation: 'Transformers use self-attention mechanisms to process all tokens simultaneously, enabling better parallelisation and capturing long-range dependencies more effectively than sequential RNNs.'
};
