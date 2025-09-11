// src/Data/SkilsImage.js

import html from "../skills/html.png";
import css from "../skills/css.png";
import react from "../skills/react.png";
import javascript from "../skills/javascript.png";
import bootstrap from "../skills/bootstrap.png";
import mongoDB from "../skills/mongodb.png";
import tailwind from "../skills/tailwind.png";
import mysql from "../skills/mysql.png";
import c from "../skills/C.png";
import cplusplus from "../skills/CPP.png";
import java from "../skills/java.png";
import git from "../skills/git.png";
import figma from "../skills/figma.png";
import postman from "../skills/postman.png";
import github from "../skills/github.png";
import express from "../skills/express.png";
import vercel from "../skills/vercel.png";
import angular from "../skills/angular.png";
import node from "../skills/node-js.png";
import php from "../skills/php.jpg";
import laravel from "../skills/laravel.jpg";
import python from "../skills/python.jpg";
import kotlin from "../skills/kotlin.jpg";
import postgresql from "../skills/postgreSql.png";

// Add ML/Data/BI logos
import pandas from "../skills/pandas.png";
import numpy from "../skills/numpy.png";
import matplotlib from "../skills/matplotlib.png";
import seaborn from "../skills/seaborn.png";
import scikitlearn from "../skills/scikit-learn.png";
import tensorflow from "../skills/tensorflow.png";
import keras from "../skills/keras.png";
import pytorch from "../skills/pytorch.png";
import huggingface from "../skills/huggingface.png";
import opencv from "../skills/opencv.png";
import spark from "../skills/spark.png";
import hadoop from "../skills/hadoop.png";
import kafka from "../skills/kafka.png";
import tableau from "../skills/tableau.png";
import powerbi from "../skills/powerbi.png";
import excel from "../skills/excel.png";
import docker from "../skills/docker.png";
import jupyter from "../skills/jupyter.png";
import streamlit from "../skills/streamlit.png";

export const skillsImage = (skill) => {
  if (!skill) return null;
  const skillID = skill.toLowerCase();

  switch (skillID) {
    // Programming
    case "html": return html;
    case "css": return css;
    case "javascript": return javascript;
    case "react": return react;
    case "bootstrap": return bootstrap;
    case "tailwind": return tailwind;
    case "c": return c;
    case "c++": return cplusplus;
    case "java": return java;
    case "python": return python;
    case "r": return kotlin; // replace if you add a real R logo
    case "kotlin": return kotlin;

    // Version control & tools
    case "git": return git;
    case "github": return github;
    case "figma": return figma;
    case "postman": return postman;
    case "docker": return docker;
    case "jupyter notebook": return jupyter;
    case "streamlit": return streamlit;

    // Databases
    case "mysql": return mysql;
    case "postgresql": return postgresql;
    case "mongodb": return mongoDB;

    // ML / DS Libraries
    case "pandas": return pandas;
    case "numpy": return numpy;
    case "matplotlib": return matplotlib;
    case "seaborn": return seaborn;
    case "scikit-learn": return scikitlearn;
    case "tensorflow": return tensorflow;
    case "keras": return keras;
    case "pytorch": return pytorch;
    case "hugging face transformers": return huggingface;
    case "opencv": return opencv;

    // Big Data / Cloud
    case "apache spark":
    case "spark": return spark;
    case "hadoop": return hadoop;
    case "kafka": return kafka;

    // Visualization & BI
    case "tableau": return tableau;
    case "power bi": return powerbi;
    case "excel": return excel;

    // Web Dev
    case "express": 
    case "express.js": return express;
    case "node":
    case "node.js": return node;
    case "angular": return angular;
    case "php": return php;
    case "laravel": return laravel;
    case "vercel": return vercel;

    default:
      return null;
  }
};
