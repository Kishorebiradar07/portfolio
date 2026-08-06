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
    solutions: 'Adopted a joint multi-exit loss weighting strategy. Applied post-hoc temperature scaling per exit to downscale confidence on shifted/corrupted CIFAR-100-C test splits, pushing noisy inputs to deeper layers.',
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
    slug: 'algoshield',
    title: 'AlgoShield Phishing Detection',
    tagline: 'Intelligent email phishing classifier using NLP, metadata parsing, and dynamic risk scoring.',
    category: 'Natural Language Processing & Cybersecurity',
    status: 'Completed',
    difficulty: 'Intermediate',
    metrics: [
      { label: 'Model Accuracy', value: '96.8%' },
      { label: 'Feature Extraction', value: '< 15ms' },
      { label: 'False Positives', value: '0.4%' },
    ],
    tags: ['Scikit-Learn', 'Python', 'NLP', 'TF-IDF', 'Random Forest', 'Feature Engineering', 'Cybersecurity'],
    githubUrl: 'https://github.com/biradarkishore07/algoshield',
    demoUrl: 'https://algoshield.kishore.dev',
    roleWeight: {
      default: 2,
      mlops: 1,
      'fullstack-ai': 2,
      nlp: 3,
    },
    problem: 'Email phishing remains the primary vector for data breaches and financial fraud. Rule-based filters fail to capture semantic context modifications and spoofed sender domains.',
    motivation: 'To engineer a fast machine learning pipeline that extracts metadata features and analyzes semantic text structures to identify phishing attempts with high accuracy.',
    research: 'Evaluated TF-IDF vectorizers with n-gram configurations. Audited Enron and Kaggle phishing datasets to define feature mappings for SPF/DKIM validation and body hyperlink densities.',
    architecture: 'Raw emails are parsed to extract metadata (link counts, domain matches, validation keys) and pre-process message bodies. Text features are vectorized using TF-IDF and fed into a Random Forest Classifier to assign a risk score.',
    techChoices: ['Python (script pipelines)', 'Scikit-Learn (Random Forest & vectorizers)', 'Pandas (data structuring)', 'NLTK (text normalization)'],
    folderStructure: `algoshield/
├── parser.py       # Header SPF/DKIM & link extractor
├── preprocess.py   # Text tokenizer & stopword filtering
├── train.py        # Model fit & SMOTE pipeline
├── evaluate.py     # Confusion matrix & accuracy curves
└── app.py          # Fast server interface for mail screening`,
    keyFeatures: [
      'Multi-layer feature vectorization combining text TF-IDF and metadata.',
      'Domain SPF/DKIM authentication record checks.',
      'Fast, low-latency Random Forest ensemble classifier.',
      'Oversampling via SMOTE to balance high class ratios.',
    ],
    challenges: 'Sophisticated attackers bypass keyword filters using dynamic text variation, and training sets contain high text noise.',
    solutions: 'Coupled metadata indicators (SPF/DKIM records) with NLP n-grams to detect contextual manipulation regardless of keyword swaps.',
    results: 'Attained 96.8% accuracy on test splits and limited false positives to 0.4%, preventing wrong categorization of genuine business mails.',
    lessons: 'Relying on email text alone is insufficient. Layering server security records (SPF/DKIM) alongside text features is critical for robustness.',
    future: 'Deploy as an asynchronous mail-relay proxy that screens messages in transit before mailbox delivery.',
    timeline: [
      { phase: 'Dataset & Parsing Design', date: 'Jul 2025', desc: 'Downloaded Kaggle phishing archives and parsed raw mail headers to extract metadata.' },
      { phase: 'Feature Engineering', date: 'Aug 2025', desc: 'Programmed TF-IDF text processors and domain authentication validators.' },
      { phase: 'Model Training & SMOTE', date: 'Sep 2025', desc: 'Trained Random Forest and Support Vector models, balancing sets using SMOTE.' },
      { phase: 'Deployment Strategy', date: 'Oct 2025', desc: 'Packaged the model into a fast API service for real-time mail scanning.' }
    ],
    insights: {
      whySelected: 'Scikit-Learn was chosen for its mature, lightweight ensemble models and TF-IDF pipeline support, allowing deployment without massive GPU overhead.',
      tradeoffs: 'Random Forest classifiers were selected over deep LSTM text models. LSTMs offered a minor +0.5% accuracy gain but incurred a 10x compute latency penalty.',
      performance: 'Feature processing and inference execute in under 15ms per message on a standard CPU core.',
      scalability: 'The random forest classifier weights can be converted to C-code or serialized vectors to process thousands of inbound email requests in parallel.'
    },
    aiExplanation: 'AlgoShield operates as a double-layered gate. First, it acts as a security parser checking if the email header authentication records (SPF/DKIM) match the sender domain, and measures features like the ratio of links to words. Second, it uses Natural Language Processing (TF-IDF vectorizer) to extract word clusters. By feeding both the structural metadata and semantic vectors into a Random Forest ensemble, it scores the likelihood of threat without getting fooled by typos.'
  },
  {
    slug: 'defect-analysis',
    title: 'Intelligent Defect Analysis',
    tagline: 'Computer Vision classification model using Scikit-Learn to detect product defects.',
    category: 'Computer Vision & Quality Audit',
    status: 'Completed',
    difficulty: 'Intermediate',
    metrics: [
      { label: 'Defect Accuracy', value: '94.6%' },
      { label: 'Processing Speed', value: '45 fps' },
      { label: 'Analysis Latency', value: '< 25ms' },
    ],
    tags: ['Scikit-Learn', 'OpenCV', 'Random Forest', 'Feature Extraction', 'Image Processing', 'Python'],
    githubUrl: 'https://github.com/biradarkishore07/defect-analysis',
    demoUrl: 'https://defect-analysis.kishore.dev',
    roleWeight: {
      default: 1,
      mlops: 3,
      'fullstack-ai': 1,
      nlp: 1,
    },
    problem: 'Manual inspection in industrial manufacturing lines is slow, subjective, and prone to human error, leading to high defect rates and increased warranty costs.',
    motivation: 'To develop a low-latency vision pipeline that automatically detects and flags structural surface anomalies on manufacturing components.',
    research: 'Evaluated spatial histograms, edge detection algorithms, and ensemble classifiers to identify surface anomalies under variable factory lighting.',
    architecture: 'High-speed industrial camera frames are cropped, normalized, and transformed using edge filters. Extracted surface contours are vectorized and classified via a Random Forest model.',
    techChoices: ['Python (core scripting)', 'OpenCV (image manipulation)', 'Scikit-Learn (Random Forest Classifier)', 'NumPy (matrix calculations)'],
    folderStructure: `defect-analysis/
├── preprocess.py   # Contrast normalization & filter scripts
├── features.py     # Contour & edge histogram extractor
├── classifier.py   # Model load & predict loops
└── main.py         # OpenCV camera buffer handler`,
    keyFeatures: [
      'Real-time frame capture pre-processing with custom contrast filters.',
      'Canny edge and contour histogram feature extraction.',
      'Lightweight ensemble classification with Random Forest.',
      'High-throughput frame buffer loop processing at 45 fps.',
    ],
    challenges: 'Surface variations (texture shifts, lighting glares) generate false anomalies and classification errors.',
    solutions: 'Implemented normalization kernels to standardize image contrast, and trained the ensemble model on a diverse set of lighting simulations.',
    results: 'Exceeded 94.6% inspection accuracy and achieved processing speeds of 45 frames per second under 25ms latency.',
    lessons: 'Robust lighting preprocessing is more effective than deepening the ML model for resolving reflections.',
    future: 'Train a lightweight convolutional model to run defect segmentations directly on edge cameras.',
    timeline: [
      { phase: 'Setup & Preprocessing', date: 'Nov 2024', desc: 'Configured OpenCV video capture pipelines and implemented image contrast filters.' },
      { phase: 'Feature Extraction', date: 'Dec 2024', desc: 'Programmed contour metrics and spatial histogram calculations.' },
      { phase: 'Model Verification', date: 'Jan 2025', desc: 'Trained random forest classifiers, sweeping parameters for optimal leaf nodes.' },
      { phase: 'Pipeline Assembly', date: 'Feb 2025', desc: 'Integrated preprocessing, feature mapping, and predictions into a single loop running at 45 fps.' }
    ],
    insights: {
      whySelected: 'OpenCV was selected for its high-performance C++ backend wrappers, allowing lightning-fast image preprocessing and contour transformations directly in memory.',
      tradeoffs: 'Avoided deploying heavy deep CNN models like ResNet-50. A classic computer vision feature extractor followed by Random Forest classification easily fits into memory limits and runs 10x faster.',
      performance: 'Processes camera frames at 45 frames per second, keeping total latency below 25ms.',
      scalability: 'Optimized to scale across multiple camera streams on low-power industrial gateway machines without requiring high-end GPUs.'
    },
    aiExplanation: 'This defect detection system mimics human quality auditors. It uses OpenCV to crop incoming video frames, normalize brightness, and apply Canny edge filters to trace the contours of parts. It measures properties like circle roundness, hole spacing, and edge defects, and feeds these structural parameters into a lightweight Random Forest model to immediately tag parts as Good or Defective under 25ms.'
  },
];
