export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
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
  architecture: string; // Describes the pipeline
  techChoices: string[];
  implementation: string;
  challenges: string;
  solutions: string;
  results: string;
  lessons: string;
  future: string;
}

export const projectsData: CaseStudy[] = [
  {
    slug: 'intellidepth',
    title: 'IntelliDepth Adaptive inference',
    tagline: 'Joint multi-exit ResNet-56 image classifier calibrated using temperature scaling and early-exit thresholds.',
    category: 'Deep Learning & ML Optimization',
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
    implementation: 'Programmed custom ResNet-56 stage blocks with linear exit branches. Fitted temperature scaling factors (T=1.22–1.29) on a 5,000 held-out validation split. Conducted threshold sweeps to minimize validation Expected Calibration Error.',
    challenges: 'Intermediate branches degrade downstream conv training due to backprop gradient interference, and out-of-distribution corrupted inputs trigger overconfident early exits.',
    solutions: 'Adopted a joint multi-exit loss weighting strategy. Applied post-hoc temperature scaling per exit to downscale confidence on shifted/corrupted CIFAR-100-C test splits, pushing noisy inputs to deeper layers.',
    results: 'Saved an average of 58.45% computation cost (FLOPs) on CIFAR-100 test sets while achieving 10.03% adaptive test accuracy (matching baseline capacities) and reducing ECE to 0.024.',
    lessons: 'Platt/temperature scaling must be fitted to exits individually. A global temp modifier fails to address confidence drift across early vs deep representation maps.',
    future: 'Design an adaptive gating layer using reinforced networks to predict optimal exit routes before computing branch filters.',
  },
  {
    slug: 'algoshield',
    title: 'AlgoShield Phishing Detection',
    tagline: 'Intelligent email phishing classifier using NLP, metadata parsing, and dynamic risk scoring.',
    category: 'Natural Language Processing & Cybersecurity',
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
    implementation: 'Developed raw header tokenizers to isolate spoofing indicators. Built a Random Forest ensemble model to classify emails, handling class imbalances via SMOTE oversampling.',
    challenges: 'Sophisticated attackers bypass keyword filters using dynamic text variation, and training sets contain high text noise.',
    solutions: 'Coupled metadata indicators (SPF/DKIM records) with NLP n-grams to detect contextual manipulation regardless of keyword swaps.',
    results: 'Attained 96.8% accuracy on test splits and limited false positives to 0.4%, preventing wrong categorization of genuine business mails.',
    lessons: 'Relying on email text alone is insufficient. Layering server security records (SPF/DKIM) alongside text features is critical for robustness.',
    future: 'Deploy as an asynchronous mail-relay proxy that screens messages in transit before mailbox delivery.',
  },
  {
    slug: 'defect-analysis',
    title: 'Intelligent Defect Analysis',
    tagline: 'Computer Vision classification model using Scikit-Learn to detect product defects.',
    category: 'Computer Vision & Quality Audit',
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
    implementation: 'Programmed OpenCV preprocessing kernels to filter out ambient factory light reflections. Trained a Random Forest classifier on labeled product components.',
    challenges: 'Surface variations (texture shifts, lighting glares) generate false anomalies and classification errors.',
    solutions: 'Implemented normalization kernels to standardize image contrast, and trained the ensemble model on a diverse set of lighting simulations.',
    results: 'Exceeded 94.6% inspection accuracy and achieved processing speeds of 45 frames per second under 25ms latency.',
    lessons: 'Robust lighting preprocessing is more effective than deepening the ML model for resolving reflections.',
    future: 'Train a lightweight convolutional model to run defect segmentations directly on edge cameras.',
  },
];
