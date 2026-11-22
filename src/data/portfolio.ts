import codingPhoto from "@/assets/images/profile/coding.jpg";
import profilePhoto from "@/assets/images/profile/profile.jpg";
import animalDetectorImg from "@/assets/images/projects/animal-detector.png";
import ditSmartImg from "@/assets/images/projects/dit-smart-assistant.png";
import geePlayerImg from "@/assets/images/projects/gee-player.png";
import liftSystemImg from "@/assets/images/projects/lift-system.jpg";
import safariSmartImg from "@/assets/images/projects/safarismart-ai-concierge.png";
import smartClinicImg from "@/assets/images/projects/smart-clinic.png";
import tenderGuardImg from "@/assets/images/projects/tenderguard-africa.png";
import waterTankImg from "@/assets/images/projects/water-tank-iot.jpg";
import wildlifeSafariImg from "@/assets/images/projects/wildlife-safari-assistant.jpg";
import pcbPhoto from "@/assets/images/training/pcb-creation.jpg";

export type ProjectCategory = "Software" | "AI/ML" | "IoT" | "Mobile" | "Embedded Systems";

export type PortfolioProject = {
  title: string;
  category: ProjectCategory;
  description: string;
  technologies: string[];
  imageLabel: string;
  github?: string;
  secondaryGithub?: string;
  image?: string;
  featured?: boolean;
};

export const photos = {
  profile: profilePhoto,
  coding: codingPhoto,
  pcb: pcbPhoto,
};

export const profile = {
  name: "Gloria Beneth Mbilinyi",
  title: "Computer Engineering Student | Full-Stack Developer | AI & IoT Enthusiast",
  shortTitle: "Full-Stack Developer · AI & IoT Enthusiast",
  email: "gloriambilinyi5@gmail.com",
  github: "https://github.com/gloria-mbilinyi",
  githubLabel: "github.com/gloria-mbilinyi",
  linkedin: "https://www.linkedin.com/in/gloria-mbilinyi/",
  linkedinLabel: "linkedin.com/in/gloria-mbilinyi",
  cvUrl: "/gloria-beneth-mbilinyi-cv.pdf",
};

export const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Contact",
];

export const skillGroups = [
  {
    title: "Programming",
    items: ["Java", "Python", "JavaScript", "Dart", "SQL", "C/C++"],
  },
  {
    title: "Backend",
    items: ["Spring Boot", "FastAPI", "REST APIs", "JWT", "Maven"],
  },
  {
    title: "Frontend",
    items: ["React", "Vite", "HTML", "CSS", "Tailwind CSS"],
  },
  { title: "Mobile", items: ["Flutter", "Dart"] },
  {
    title: "AI & Data",
    items: [
      "Machine Learning",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "RAG",
      "LangGraph",
      "ChromaDB",
    ],
  },
  { title: "Databases", items: ["PostgreSQL", "SQLite"] },
  {
    title: "IoT & Embedded",
    items: ["Arduino", "ESP32", "ESP8266", "Sensors", "Servo Motors", "Relays", "LCD"],
  },
  {
    title: "Networking",
    items: ["VLAN", "DHCP", "NAT", "ACL", "OSPF", "QoS"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "VS Code", "IntelliJ IDEA", "Postman", "Figma"],
  },
];

export const projects: PortfolioProject[] = [
  {
    title: "TenderGuard Africa",
    category: "AI/ML",
    description:
      "An agentic AI procurement decision-support system that checks tender compliance, compares bid prices, flags supplier-data inconsistencies, and prepares auditable evidence for human committee review.",
    technologies: ["Python", "LangGraph", "MCP", "Qwen3", "Ollama", "Pydantic"],
    github: "https://github.com/gloria-mbilinyi/TenderGuard-Africa",
    imageLabel: "Agentic AI procurement workflow",
    image: tenderGuardImg,
    featured: true,
  },
  {
    title: "Smart Clinic Management System",
    category: "Software",
    description:
      "A full-stack healthcare management platform supporting administrator, doctor, and patient roles, appointment management, authentication, and medical records.",
    technologies: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "React", "Vite"],
    github: "https://github.com/gloria-mbilinyi/smart-clinic",
    secondaryGithub: "https://github.com/gloria-mbilinyi/smart-clinic-frontend",
    imageLabel: "Full-stack clinic platform",
    image: smartClinicImg,
    featured: true,
  },
  {
    title: "DIT Smart Assistant",
    category: "AI/ML",
    description:
      "A Retrieval-Augmented Generation assistant designed to answer questions related to Dar es Salaam Institute of Technology using institutional information.",
    technologies: ["Python", "RAG", "ChromaDB", "Embeddings", "Streamlit"],
    github: "https://github.com/gloria-mbilinyi/dit-smart-assistant",
    imageLabel: "DIT Smart Assistant interface",
    image: ditSmartImg,
    featured: true,
  },
  {
    title: "Wild Animal Detection and Classification System",
    category: "AI/ML",
    description:
      "A machine learning image-classification system capable of recognizing nine wild animal species, from lion and zebra to crocodile and leopard.",
    technologies: ["Python", "TensorFlow", "CNN", "Machine Learning"],
    github: "https://github.com/gloria-mbilinyi/Wildlife-Safari-Assistant",
    imageLabel: "Wildlife classification interface",
    image: wildlifeSafariImg,
    featured: true,
  },
  {
    title: "LiftSystem - Accessible Elevator Control",
    category: "Embedded Systems",
    description:
      "An Arduino elevator prototype with floor controls, LCD feedback, a servo motor, ultrasonic sensing, emergency controls, a buzzer, and audio notifications.",
    technologies: ["Arduino", "Embedded C/C++", "Servo", "Ultrasonic Sensor", "LCD"],
    github: "https://github.com/gloria-mbilinyi/liftSystem",
    imageLabel: "Accessible elevator prototype",
    image: liftSystemImg,
    featured: true,
  },
  {
    title: "Smart Water Tank Level Monitoring",
    category: "IoT",
    description:
      "An IoT monitoring system for checking water level and environmental conditions using ultrasonic, water-level, and temperature sensors.",
    technologies: ["Arduino", "HC-SR04", "DHT11", "LCD", "Sensors"],
    imageLabel: "Water-tank monitoring prototype",
    image: waterTankImg,
  },
  {
    title: "SafariSmart AI Concierge",
    category: "AI/ML",
    description:
      "An AI-powered tourism platform designed to help travelers explore destinations in Tanzania, plan personalized trips based on their preferences and budgets, and interact with an intelligent travel assistant.",
    technologies: [
      "AI Travel Assistant",
      "Personalized Trip Planning",
      "Destination Discovery",
      "Budget-Based Planning",
      "English/Kiswahili",
      "Booking Requests",
      "Operator Portal",
    ],
    imageLabel: "SafariSmart AI Concierge travel planning interface",
    image: safariSmartImg,
  },
  {
    title: "Gee Player",
    category: "Mobile",
    description:
      "A Flutter-based media player designed for video and music playback with subtitle support in English and Kiswahili.",
    technologies: ["Flutter", "Dart", "media_kit", "Dio", "SQLite"],
    github: "https://github.com/gloria-mbilinyi/GeePlayer",
    imageLabel: "Flutter media player interface",
    image: geePlayerImg,
  },
  {
    title: "Animal Detector",
    category: "AI/ML",
    description:
      "A TensorFlow-powered image-classification application packaged and deployed through Streamlit.",
    technologies: ["Python", "TensorFlow", "CNN", "Streamlit"],
    github: "https://github.com/gloria-mbilinyi/animal_detector",
    imageLabel: "Animal Detector interface",
    image: animalDetectorImg,
  },
];

export const education = [
  {
    period: "2024 - Present",
    title: "Bachelor of Engineering in Computer Engineering",
    place: "Dar es Salaam Institute of Technology · Main Campus",
    note: "Current",
  },
  {
    period: "2021 - 2024",
    title: "Diploma in Leather Product Technology",
    place: "Dar es Salaam Institute of Technology · Mwanza Campus",
    note: "GPA 4.6",
  },
  {
    period: "2017 - 2020",
    title: "Secondary Education",
    place: "Mukilima Secondary School",
    note: "Division One",
  },
];

export const experiences = [
  {
    type: "Applied Engineering",
    title: "Independent Technical Project Development",
    description:
      "Designed and built multidisciplinary projects spanning full-stack software, machine learning, IoT, embedded control, and networking.",
    status: "Ongoing",
  },
  {
    type: "Academic Training",
    title: "Computer Engineering Practice",
    description:
      "Hands-on development with electronics, microcontrollers, communication networks, software systems, and data-driven applications.",
    status: "DIT · 2024-Present",
  },
];

export const featuredRepositories = [
  "TenderGuard-Africa",
  "smart-clinic",
  "dit-smart-assistant",
  "liftSystem",
  "GeePlayer",
];
