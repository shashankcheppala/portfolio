// src/Data/Projects.js

// Add project screenshots into /src/ProjectImage/ and import them here
import fakeNews1 from "../ProjectImage/fakenews1.png";
import fakeNews2 from "../ProjectImage/fakenews2.png";
import deepfake1 from "../ProjectImage/deepfake1.png";
import deepfake2 from "../ProjectImage/deepfake2.png";
import dbms1 from "../ProjectImage/dbms1.png";
import pricing1 from "../ProjectImage/pricing1.png";
import pricing2 from "../ProjectImage/pricing2.png";
import incentive1 from "../ProjectImage/incentive1.png";
import incentive2 from "../ProjectImage/incentive2.png";

export const projects = [
  {
    id: "1",
    title: "Fake News Detection using LLMs & Deep Learning",
    date: "2025",
    description:
      "Explored how technology news articles evolve stylistically across ten revision stages. Collected and processed a 300-article dataset, extracting linguistic features (readability, sentiment, POS ratios) to build interpretable baselines with Logistic Regression and Random Forests (~70% accuracy). Advanced to sequence models with GloVe embeddings and fine-tuned DistilBERT for multi-class classification. Addressed class imbalance with targeted MarianMT back-translation, boosting Bi-LSTM accuracy from 35% to 81% and macro-F1 to 0.80. Demonstrated that selective augmentation and careful diagnostics can outperform larger transformers in low-resource NLP tasks.",
    images: [fakeNews1, fakeNews2],
    tags: ["Python", "NLP", "DistilBERT", "Bi-LSTM", "MarianMT", "scikit-learn"],
    github: "", // add repo link if public
    webapp: "", // add demo/colab link if available
  },
  {
    id: "2",
    title: "Emotion-Aware Deepfake Video Detection",
    date: "2025",
    description:
      "Designed a two-stream hybrid model to detect manipulated video content using the CelebDF-V2 dataset. Combined spatial–temporal visual features from EfficientNetB0 + Conv1D with emotion vectors extracted via MTCNN and FER. Benchmarked against baselines (Logistic Regression, custom CNN, Bi-LSTM on emotion sequences, VideoMAE), all scoring near AUC ≈ 0.60. The hybrid approach achieved validation AUC ≈ 0.85 and macro-F1 ≈ 0.70, outperforming single-modality models. Built a full preprocessing pipeline for frame extraction, emotion feature caching, balanced sampling, and augmentation to ensure reproducible training.",
    images: [deepfake1, deepfake2],
    tags: [
      "Computer Vision",
      "Deep Learning",
      "EfficientNetB0",
      "Conv1D",
      "FER",
      "MTCNN",
      "TensorFlow",
      "PyTorch",
      "OpenCV",
    ],
    github: "https://github.com/shashankcheppala/emotion-deepfake-detector",
    webapp: "https://colab.research.google.com/drive/18D7XAdpBuvndE-HffUV6-telX1gUsJnB?usp=sharing",
  },
  {
    id: "3",
    title: "Sentiment-Based Dynamic Pricing with Ethical AI",
    date: "2024",
    description:
      "Proposed and implemented a dynamic pricing framework that integrates real-time sentiment analysis, predictive sentiment trends, and fairness constraints. Built a simulated dataset combining feedback text, ratings, timestamps, and prices, then applied a BERT-based model for multilingual sentiment detection with intensity scoring. Designed pricing logic that adjusts prices proportionally to positive/negative feedback while embedding fairness caps during high-demand hours. Segment analysis and visualizations showed balanced revenue contributions from both positive and negative sentiment groups, maintaining ~96% revenue stability while improving customer trust. Highlighted applications across e-commerce, hospitality, SaaS, and food delivery industries.",
    images: [pricing1, pricing2],
    tags: ["NLP", "Dynamic Pricing", "BERT", "Ethical AI", "Customer Analytics", "Data Visualization"],
    github: "", // add repo link if public
    webapp: "", // add demo link if available
  },
  {
    id: "4",
    title: "Behavior-Based Incentivization with Machine Learning",
    date: "2023",
    description:
      "Explored how behavioral traits such as prosocial actions, sustainable practices, academic achievements, community engagement, and positive communication can predict positive outcomes. Generated a synthetic dataset and applied descriptive analytics to study gender-based behavioral patterns. Trained multiple ML models (SVM, Random Forest, Naive Bayes, KNN, Decision Tree) to forecast outcomes, with Random Forest achieving the strongest balance across accuracy, precision, recall, and F1-score. Feature importance analysis highlighted Positive Communication and Prosocial Behavior as the strongest predictors, offering insights for designing incentive programs in education and organizations.",
    images: [incentive1, incentive2],
    tags: ["Machine Learning", "Behavior Analytics", "Random Forest", "SVM", "Naive Bayes", "Data Visualization"],
    github: "", // add repo link if public
    webapp: "", // add demo link if available
  },
];
