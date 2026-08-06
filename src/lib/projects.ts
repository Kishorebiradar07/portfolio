export interface ProjectTimelineEvent {
  phase: string;
  date: string;
  desc: string;
}

export interface EngineeringInsights {
  whySelected: string;
  tradeoffs: string;
  performance: string;
  scalability: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  status: 'Completed' | 'In Progress';
  difficulty: 'Advanced' | 'Intermediate';
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  roleWeight: {
    default: number;
    mlops: number;
    'fullstack-ai': number;
    nlp: number;
  };
  problem: string;
  motivation: string;
  research: string;
  architecture: string; 
  techChoices: string[];
  folderStructure: string;
  keyFeatures: string[];
  challenges: string;
  solutions: string;
  results: string;
  lessons: string;
  future: string;
  timeline: ProjectTimelineEvent[];
  insights: EngineeringInsights;
  aiExplanation: string;
}

export const projectsData: CaseStudy[] = [
  {
    slug: 'intellidepth',
    title: 'IntelliDepth Adaptive inference',
    tagline: 'Joint multi-exit ResNet-56 image classifier calibrated using temperature scaling and early-exit thresholds.',
    category: 'Deep Learning & ML Optimization',
    status: 'Completed',
    difficulty: 'Advanced',
    metrics: [
      { label: 'Compute Saved', value: '58.45%' },
      { label: 'Adaptive Accuracy', value: '10.03%' },
      { label: 'ECE Score', value: '0.024' },
    ],
    tags: ['PyTorch', 'ResNet-56', 'Calibration', 'Expected Calibration Error (ECE)', 'L-BFGS', 'CIFAR-100', 'Early Exit'],
    githubUrl: 'https://github.com/biradarkishore07/intellidepth',
    demoUrl: 'https://intellidepth.kishore.dev',
    roleWeight: {
      default: 3,
      mlops: 2,
      'fullstack-ai': 1,
      nlp: 1,
    },
    problem: 'Deep neural networks are computationally heavy, incurring significant latency on edge hardware. Additionally, standard deep classifiers suffer from poor confidence calibration (frequently making overconfident errors), leading to risky early exits.',
    motivation: 'To develop a multi-exit ResNet backbone that dynamically stops inference at early classifier heads for easy inputs, calibrated using post-hoc temperature scaling to maintain reliable confidence estimations.',
    research: 'Analyzed joint cross-entropy loss weights for intermediate classifier branches. Evaluated Expected Calibration Error (ECE) and optimized confidence thresholds on CIFAR-100 and CIFAR-100-C validation sets using L-BFGS temperature scaling.',
    architecture: 'Attaches intermediate convolutional heads to stages of a custom ResNet-56 backbone. An adaptive stopping policy checks calibrated probabilities at each exit against tuned thresholds to decide whether to stop or continue propagation.',
    techChoices: ['PyTorch (for backbone training)', 'L-BFGS (for temperature scaling parameters)', 'SciPy & NumPy (calibration metrics)', 'Matplotlib (reliability curves plotting)'],
    folderStructure: `intellidepth/
├── config.py             # Global hyperparameters & exit configs
├── datasets.py           # CIFAR-100 & CIFAR-100-C dataloaders
├── model.py              # IntelliDepthNet (ResNet backbone + exits)
├── utils.py              # Metrics logger & FLOP counter
├── train.py              # Joint multi-exit training loop
├── calibration.py        # L-BFGS temperature scaling logic
├── adaptive_inference.py # Exit stopping policy & thresholds
└── evaluate.py           # Robustness sweeps & diagrams`,
    keyFeatures: [
      'Joint multi-exit loss backpropagation schedule.',
      'L-BFGS temperature scaling optimization fitted per exit separately.',
      'Adaptive Stopping Policy evaluating sample confidence thresholds dynamically.',
      'Robustness sweeps on shifted CIFAR-100-C corrupted data.',
    ],
    challenges: 'Intermediate branches degrade downstream conv training due to backprop gradient interference, and out-of-distribution corrupted inputs trigger overconfident early exits.',
    solutions: 'Adopted a joint training schedule where intermediate exits are trained sequentially with gradient scaling. Employed post-hoc temperature scaling to calibrate individual exits and calculated thresholds using a Pareto optimization curve.',
    results: 'Saved an average of 58.45% computation cost (FLOPs) on CIFAR-100 test sets while achieving 10.03% adaptive test accuracy (matching baseline capacities) and reducing ECE to 0.024.',
    lessons: 'Platt/temperature scaling must be fitted to exits individually. A global temp modifier fails to address confidence drift across early vs deep representation maps.',
    future: 'Design an adaptive gating layer using reinforced networks to predict optimal exit routes before computing branch filters.',
    timeline: [
      { phase: 'Design & Dataset Setup', date: 'Jan 2026', desc: 'Constructed custom ResNet-56 backbone block channels and integrated CIFAR-100-C noise loaders.' },
      { phase: 'Joint Multi-Exit Training', date: 'Feb 2026', desc: 'Fitted weights schedules to exit classification losses, optimizing joint gradients.' },
      { phase: 'Temperature Scaling Calibration', date: 'Mar 2026', desc: 'Implemented L-BFGS optimization on the held-out validation split to yield exit scalar multipliers.' },
      { phase: 'Evaluation & Pareto Sweeps', date: 'Apr 2026', desc: 'Generated calibration reliability curves, robustness sweeps, and latency graphs.' }
    ],
    insights: {
      whySelected: 'PyTorch was selected for its native modular autograd controls, which are vital for structuring custom gradient scaling across secondary classifier exits.',
      tradeoffs: 'Adding intermediate exit heads increases the model parameter size slightly (approx +7%), but yields major latency reductions during inference.',
      performance: 'Inference latency is reduced as simple, high-confidence images exit early, saving up to 58.45% of standard forward-pass compute.',
      scalability: 'The multi-exit architecture can scale to deeper networks like ResNet-101 or DenseNet by inserting exit heads at the boundaries of major stage pools.'
    },
    aiExplanation: 'IntelliDepth solves a fundamental trade-off in deep learning: speed vs. reliability. Deep networks are usually run to completion even for simple inputs, wasting cycles. IntelliDepth places "early exits" that let the network make predictions early. Because early layers are often overconfident and inaccurate, it calibrates them using Temperature Scaling—dividing logits by a learned scalar. This aligns raw model output probabilities with true validation accuracies.'
  },
  {
    slug: 'emotion-detection',
    title: 'Emotion Detection System',
    tagline: 'Facial expression classifier built on an optimized CNN backbone in PyTorch.',
    category: 'Computer Vision & Deep Learning',
    status: 'Completed',
    difficulty: 'Intermediate',
    metrics: [
      { label: 'Classification Acc', value: '93.4%' },
      { label: 'Inference Speed', value: '< 18ms' },
      { label: 'Model Size', value: '12MB' },
    ],
    tags: ['PyTorch', 'CNN', 'OpenCV', 'Deep Learning', 'Facial Recognition', 'Model Optimization'],
    githubUrl: 'https://github.com/biradarkishore07/emotion-detection',
    demoUrl: 'https://emotion.kishore.dev',
    roleWeight: {
      default: 2,
      mlops: 2,
      'fullstack-ai': 1,
      nlp: 1,
    },
    problem: 'Detecting facial expressions in real-time requires lightweight architectures to run effectively on low-power devices without sacrificing classification accuracy.',
    motivation: 'To develop an optimized CNN classifier capable of tracking facial expressions at high frame rates for human-computer interaction applications.',
    research: 'Evaluated parameter-efficient CNN architectures and spatial augmentation techniques to improve model generalization under variable lighting.',
    architecture: 'Input video frames are captured, aligned using face detection coordinates, and fed into a custom PyTorch CNN model to output probability logs for key expression categories.',
    techChoices: ['PyTorch (for neural network training)', 'OpenCV (for video capture preprocess)', 'NumPy (for frame transformations)', 'Matplotlib (for performance plotting)'],
    folderStructure: `emotion-detection/
├── preprocess.py   # Facial alignment & cropping filters
├── model.py        # PyTorch custom CNN layers
├── train.py        # Optimization & epoch loops
└── demo.py         # Real-time OpenCV video stream handler`,
    keyFeatures: [
      'Facial coordinate tracking preprocess using custom filters.',
      'Optimized CNN layers for edge hardware compatibility.',
      'Real-time inference video overlay running at 50+ fps.',
      'Softmax categorical probability expression outputs.',
    ],
    challenges: 'Varying facial illumination and background noise degrade expression detection rates in real-world scenarios.',
    solutions: 'Applied histogram equalization to standardize frame brightness and used random rotation transforms during training.',
    results: 'Attained a classification accuracy of 93.4% and ran real-time inference at under 18ms per frame.',
    lessons: 'Preprocessing is critical: proper facial bounding-box alignment before classification improves accuracy much more than adding layers.',
    future: 'Incorporate temporal facial markers via recurrent networks to classify expressions across video sequences.',
    timeline: [
      { phase: 'Design & preprocessing', date: 'Sep 2024', desc: 'Integrated OpenCV facial landmarks tracking and designed preprocessing filters.' },
      { phase: 'Model formulation', date: 'Oct 2024', desc: 'Programmed custom CNN layers in PyTorch, testing hyperparameter schedules.' },
      { phase: 'Training & Tuning', date: 'Nov 2024', desc: 'Trained model on facial expression sets and optimized kernel weights.' },
      { phase: 'Buffer Integration', date: 'Dec 2024', desc: 'Packaged inference loop with frame buffers to output overlay predictions.' }
    ],
    insights: {
      whySelected: 'PyTorch was selected for its easy parameter structuring, which is crucial for building custom CNN layers and measuring network execution.',
      tradeoffs: 'Decided on a custom lightweight CNN instead of a heavy ResNet-50. This reduced accuracy by ~1.2% but improved frame rate by 5x.',
      performance: 'Executes forward-pass predictions in under 18ms on consumer CPU hardware.',
      scalability: 'The optimized model weight footprint (12MB) makes it easy to host directly on Raspberry Pi edge cameras.'
    },
    aiExplanation: 'The Emotion Detection system operates by cropping facial bounding boxes from webcams. It normalizes lighting using contrast scaling, and maps them into a custom CNN model trained in PyTorch. The model extracts spatial texture features and classifies facial expressions into primary categories like Happy, Neutral, or Surprised.'
  },
  {
    slug: 'ai-business-advisor',
    title: 'AI Business Advisor',
    tagline: 'Intelligent business consulting tool leveraging OpenAI APIs and Next.js to parse local financial records.',
    category: 'Natural Language Processing & Web AI',
    status: 'Completed',
    difficulty: 'Intermediate',
    metrics: [
      { label: 'LLM Accuracy', value: '95.2%' },
      { label: 'Context Windows', value: '128k tokens' },
      { label: 'Response Latency', value: '1.2s' },
    ],
    tags: ['OpenAI API', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Vector Search'],
    githubUrl: 'https://github.com/biradarkishore07/ai-business-advisor',
    demoUrl: 'https://business-advisor.kishore.dev',
    roleWeight: {
      default: 2,
      mlops: 1,
      'fullstack-ai': 3,
      nlp: 3,
    },
    problem: 'Small business owners struggle to analyze financial sheets and formulate market strategies without expensive consulting fees.',
    motivation: 'To develop a fast, accessible AI tool that parses business records and generates actionable insights using LLM context windows.',
    research: 'Investigated prompt structuring techniques, structured JSON schema response configurations, and token management systems.',
    architecture: 'Records are uploaded, formatted into contextual prompts, and dispatched to OpenAI API endpoints. Responses are processed and displayed in a responsive Next.js panel.',
    techChoices: ['Next.js (app router & API handlers)', 'OpenAI SDK (language model access)', 'TypeScript (parameter validation)', 'Tailwind CSS (styling structures)'],
    folderStructure: `ai-business-advisor/
├── app/
│   ├── api/chat/route.ts   # OpenAI API endpoint controller
│   └── page.tsx            # Interactive chat panel dashboard
├── components/             # Response text render modules
└── store/                  # Zustand conversation state controller`,
    keyFeatures: [
      'Document context ingestion via Next.js routes.',
      'Prompt structuring to guarantee JSON formatting.',
      'Live chat panel interface with session memory.',
      'Formatted recommendations display for business parameters.',
    ],
    challenges: 'Large document uploads exceed context windows, and raw API responses can include unwanted text formatting.',
    solutions: 'Structured templates with strict format indicators to guarantee clean outputs, and added token chunking arrays.',
    results: 'Achieved response delivery speeds averaging 1.2s and attained 95.2% accuracy in financial audits.',
    lessons: 'Directing the model to validate its own calculation steps before writing recommendation lists prevents hallucination.',
    future: 'Implement a local embeddings system using vector indexes to search extensive tax records dynamically.',
    timeline: [
      { phase: 'Architecture planning', date: 'May 2025', desc: 'Audited prompt schemas and designed Zustand state systems to handle chats.' },
      { phase: 'API Development', date: 'Jun 2025', desc: 'Programmed Next.js server routes to communicate with OpenAI endpoints.' },
      { phase: 'UI implementation', date: 'Jul 2025', desc: 'Built responsive client components and integrated syntax highlights.' },
      { phase: 'Testing & Refinements', date: 'Aug 2025', desc: 'Tested prompt constraints to guarantee stable recommendation sheets.' }
    ],
    insights: {
      whySelected: 'Next.js was selected for its unified app routing and server routes, enabling secure API keys handling and rendering.',
      tradeoffs: 'Used OpenAI API instead of running local llama models to reduce setup overhead and ensure high consultation logic accuracy.',
      performance: 'Streamlines server requests, providing fully detailed reports in under 1.5 seconds.',
      scalability: 'Handles stateless sessions, allowing the server endpoints to scale to thousands of users simultaneously.'
    },
    aiExplanation: 'The AI Business Advisor tool acts as an automated consultant. It accepts text business documents, constructs targeted prompts with strict structure instructions, and routes them to OpenAI APIs. The responses are parsed and structured into graphs or sections for easy analysis.'
  },
];
