/**
 * Inference Rules Knowledge Base
 * 
 * This is the HEART of the expert system. These rules encode the domain
 * expertise that maps student characteristics to specialization recommendations.
 * 
 * Rule Structure:
 * - Each rule has conditions that must ALL be true
 * - When conditions match, the rule contributes its weight to the target specialization
 * - Higher weights = stronger recommendation signal
 * 
 * Weight Guidelines:
 * - 0.1-0.3: Minor preference indicator (nice to have)
 * - 0.4-0.6: Moderate match signal (good fit)
 * - 0.7-0.9: Strong compatibility (excellent fit)
 * - 1.0: Critical/defining trait (essential match)
 * 
 * Adding New Rules:
 * 1. Define conditions based on question IDs from questions.ts
 * 2. Target a specialization ID from specializations.ts
 * 3. Assign appropriate weight
 * 4. Write clear explanation for transparency
 */

import { Rule } from '../expert-system/types';

/**
 * Complete rule base for the expert system.
 * Rules are organized by target specialization for maintainability.
 */
export const RULES: Rule[] = [
  // ===========================================================================
  // COMPUTER SCIENCE RULES
  // ===========================================================================
  {
    id: 'cs-primary-building',
    name: 'CS - Primary Interest: Building Software',
    conditions: [
      { questionId: 'primary-interest', operator: 'equals', value: 'building-software' }
    ],
    targetSpecializationId: 'computer-science',
    weight: 0.9,
    category: 'interests',
    explanation: 'Your primary interest in building software directly aligns with Computer Science.'
  },
  {
    id: 'cs-primary-puzzles',
    name: 'CS - Primary Interest: Puzzles',
    conditions: [
      { questionId: 'primary-interest', operator: 'equals', value: 'solving-puzzles' }
    ],
    targetSpecializationId: 'computer-science',
    weight: 0.7,
    category: 'interests',
    explanation: 'Your love for solving complex puzzles is a core trait of successful Computer Scientists.'
  },
  {
    id: 'cs-high-programming',
    name: 'CS - Strong Programming Skills',
    conditions: [
      { questionId: 'programming-level', operator: 'greaterOrEqual', value: 4 }
    ],
    targetSpecializationId: 'computer-science',
    weight: 0.8,
    category: 'skills',
    explanation: 'Your strong programming skills provide an excellent foundation for Computer Science.'
  },
  {
    id: 'cs-analytical-approach',
    name: 'CS - Analytical Problem Solving',
    conditions: [
      { questionId: 'problem-approach', operator: 'equals', value: 'analytical' }
    ],
    targetSpecializationId: 'computer-science',
    weight: 0.6,
    category: 'personality',
    explanation: 'Your analytical, systematic approach matches the methodical nature of CS problem-solving.'
  },
  {
    id: 'cs-technical-expert-goal',
    name: 'CS - Technical Expert Career Goal',
    conditions: [
      { questionId: 'five-year-vision', operator: 'equals', value: 'technical-expert' }
    ],
    targetSpecializationId: 'computer-science',
    weight: 0.7,
    category: 'career',
    explanation: 'Computer Science offers deep specialization paths to become a technical expert.'
  },
  {
    id: 'cs-java-csharp-skills',
    name: 'CS - Java/C# Experience',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'java-csharp' }
    ],
    targetSpecializationId: 'computer-science',
    weight: 0.5,
    category: 'skills',
    explanation: 'Your experience with Java or C# is valuable for traditional CS applications.'
  },
  {
    id: 'cs-research-interest',
    name: 'CS - Research Interest',
    conditions: [
      { questionId: 'secondary-interests', operator: 'includes', value: 'research' }
    ],
    targetSpecializationId: 'computer-science',
    weight: 0.5,
    category: 'interests',
    explanation: 'Your interest in research aligns with the theoretical aspects of Computer Science.'
  },

  // ===========================================================================
  // DATA SCIENCE RULES
  // ===========================================================================
  {
    id: 'ds-primary-analyzing',
    name: 'DS - Primary Interest: Analyzing Data',
    conditions: [
      { questionId: 'primary-interest', operator: 'equals', value: 'analyzing-data' }
    ],
    targetSpecializationId: 'data-science',
    weight: 1.0,
    category: 'interests',
    explanation: 'Your passion for analyzing data is the defining characteristic of Data Scientists.'
  },
  {
    id: 'ds-high-math',
    name: 'DS - Strong Math Skills',
    conditions: [
      { questionId: 'math-level', operator: 'greaterOrEqual', value: 4 }
    ],
    targetSpecializationId: 'data-science',
    weight: 0.9,
    category: 'skills',
    explanation: 'Your strong mathematics skills are essential for statistical analysis in Data Science.'
  },
  {
    id: 'ds-python-skills',
    name: 'DS - Python Experience',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'python' }
    ],
    targetSpecializationId: 'data-science',
    weight: 0.6,
    category: 'skills',
    explanation: 'Your Python experience is highly relevant as it is the primary language for Data Science.'
  },
  {
    id: 'ds-data-analysis-skills',
    name: 'DS - Data Analysis Experience',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'data-analysis' }
    ],
    targetSpecializationId: 'data-science',
    weight: 0.7,
    category: 'skills',
    explanation: 'Your existing data analysis experience gives you a head start in Data Science.'
  },
  {
    id: 'ds-finance-industry',
    name: 'DS - Finance Industry Interest',
    conditions: [
      { questionId: 'industry-preference', operator: 'includes', value: 'finance' }
    ],
    targetSpecializationId: 'data-science',
    weight: 0.5,
    category: 'career',
    explanation: 'The finance industry heavily relies on Data Science for quantitative analysis.'
  },
  {
    id: 'ds-detail-oriented',
    name: 'DS - Detail Oriented',
    conditions: [
      { questionId: 'detail-vs-bigpicture', operator: 'equals', value: 'detail-oriented' }
    ],
    targetSpecializationId: 'data-science',
    weight: 0.5,
    category: 'personality',
    explanation: 'Your attention to detail is crucial for accurate data analysis.'
  },
  {
    id: 'ds-sql-skills',
    name: 'DS - SQL Experience',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'sql' }
    ],
    targetSpecializationId: 'data-science',
    weight: 0.5,
    category: 'skills',
    explanation: 'Your SQL knowledge is essential for working with databases in Data Science.'
  },

  // ===========================================================================
  // CYBERSECURITY RULES
  // ===========================================================================
  {
    id: 'sec-primary-protecting',
    name: 'Security - Primary Interest: Protection',
    conditions: [
      { questionId: 'primary-interest', operator: 'equals', value: 'protecting-systems' }
    ],
    targetSpecializationId: 'cybersecurity',
    weight: 1.0,
    category: 'interests',
    explanation: 'Your drive to protect systems is the core motivation for Cybersecurity professionals.'
  },
  {
    id: 'sec-security-industry',
    name: 'Security - Security Industry Interest',
    conditions: [
      { questionId: 'industry-preference', operator: 'includes', value: 'security' }
    ],
    targetSpecializationId: 'cybersecurity',
    weight: 0.8,
    category: 'career',
    explanation: 'Your interest in the security industry directly aligns with Cybersecurity.'
  },
  {
    id: 'sec-analytical-approach',
    name: 'Security - Analytical Mindset',
    conditions: [
      { questionId: 'problem-approach', operator: 'equals', value: 'analytical' }
    ],
    targetSpecializationId: 'cybersecurity',
    weight: 0.6,
    category: 'personality',
    explanation: 'Your analytical approach is essential for threat analysis and security audits.'
  },
  {
    id: 'sec-detail-oriented',
    name: 'Security - Detail Oriented',
    conditions: [
      { questionId: 'detail-vs-bigpicture', operator: 'equals', value: 'detail-oriented' }
    ],
    targetSpecializationId: 'cybersecurity',
    weight: 0.7,
    category: 'personality',
    explanation: 'Attention to detail is critical in Security - one oversight can be catastrophic.'
  },
  {
    id: 'sec-government-interest',
    name: 'Security - Government Interest',
    conditions: [
      { questionId: 'work-environment', operator: 'equals', value: 'government' }
    ],
    targetSpecializationId: 'cybersecurity',
    weight: 0.5,
    category: 'career',
    explanation: 'Government organizations have high demand for Cybersecurity professionals.'
  },
  {
    id: 'sec-puzzles-interest',
    name: 'Security - Puzzle Solving',
    conditions: [
      { questionId: 'primary-interest', operator: 'equals', value: 'solving-puzzles' }
    ],
    targetSpecializationId: 'cybersecurity',
    weight: 0.5,
    category: 'interests',
    explanation: 'Security involves solving complex puzzles like an attacker would.'
  },

  // ===========================================================================
  // WEB DEVELOPMENT RULES
  // ===========================================================================
  {
    id: 'web-websites-interest',
    name: 'Web - Websites Interest',
    conditions: [
      { questionId: 'secondary-interests', operator: 'includes', value: 'websites' }
    ],
    targetSpecializationId: 'web-development',
    weight: 0.9,
    category: 'interests',
    explanation: 'Your interest in websites directly aligns with Web Development.'
  },
  {
    id: 'web-html-css-skills',
    name: 'Web - HTML/CSS Skills',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'html-css' }
    ],
    targetSpecializationId: 'web-development',
    weight: 0.7,
    category: 'skills',
    explanation: 'Your HTML/CSS experience is the foundation of Web Development.'
  },
  {
    id: 'web-javascript-skills',
    name: 'Web - JavaScript Skills',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'javascript' }
    ],
    targetSpecializationId: 'web-development',
    weight: 0.8,
    category: 'skills',
    explanation: 'JavaScript is the essential language for modern Web Development.'
  },
  {
    id: 'web-hands-on-learning',
    name: 'Web - Hands-on Learner',
    conditions: [
      { questionId: 'learning-preference', operator: 'equals', value: 'hands-on' }
    ],
    targetSpecializationId: 'web-development',
    weight: 0.5,
    category: 'interests',
    explanation: 'Web Development is highly practical and rewards hands-on learning.'
  },
  {
    id: 'web-freelance-goal',
    name: 'Web - Freelance Goal',
    conditions: [
      { questionId: 'work-environment', operator: 'equals', value: 'freelance' }
    ],
    targetSpecializationId: 'web-development',
    weight: 0.6,
    category: 'career',
    explanation: 'Web Development is one of the most accessible paths to freelancing.'
  },
  {
    id: 'web-building-interest',
    name: 'Web - Building Interest',
    conditions: [
      { questionId: 'primary-interest', operator: 'equals', value: 'building-software' }
    ],
    targetSpecializationId: 'web-development',
    weight: 0.6,
    category: 'interests',
    explanation: 'Web Development lets you build complete, working applications.'
  },
  {
    id: 'web-ecommerce-industry',
    name: 'Web - E-commerce Interest',
    conditions: [
      { questionId: 'industry-preference', operator: 'includes', value: 'ecommerce' }
    ],
    targetSpecializationId: 'web-development',
    weight: 0.5,
    category: 'career',
    explanation: 'E-commerce relies heavily on Web Development for online storefronts.'
  },

  // ===========================================================================
  // MOBILE DEVELOPMENT RULES
  // ===========================================================================
  {
    id: 'mobile-apps-interest',
    name: 'Mobile - Mobile Apps Interest',
    conditions: [
      { questionId: 'secondary-interests', operator: 'includes', value: 'mobile-apps' }
    ],
    targetSpecializationId: 'mobile-development',
    weight: 1.0,
    category: 'interests',
    explanation: 'Your direct interest in mobile apps makes Mobile Development a natural fit.'
  },
  {
    id: 'mobile-javascript-skills',
    name: 'Mobile - JavaScript for React Native',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'javascript' }
    ],
    targetSpecializationId: 'mobile-development',
    weight: 0.5,
    category: 'skills',
    explanation: 'Your JavaScript skills can be applied to React Native mobile development.'
  },
  {
    id: 'mobile-creative-approach',
    name: 'Mobile - Creative Problem Solving',
    conditions: [
      { questionId: 'problem-approach', operator: 'equals', value: 'creative' }
    ],
    targetSpecializationId: 'mobile-development',
    weight: 0.5,
    category: 'personality',
    explanation: 'Mobile apps require creative solutions for limited screen space.'
  },
  {
    id: 'mobile-startup-goal',
    name: 'Mobile - Startup Environment',
    conditions: [
      { questionId: 'work-environment', operator: 'equals', value: 'startup' }
    ],
    targetSpecializationId: 'mobile-development',
    weight: 0.5,
    category: 'career',
    explanation: 'Many startups focus on mobile-first products.'
  },
  {
    id: 'mobile-entrepreneur-vision',
    name: 'Mobile - Entrepreneur Vision',
    conditions: [
      { questionId: 'five-year-vision', operator: 'equals', value: 'entrepreneur' }
    ],
    targetSpecializationId: 'mobile-development',
    weight: 0.5,
    category: 'career',
    explanation: 'Mobile apps are a popular path for tech entrepreneurs.'
  },

  // ===========================================================================
  // UI/UX DESIGN RULES
  // ===========================================================================
  {
    id: 'ux-primary-designing',
    name: 'UX - Primary Interest: Design',
    conditions: [
      { questionId: 'primary-interest', operator: 'equals', value: 'designing-interfaces' }
    ],
    targetSpecializationId: 'ui-ux-design',
    weight: 1.0,
    category: 'interests',
    explanation: 'Your passion for designing interfaces is the core of UI/UX Design.'
  },
  {
    id: 'ux-high-design-skills',
    name: 'UX - Strong Design Skills',
    conditions: [
      { questionId: 'design-level', operator: 'greaterOrEqual', value: 4 }
    ],
    targetSpecializationId: 'ui-ux-design',
    weight: 0.9,
    category: 'skills',
    explanation: 'Your strong visual design skills are essential for UI/UX Design.'
  },
  {
    id: 'ux-design-tools',
    name: 'UX - Design Tools Experience',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'design-tools' }
    ],
    targetSpecializationId: 'ui-ux-design',
    weight: 0.8,
    category: 'skills',
    explanation: 'Your experience with design tools like Figma gives you a head start.'
  },
  {
    id: 'ux-creative-approach',
    name: 'UX - Creative Problem Solving',
    conditions: [
      { questionId: 'problem-approach', operator: 'equals', value: 'creative' }
    ],
    targetSpecializationId: 'ui-ux-design',
    weight: 0.7,
    category: 'personality',
    explanation: 'UI/UX Design rewards creative, unconventional thinking.'
  },
  {
    id: 'ux-creativity-priority',
    name: 'UX - Creativity Career Priority',
    conditions: [
      { questionId: 'career-priority', operator: 'equals', value: 'creativity' }
    ],
    targetSpecializationId: 'ui-ux-design',
    weight: 0.7,
    category: 'career',
    explanation: 'UI/UX Design offers exceptional creative freedom.'
  },
  {
    id: 'ux-communication-skills',
    name: 'UX - Strong Communication',
    conditions: [
      { questionId: 'communication-level', operator: 'greaterOrEqual', value: 4 }
    ],
    targetSpecializationId: 'ui-ux-design',
    weight: 0.5,
    category: 'skills',
    explanation: 'UX designers need strong communication to advocate for users.'
  },
  {
    id: 'ux-collaboration-learning',
    name: 'UX - Collaborative Learner',
    conditions: [
      { questionId: 'learning-preference', operator: 'equals', value: 'collaboration' }
    ],
    targetSpecializationId: 'ui-ux-design',
    weight: 0.4,
    category: 'interests',
    explanation: 'UX Design involves extensive collaboration with stakeholders and users.'
  },

  // ===========================================================================
  // ARTIFICIAL INTELLIGENCE RULES
  // ===========================================================================
  {
    id: 'ai-ml-interest',
    name: 'AI - AI/ML Interest',
    conditions: [
      { questionId: 'secondary-interests', operator: 'includes', value: 'ai-ml' }
    ],
    targetSpecializationId: 'artificial-intelligence',
    weight: 1.0,
    category: 'interests',
    explanation: 'Your direct interest in AI/ML is the foundation for this specialization.'
  },
  {
    id: 'ai-high-math',
    name: 'AI - Strong Math Skills',
    conditions: [
      { questionId: 'math-level', operator: 'greaterOrEqual', value: 4 }
    ],
    targetSpecializationId: 'artificial-intelligence',
    weight: 0.9,
    category: 'skills',
    explanation: 'Advanced mathematics is essential for understanding AI algorithms.'
  },
  {
    id: 'ai-python-skills',
    name: 'AI - Python Experience',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'python' }
    ],
    targetSpecializationId: 'artificial-intelligence',
    weight: 0.7,
    category: 'skills',
    explanation: 'Python is the primary language for AI/ML development.'
  },
  {
    id: 'ai-research-interest',
    name: 'AI - Research Interest',
    conditions: [
      { questionId: 'secondary-interests', operator: 'includes', value: 'research' }
    ],
    targetSpecializationId: 'artificial-intelligence',
    weight: 0.6,
    category: 'interests',
    explanation: 'AI is a research-intensive field with constant innovation.'
  },
  {
    id: 'ai-researcher-vision',
    name: 'AI - Researcher Career Vision',
    conditions: [
      { questionId: 'five-year-vision', operator: 'equals', value: 'researcher' }
    ],
    targetSpecializationId: 'artificial-intelligence',
    weight: 0.7,
    category: 'career',
    explanation: 'AI offers excellent paths for research careers.'
  },
  {
    id: 'ai-research-environment',
    name: 'AI - Research Environment',
    conditions: [
      { questionId: 'work-environment', operator: 'equals', value: 'research' }
    ],
    targetSpecializationId: 'artificial-intelligence',
    weight: 0.6,
    category: 'career',
    explanation: 'AI roles are common in research institutions and labs.'
  },
  {
    id: 'ai-analyzing-interest',
    name: 'AI - Data Analysis Interest',
    conditions: [
      { questionId: 'primary-interest', operator: 'equals', value: 'analyzing-data' }
    ],
    targetSpecializationId: 'artificial-intelligence',
    weight: 0.5,
    category: 'interests',
    explanation: 'AI heavily involves analyzing patterns in data.'
  },

  // ===========================================================================
  // GAME DEVELOPMENT RULES
  // ===========================================================================
  {
    id: 'game-gaming-interest',
    name: 'Game - Gaming Interest',
    conditions: [
      { questionId: 'secondary-interests', operator: 'includes', value: 'gaming' }
    ],
    targetSpecializationId: 'game-development',
    weight: 1.0,
    category: 'interests',
    explanation: 'Your passion for gaming is the foundation for Game Development.'
  },
  {
    id: 'game-java-csharp',
    name: 'Game - C#/Java for Unity',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'java-csharp' }
    ],
    targetSpecializationId: 'game-development',
    weight: 0.7,
    category: 'skills',
    explanation: 'C# is the primary language for Unity game development.'
  },
  {
    id: 'game-creative-approach',
    name: 'Game - Creative Problem Solving',
    conditions: [
      { questionId: 'problem-approach', operator: 'equals', value: 'creative' }
    ],
    targetSpecializationId: 'game-development',
    weight: 0.6,
    category: 'personality',
    explanation: 'Game Development combines technical skills with creative vision.'
  },
  {
    id: 'game-design-skills',
    name: 'Game - Design Skills',
    conditions: [
      { questionId: 'design-level', operator: 'greaterOrEqual', value: 3 }
    ],
    targetSpecializationId: 'game-development',
    weight: 0.5,
    category: 'skills',
    explanation: 'Visual design skills enhance game aesthetics.'
  },
  {
    id: 'game-industry-preference',
    name: 'Game - Gaming Industry',
    conditions: [
      { questionId: 'industry-preference', operator: 'includes', value: 'gaming' }
    ],
    targetSpecializationId: 'game-development',
    weight: 0.8,
    category: 'career',
    explanation: 'Direct alignment with the gaming industry.'
  },
  {
    id: 'game-hands-on',
    name: 'Game - Hands-on Learner',
    conditions: [
      { questionId: 'learning-preference', operator: 'equals', value: 'hands-on' }
    ],
    targetSpecializationId: 'game-development',
    weight: 0.4,
    category: 'interests',
    explanation: 'Game Development is highly practical and project-based.'
  },

  // ===========================================================================
  // CLOUD COMPUTING / DEVOPS RULES
  // ===========================================================================
  {
    id: 'cloud-infra-interest',
    name: 'Cloud - Infrastructure Interest',
    conditions: [
      { questionId: 'secondary-interests', operator: 'includes', value: 'cloud-infra' }
    ],
    targetSpecializationId: 'cloud-computing',
    weight: 1.0,
    category: 'interests',
    explanation: 'Your interest in cloud infrastructure directly aligns with this field.'
  },
  {
    id: 'cloud-automation-interest',
    name: 'Cloud - Automation Interest',
    conditions: [
      { questionId: 'secondary-interests', operator: 'includes', value: 'robotics' }
    ],
    targetSpecializationId: 'cloud-computing',
    weight: 0.4,
    category: 'interests',
    explanation: 'Your automation interest applies to infrastructure automation in DevOps.'
  },
  {
    id: 'cloud-analytical-approach',
    name: 'Cloud - Analytical Approach',
    conditions: [
      { questionId: 'problem-approach', operator: 'equals', value: 'analytical' }
    ],
    targetSpecializationId: 'cloud-computing',
    weight: 0.5,
    category: 'personality',
    explanation: 'Cloud architecture requires systematic, analytical thinking.'
  },
  {
    id: 'cloud-corporate-goal',
    name: 'Cloud - Corporate Environment',
    conditions: [
      { questionId: 'work-environment', operator: 'equals', value: 'corporate' }
    ],
    targetSpecializationId: 'cloud-computing',
    weight: 0.5,
    category: 'career',
    explanation: 'Large corporations have significant cloud infrastructure needs.'
  },
  {
    id: 'cloud-high-salary-priority',
    name: 'Cloud - High Salary Priority',
    conditions: [
      { questionId: 'career-priority', operator: 'equals', value: 'salary' }
    ],
    targetSpecializationId: 'cloud-computing',
    weight: 0.5,
    category: 'career',
    explanation: 'Cloud/DevOps engineers command high salaries due to demand.'
  },
  {
    id: 'cloud-python-skills',
    name: 'Cloud - Python for Automation',
    conditions: [
      { questionId: 'existing-skills', operator: 'includes', value: 'python' }
    ],
    targetSpecializationId: 'cloud-computing',
    weight: 0.4,
    category: 'skills',
    explanation: 'Python is widely used for cloud automation scripts.'
  },

  // ===========================================================================
  // BUSINESS & IT MANAGEMENT RULES
  // ===========================================================================
  {
    id: 'biz-primary-managing',
    name: 'Business - Primary Interest: Management',
    conditions: [
      { questionId: 'primary-interest', operator: 'equals', value: 'managing-projects' }
    ],
    targetSpecializationId: 'business-it',
    weight: 1.0,
    category: 'interests',
    explanation: 'Your interest in management is the core of Business & IT Management.'
  },
  {
    id: 'biz-business-tech-interest',
    name: 'Business - Business Tech Interest',
    conditions: [
      { questionId: 'secondary-interests', operator: 'includes', value: 'business-tech' }
    ],
    targetSpecializationId: 'business-it',
    weight: 0.9,
    category: 'interests',
    explanation: 'Your interest in business technology strategy aligns perfectly.'
  },
  {
    id: 'biz-high-communication',
    name: 'Business - Strong Communication',
    conditions: [
      { questionId: 'communication-level', operator: 'greaterOrEqual', value: 4 }
    ],
    targetSpecializationId: 'business-it',
    weight: 0.8,
    category: 'skills',
    explanation: 'Strong communication is essential for IT management roles.'
  },
  {
    id: 'biz-team-lead-vision',
    name: 'Business - Team Lead Vision',
    conditions: [
      { questionId: 'five-year-vision', operator: 'equals', value: 'team-lead' }
    ],
    targetSpecializationId: 'business-it',
    weight: 0.9,
    category: 'career',
    explanation: 'Business & IT Management is the direct path to leadership roles.'
  },
  {
    id: 'biz-leadership-priority',
    name: 'Business - Leadership Priority',
    conditions: [
      { questionId: 'career-priority', operator: 'equals', value: 'leadership' }
    ],
    targetSpecializationId: 'business-it',
    weight: 0.8,
    category: 'career',
    explanation: 'This specialization focuses on developing leadership capabilities.'
  },
  {
    id: 'biz-large-team-preference',
    name: 'Business - Large Team Preference',
    conditions: [
      { questionId: 'work-style', operator: 'equals', value: 'large-team' }
    ],
    targetSpecializationId: 'business-it',
    weight: 0.5,
    category: 'personality',
    explanation: 'IT Management often involves coordinating large, diverse teams.'
  },
  {
    id: 'biz-big-picture',
    name: 'Business - Big Picture Thinker',
    conditions: [
      { questionId: 'detail-vs-bigpicture', operator: 'equals', value: 'big-picture' }
    ],
    targetSpecializationId: 'business-it',
    weight: 0.6,
    category: 'personality',
    explanation: 'Strategic, big-picture thinking is crucial for IT management.'
  },
  {
    id: 'biz-corporate-environment',
    name: 'Business - Corporate Environment',
    conditions: [
      { questionId: 'work-environment', operator: 'equals', value: 'corporate' }
    ],
    targetSpecializationId: 'business-it',
    weight: 0.5,
    category: 'career',
    explanation: 'Corporate environments offer structured paths for IT management careers.'
  }
];

/**
 * Get all rules for a specific specialization.
 * @param specializationId - The specialization to get rules for
 * @returns Array of rules targeting that specialization
 */
export function getRulesForSpecialization(specializationId: string): Rule[] {
  return RULES.filter(rule => rule.targetSpecializationId === specializationId);
}

/**
 * Get rules by category.
 * @param category - The category to filter by
 * @returns Array of rules in that category
 */
export function getRulesByCategory(category: string): Rule[] {
  return RULES.filter(rule => rule.category === category);
}

/**
 * Get total number of rules.
 * @returns Total rule count
 */
export function getTotalRuleCount(): number {
  return RULES.length;
}
