// src/Data/Projects.js

// Add project screenshots into /src/ProjectImage/ and import them here
import fakeNews1 from "../ProjectImage/fakenews1.png";
import fakeNews2 from "../ProjectImage/fakenews2.png";
import deepfake1 from "../ProjectImage/deepfake1.png";
import deepfake2 from "../ProjectImage/deepfake2.png";
import dbms1 from "../ProjectImage/dbms1.png";

export const projects = [
  {
    id: "1",
    title: "Fake News Detection using LLMs & Deep Learning",
    date: "2024",
    description:
      "Built an end-to-end NLP pipeline for fake news classification. Combined handcrafted features with classical ML models (LogReg, Random Forest), and advanced deep learning (Bi-LSTM with GloVe embeddings, DistilBERT fine-tuning). Implemented targeted data augmentation using MarianMT back-translation to improve robustness.",
    images: [fakeNews1, fakeNews2],
    tags: ["Python", "NLP", "DistilBERT", "Bi-LSTM", "MarianMT", "scikit-learn"],
    github: "", // add repo link if public
    webapp: "", // add demo/colab link if available
  },
  {
    id: "2",
    title: "Emotion-Aware Deepfake Video Detection",
    date: "2023",
    description:
      "Developed a hybrid two-stream deepfake detector integrating EfficientNetB0 visual features with Conv1D temporal modeling. Augmented the model with emotion vectors from FER + MTCNN to enhance prediction accuracy. Benchmarked against baselines like custom CNN/RNN and VideoMAE.",
    images: [deepfake1, deepfake2],
    tags: ["Computer Vision", "TensorFlow", "PyTorch", "OpenCV", "MTCNN", "FER"],
    github: "",
    webapp: "",
  },
  {
    id: "3",
    title: "Movie Database Management System",
    date: "2022",
    description:
      "Designed and implemented a MySQL relational database for managing movies, actors, and crew details. Created optimized queries for efficient search, aggregation, and reporting. Demonstrated strong SQL fundamentals and schema design.",
    images: [dbms1],
    tags: ["MySQL", "SQL", "Database Design", "Data Management"],
    github: "",
    webapp: "",
  },
];
