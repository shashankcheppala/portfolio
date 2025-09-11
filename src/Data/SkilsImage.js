import html from '../skills/html.png';
import css from '../skills/css.png';
import react  from '../skills/react.png';
import javascript  from '../skills/javascript.png';
import bootstrap  from '../skills/bootstrap.png';
import mongoDB  from '../skills/mongodb.png';
import tailwind  from '../skills/tailwind.png';
import mysql  from '../skills/mysql.png';
import c  from '../skills/C.png';
import cplusplus  from '../skills/CPP.png';
import java  from '../skills/java.png';
import git  from '../skills/git.png';
import figma  from '../skills/figma.png';
import postman  from '../skills/postman.png';
import github  from '../skills/github.png';
import express from '../skills/express.png';
import vercel from '../skills/vercel.png'
import angular from '../skills/angular.png'
import node from '../skills/node-js.png'
import php from '../skills/php.jpg'
import laravel from '../skills/laravel.jpg'
import python from '../skills/python.jpg'
import kotlin from '../skills/kotlin.jpg'
import postgresql from '../skills/postgreSql.png'
export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case 'html':
      return html;
    case 'css':
      return css;
    case 'javascript':
      return javascript;
    case 'react':
      return react;
    case 'bootstrap':
      return bootstrap;
    case 'mongodb':
      return mongoDB;
    case 'mysql':
      return mysql;
    case 'tailwind':
      return tailwind;
    case 'c':
      return c;
    case 'c++':
      return cplusplus;
    case 'java':
      return java;
    case 'git':
      return git;
    case 'figma':
      return figma;
    case 'postman':
      return postman;  
    case 'github':
      return github;
    case 'express':
    case 'express.js':
      return express;
    case 'vercel':
      return vercel;
    case 'angular':
      return angular;
    case 'node':
    case 'node.js':
      return node;
    case 'php':
      return php;
    case 'laravel':
      return laravel;
    case 'python':
      return python;
    case 'kotlin':
      return kotlin;
    case 'postgresql':
      return postgresql;
    default:
      return null;
  }
}
