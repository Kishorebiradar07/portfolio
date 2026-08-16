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
  status: 'Completed' | 'In Progress' | 'Prototype' | 'Academic Project';
  difficulty: 'Advanced' | 'Intermediate';
  metrics: { label: string; value: string }[];
  tags: string[];
  // Set to a real URL string when available; null means button is hidden/disabled.
  githubUrl: string | null;
  demoUrl: string | null;
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
    status: 'In Progress',
    difficulty: 'Advanced',
    metrics: [
      { label: 'Status', value: 'Active Research' },
      { label: 'Compute Target (FLOPs)', value: '-58%' },
      { label: 'ECE Error Target', value: '< 0.03' },
    ],
    tags: ['PyTorch', 'ResNet-56', 'Calibration', 'Expected Calibration Error (ECE)', 'L-BFGS', 'CIFAR-100', 'Early Exit'],
    githubUrl: null, // Will be added once repository is published
    demoUrl: null,   // No live demo available
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
    results: 'In Progress. The optimization network is currently under active research. Numerical metrics represent engineering design targets rather than verified final outputs. Final validations on CIFAR-100 and robustness evaluations on CIFAR-100-C are ongoing.',
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
    title: 'Facial and Vocal Emotion Detection',
    tagline: 'Multimodal emotion detection system leveraging FaceNet and sequence models to fuse facial and vocal feature mappings.',
    category: 'Computer Vision & Deep Learning',
    status: 'Completed',
    difficulty: 'Intermediate',
    metrics: [
      { label: 'Facial Network', value: 'FaceNet' },
      { label: 'Vocal Network', value: 'RNN + LSTM' },
      { label: 'Fusion Layer', value: 'FCN Model' },
    ],
    tags: ['PyTorch', 'FaceNet', 'RNN', 'LSTM', 'Fully Connected Networks', 'OpenCV', 'Multimodal'],
    githubUrl: null, // Will be added once repository is published
    demoUrl: null,   // No live demo available
    roleWeight: {
      default: 2,
      mlops: 2,
      'fullstack-ai': 1,
      nlp: 1,
    },
    problem: 'Standard expression recognizers rely only on visual features, which fail in poor lighting or when expressions are masked. Vocal acoustics offer a secondary signal to verify human affect.',
    motivation: 'To develop a multimodal network architecture that fuses spatial face descriptors with temporal speech patterns for robust affective computing.',
    research: 'Investigated FaceNet for facial coordinate bounding boxes and designed recurrent models (RNN/LSTM) to ingest sequential audio spectrogram vectors.',
    architecture: 'Routes visual inputs to FaceNet to output spatial embeddings, and acoustic inputs to RNN/LSTM blocks. A Fully Connected Network (FCN) performs feature-level fusion, concatenating visual and audio embeddings to output expression classifications.',
    techChoices: ['PyTorch (for backbone training)', 'FaceNet (for visual embeddings)', 'LSTM/RNN (for sequential speech inputs)', 'OpenCV (facial preprocessing)', 'FCN (feature concatenation & fusion)'],
    folderStructure: `emotion-detection/
├── preprocess/   # Face detection & audio spectrogram alignment
├── models/       # FaceNet visual, LSTM audio, and FCN fusion modules
├── train.py      # Multimodal joint training pipelines
└── demo.py       # Live stream inference overlay interface`,
    keyFeatures: [
      'Multimodal fusion of face and voice streams.',
      'Pre-trained FaceNet spatial encoder.',
      'Sequential LSTM temporal audio processing.',
      'Feature concatenation fusion using fully connected networks.',
    ],
    challenges: 'Aligning sample rates between video frames and voice inputs, and compiling custom live datasets.',
    solutions: 'Synchronized audio and video capture frame buffers, and manually compiled a set of localized, live video-audio recordings for model evaluation.',
    results: 'Successfully created the multimodal pipeline. Collected live datasets to train and evaluate the spatial FaceNet, sequential LSTM, and Fully Connected Network fusion layers.',
    lessons: 'Feature-level concatenation outperforms unimodal classification but requires scaling adjustments to prevent visual parameters from dominating speech vectors.',
    future: 'Analyze decision-level fusion strategies to measure comparative model robustness.',
    timeline: [
      { phase: 'Architecture planning', date: 'Oct 2024', desc: 'Researched FaceNet coordinate mappings and audio sequence networks.' },
      { phase: 'Dataset Collection', date: 'Nov 2024', desc: 'Recorded and pre-processed live face and vocal samples.' },
      { phase: 'Model formulation', date: 'Dec 2024', desc: 'Programmed FaceNet facial extractors and LSTM models in PyTorch.' },
      { phase: 'Fusion & Testing', date: 'Jan 2025', desc: 'Integrated Fully Connected Network (FCN) fusion layers to run joint evaluation.' }
    ],
    insights: {
      whySelected: 'PyTorch was selected for its easy parameter structuring, which is crucial for building custom CNN layers and measuring network execution.',
      tradeoffs: 'Fusing features at an early stage requires clean synchronization alignments, but provides much richer representation vectors than late decision voting.',
      performance: 'Consolidated feature models execute predictions in real-time on desktop CPU buffers.',
      scalability: 'The network architecture separates audio and visual streams, allowing either branch to be swapped or retrained independently.'
    },
    aiExplanation: 'This multimodal system combines visual and acoustic inputs. Visual feeds run through FaceNet to extract spatial face mappings. Speech feeds are captured and mapped into LSTMs for vocal acoustics. A Fully Connected Network concatenates these features to produce a unified emotion classification.'
  },
  {
    slug: 'ai-business-advisor',
    title: 'AI Business Advisor',
    tagline: 'Intelligent business consulting prototype leveraging OpenAI APIs and Next.js to parse local financial records.',
    category: 'Natural Language Processing & Web AI',
    status: 'Prototype',
    difficulty: 'Intermediate',
    metrics: [
      { label: 'Integration', value: 'OpenAI API' },
      { label: 'Framework', value: 'Next.js App' },
      { label: 'Status', value: 'Prototype' },
    ],
    tags: ['OpenAI API', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Vector Search'],
    githubUrl: null, // Will be added once repository is published
    demoUrl: null,   // No live demo available
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
    results: 'In Progress. The project is currently an active prototype/proof-of-concept demonstrating prompt structuring techniques to generate JSON recommendation cards. Performance figures are based on prototype simulations.',
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
