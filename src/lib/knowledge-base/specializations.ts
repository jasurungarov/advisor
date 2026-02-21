/**
 * Specializations Knowledge Base
 * 
 * This file defines all available academic specializations that the expert
 * system can recommend. Each specialization includes metadata for matching
 * and display purposes.
 * 
 * Adding a new specialization:
 * 1. Add a new entry to the SPECIALIZATIONS array
 * 2. Create corresponding rules in rules.ts
 * 3. The system will automatically include it in recommendations
 */

import { Specialization } from '../expert-system/types';

/**
 * Complete list of available specializations.
 * These represent the possible recommendations the system can make.
 */
export const SPECIALIZATIONS: Specialization[] = [
  {
    id: 'computer-science',
    name: 'Computer Science',
    description: 'Study of computation, algorithms, and programming. Focuses on theoretical foundations and practical software development.',
    careers: [
      'Software Engineer',
      'Systems Architect',
      'Technical Lead',
      'Research Scientist',
      'Backend Developer'
    ],
    keySkills: [
      'Algorithm Design',
      'Data Structures',
      'Problem Solving',
      'System Design',
      'Programming'
    ],
    icon: 'code',
    color: '#3B82F6' // Blue
  },
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    description: 'Extracting insights from data using statistics, machine learning, and visualization. Combines math, programming, and domain expertise.',
    careers: [
      'Data Scientist',
      'Data Analyst',
      'Business Intelligence Analyst',
      'Machine Learning Engineer',
      'Quantitative Analyst'
    ],
    keySkills: [
      'Statistical Analysis',
      'Data Visualization',
      'Python/R Programming',
      'Machine Learning',
      'SQL'
    ],
    icon: 'bar-chart',
    color: '#8B5CF6' // Purple
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Protecting systems, networks, and data from digital attacks. Involves ethical hacking, security analysis, and risk management.',
    careers: [
      'Security Analyst',
      'Penetration Tester',
      'Security Architect',
      'Incident Responder',
      'Security Consultant'
    ],
    keySkills: [
      'Network Security',
      'Ethical Hacking',
      'Risk Assessment',
      'Cryptography',
      'Incident Response'
    ],
    icon: 'shield',
    color: '#EF4444' // Red
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Building websites and web applications. Covers frontend interfaces, backend systems, and full-stack development.',
    careers: [
      'Frontend Developer',
      'Full-Stack Developer',
      'Web Designer',
      'DevOps Engineer',
      'Technical Consultant'
    ],
    keySkills: [
      'HTML/CSS/JavaScript',
      'React/Vue/Angular',
      'Node.js',
      'Database Management',
      'API Development'
    ],
    icon: 'globe',
    color: '#10B981' // Green
  },
  {
    id: 'mobile-development',
    name: 'Mobile App Development',
    description: 'Creating applications for smartphones and tablets. Includes iOS, Android, and cross-platform development.',
    careers: [
      'iOS Developer',
      'Android Developer',
      'Mobile App Designer',
      'React Native Developer',
      'Mobile Architect'
    ],
    keySkills: [
      'Swift/Kotlin',
      'React Native/Flutter',
      'UI/UX for Mobile',
      'App Store Optimization',
      'Mobile Security'
    ],
    icon: 'smartphone',
    color: '#F59E0B' // Amber
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    description: 'Designing user interfaces and experiences. Focuses on usability, visual design, and user research.',
    careers: [
      'UX Designer',
      'UI Designer',
      'Product Designer',
      'Interaction Designer',
      'UX Researcher'
    ],
    keySkills: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Usability Testing'
    ],
    icon: 'palette',
    color: '#EC4899' // Pink
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    description: 'Building intelligent systems that can learn, reason, and make decisions. Includes deep learning, NLP, and computer vision.',
    careers: [
      'AI Engineer',
      'Machine Learning Researcher',
      'NLP Specialist',
      'Computer Vision Engineer',
      'AI Product Manager'
    ],
    keySkills: [
      'Deep Learning',
      'Neural Networks',
      'Python/TensorFlow/PyTorch',
      'Mathematics',
      'Research Methods'
    ],
    icon: 'brain',
    color: '#6366F1' // Indigo
  },
  {
    id: 'game-development',
    name: 'Game Development',
    description: 'Creating video games for various platforms. Combines programming, art, design, and storytelling.',
    careers: [
      'Game Developer',
      'Game Designer',
      'Unity/Unreal Developer',
      'Technical Artist',
      'Game Producer'
    ],
    keySkills: [
      'Game Engines (Unity/Unreal)',
      'C++/C#',
      '3D Graphics',
      'Game Physics',
      'Storytelling'
    ],
    icon: 'gamepad',
    color: '#14B8A6' // Teal
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing & DevOps',
    description: 'Managing cloud infrastructure and automating software delivery. Focus on scalability, reliability, and automation.',
    careers: [
      'Cloud Architect',
      'DevOps Engineer',
      'Site Reliability Engineer',
      'Cloud Consultant',
      'Platform Engineer'
    ],
    keySkills: [
      'AWS/Azure/GCP',
      'Docker/Kubernetes',
      'CI/CD Pipelines',
      'Infrastructure as Code',
      'Monitoring & Logging'
    ],
    icon: 'cloud',
    color: '#0EA5E9' // Sky
  },
  {
    id: 'business-it',
    name: 'Business & IT Management',
    description: 'Bridging technology and business strategy. Focus on project management, IT consulting, and digital transformation.',
    careers: [
      'IT Project Manager',
      'Business Analyst',
      'IT Consultant',
      'Product Manager',
      'CTO/CIO'
    ],
    keySkills: [
      'Project Management',
      'Requirements Analysis',
      'Stakeholder Management',
      'Agile/Scrum',
      'Strategic Planning'
    ],
    icon: 'briefcase',
    color: '#64748B' // Slate
  }
];

/**
 * Get a specialization by its ID.
 * @param id - The specialization ID to look up
 * @returns The specialization or undefined if not found
 */
export function getSpecializationById(id: string): Specialization | undefined {
  return SPECIALIZATIONS.find(s => s.id === id);
}

/**
 * Get all specialization IDs.
 * @returns Array of all specialization IDs
 */
export function getAllSpecializationIds(): string[] {
  return SPECIALIZATIONS.map(s => s.id);
}
