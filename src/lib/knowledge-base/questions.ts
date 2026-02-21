/**
 * Questionnaire Knowledge Base
 * 
 * This file defines the multi-step questionnaire that collects student
 * information for the expert system. Questions are designed to capture:
 * - Interests: What topics excite the student
 * - Skills: Current abilities and strengths
 * - Personality: Work style and preferences
 * - Career: Future goals and aspirations
 * 
 * Each question is carefully designed to map to inference rules.
 */

import { QuestionnaireStep } from '../expert-system/types';

/**
 * Complete questionnaire definition organized into steps.
 * Each step focuses on a specific category of questions.
 */
export const QUESTIONNAIRE_STEPS: QuestionnaireStep[] = [
  // =========================================================================
  // STEP 1: INTERESTS
  // =========================================================================
  {
    id: 'interests',
    title: 'Your Interests',
    description: 'Tell us what topics and activities excite you the most.',
    category: 'interests',
    questions: [
      {
        id: 'primary-interest',
        text: 'Which of these areas interests you the most?',
        type: 'single',
        category: 'interests',
        options: [
          { 
            id: 'building-software', 
            label: 'Building software and applications',
            description: 'Creating programs that solve real problems'
          },
          { 
            id: 'analyzing-data', 
            label: 'Analyzing data and finding patterns',
            description: 'Working with numbers and statistics'
          },
          { 
            id: 'designing-interfaces', 
            label: 'Designing beautiful interfaces',
            description: 'Creating visually appealing and usable designs'
          },
          { 
            id: 'solving-puzzles', 
            label: 'Solving complex logical puzzles',
            description: 'Breaking down difficult problems'
          },
          { 
            id: 'protecting-systems', 
            label: 'Protecting systems from threats',
            description: 'Security and defensive strategies'
          },
          { 
            id: 'managing-projects', 
            label: 'Managing projects and teams',
            description: 'Leadership and coordination'
          }
        ]
      },
      {
        id: 'secondary-interests',
        text: 'Select ALL other areas that also interest you:',
        type: 'multiple',
        category: 'interests',
        options: [
          { id: 'gaming', label: 'Video games and interactive entertainment' },
          { id: 'mobile-apps', label: 'Mobile applications' },
          { id: 'websites', label: 'Websites and web applications' },
          { id: 'ai-ml', label: 'Artificial intelligence and machine learning' },
          { id: 'cloud-infra', label: 'Cloud infrastructure and servers' },
          { id: 'robotics', label: 'Robotics and automation' },
          { id: 'business-tech', label: 'Business and technology strategy' },
          { id: 'research', label: 'Academic research and theory' }
        ]
      },
      {
        id: 'learning-preference',
        text: 'How do you prefer to learn new things?',
        type: 'single',
        category: 'interests',
        options: [
          { 
            id: 'hands-on', 
            label: 'Hands-on experimentation',
            description: 'Trial and error, building projects'
          },
          { 
            id: 'structured-courses', 
            label: 'Structured courses and tutorials',
            description: 'Following a curriculum step by step'
          },
          { 
            id: 'reading-docs', 
            label: 'Reading documentation and books',
            description: 'Deep diving into written materials'
          },
          { 
            id: 'collaboration', 
            label: 'Collaborating with others',
            description: 'Learning through discussion and teamwork'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // STEP 2: SKILLS
  // =========================================================================
  {
    id: 'skills',
    title: 'Your Skills',
    description: 'Rate your current abilities in different areas.',
    category: 'skills',
    questions: [
      {
        id: 'programming-level',
        text: 'How would you rate your programming skills?',
        type: 'scale',
        category: 'skills',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { 
          min: 'Complete beginner', 
          max: 'Advanced/Professional' 
        }
      },
      {
        id: 'math-level',
        text: 'How comfortable are you with mathematics and statistics?',
        type: 'scale',
        category: 'skills',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { 
          min: 'Not comfortable', 
          max: 'Very comfortable' 
        }
      },
      {
        id: 'design-level',
        text: 'How would you rate your visual/design skills?',
        type: 'scale',
        category: 'skills',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { 
          min: 'Not my strength', 
          max: 'Very creative' 
        }
      },
      {
        id: 'communication-level',
        text: 'How strong are your communication and presentation skills?',
        type: 'scale',
        category: 'skills',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { 
          min: 'Needs improvement', 
          max: 'Excellent communicator' 
        }
      },
      {
        id: 'existing-skills',
        text: 'Which of these skills do you already have some experience with?',
        type: 'multiple',
        category: 'skills',
        options: [
          { id: 'html-css', label: 'HTML & CSS' },
          { id: 'javascript', label: 'JavaScript' },
          { id: 'python', label: 'Python' },
          { id: 'java-csharp', label: 'Java or C#' },
          { id: 'sql', label: 'SQL / Databases' },
          { id: 'design-tools', label: 'Design tools (Figma, Photoshop)' },
          { id: 'data-analysis', label: 'Data analysis (Excel, R)' },
          { id: 'none', label: 'None of the above' }
        ]
      }
    ]
  },

  // =========================================================================
  // STEP 3: PERSONALITY
  // =========================================================================
  {
    id: 'personality',
    title: 'Your Work Style',
    description: 'Help us understand how you prefer to work.',
    category: 'personality',
    questions: [
      {
        id: 'work-style',
        text: 'How do you prefer to work?',
        type: 'single',
        category: 'personality',
        options: [
          { 
            id: 'solo', 
            label: 'Independently, focused on my own tasks',
            description: 'I do my best work alone'
          },
          { 
            id: 'small-team', 
            label: 'In a small, close-knit team',
            description: 'Collaborating with a few trusted colleagues'
          },
          { 
            id: 'large-team', 
            label: 'In a large, diverse team',
            description: 'Part of a bigger organization'
          },
          { 
            id: 'mixed', 
            label: 'A mix of solo and team work',
            description: 'Flexibility depending on the task'
          }
        ]
      },
      {
        id: 'problem-approach',
        text: 'When facing a complex problem, you typically:',
        type: 'single',
        category: 'personality',
        options: [
          { 
            id: 'analytical', 
            label: 'Break it down into logical steps',
            description: 'Systematic, methodical approach'
          },
          { 
            id: 'creative', 
            label: 'Look for creative, unconventional solutions',
            description: 'Thinking outside the box'
          },
          { 
            id: 'research', 
            label: 'Research how others have solved it',
            description: 'Learning from existing solutions'
          },
          { 
            id: 'experiment', 
            label: 'Start experimenting immediately',
            description: 'Learn by doing, iterate quickly'
          }
        ]
      },
      {
        id: 'detail-vs-bigpicture',
        text: 'Which describes you better?',
        type: 'single',
        category: 'personality',
        options: [
          { 
            id: 'detail-oriented', 
            label: 'Detail-oriented perfectionist',
            description: 'I focus on getting every detail right'
          },
          { 
            id: 'big-picture', 
            label: 'Big-picture visionary',
            description: 'I focus on the overall strategy and vision'
          },
          { 
            id: 'balanced', 
            label: 'Balanced - depends on the situation',
            description: 'I can switch between both modes'
          }
        ]
      },
      {
        id: 'risk-tolerance',
        text: 'How do you feel about taking risks and trying new things?',
        type: 'scale',
        category: 'personality',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { 
          min: 'Prefer stability and proven methods', 
          max: 'Love experimenting with new ideas' 
        }
      }
    ]
  },

  // =========================================================================
  // STEP 4: CAREER GOALS
  // =========================================================================
  {
    id: 'career',
    title: 'Your Career Goals',
    description: 'Tell us about your professional aspirations.',
    category: 'career',
    questions: [
      {
        id: 'work-environment',
        text: 'What type of work environment appeals to you most?',
        type: 'single',
        category: 'career',
        options: [
          { 
            id: 'startup', 
            label: 'Fast-paced startup',
            description: 'High risk, high reward, wearing many hats'
          },
          { 
            id: 'corporate', 
            label: 'Established corporation',
            description: 'Stability, clear career paths, resources'
          },
          { 
            id: 'freelance', 
            label: 'Freelance / Self-employed',
            description: 'Independence, variety of projects'
          },
          { 
            id: 'research', 
            label: 'Research institution / Academia',
            description: 'Focus on innovation and knowledge'
          },
          { 
            id: 'government', 
            label: 'Government / Non-profit',
            description: 'Public service, social impact'
          }
        ]
      },
      {
        id: 'career-priority',
        text: 'What is most important to you in a career?',
        type: 'single',
        category: 'career',
        options: [
          { id: 'salary', label: 'High salary and financial security' },
          { id: 'impact', label: 'Making a positive impact on society' },
          { id: 'creativity', label: 'Creative freedom and expression' },
          { id: 'growth', label: 'Continuous learning and growth' },
          { id: 'balance', label: 'Work-life balance' },
          { id: 'leadership', label: 'Leadership and influence' }
        ]
      },
      {
        id: 'five-year-vision',
        text: 'Where do you see yourself in 5 years?',
        type: 'single',
        category: 'career',
        options: [
          { 
            id: 'technical-expert', 
            label: 'Deep technical expert in my field',
            description: 'Senior engineer, architect, or specialist'
          },
          { 
            id: 'team-lead', 
            label: 'Leading a team of professionals',
            description: 'Manager, team lead, or director'
          },
          { 
            id: 'entrepreneur', 
            label: 'Running my own business or startup',
            description: 'Founder, CEO, or independent consultant'
          },
          { 
            id: 'researcher', 
            label: 'Contributing to cutting-edge research',
            description: 'PhD, research scientist, or academic'
          },
          { 
            id: 'versatile', 
            label: 'Versatile professional with diverse experience',
            description: 'Cross-functional role spanning multiple areas'
          }
        ]
      },
      {
        id: 'industry-preference',
        text: 'Which industries interest you the most? (Select all that apply)',
        type: 'multiple',
        category: 'career',
        options: [
          { id: 'tech', label: 'Technology & Software' },
          { id: 'finance', label: 'Finance & Banking' },
          { id: 'healthcare', label: 'Healthcare & Life Sciences' },
          { id: 'gaming', label: 'Gaming & Entertainment' },
          { id: 'education', label: 'Education & EdTech' },
          { id: 'ecommerce', label: 'E-commerce & Retail' },
          { id: 'security', label: 'Security & Defense' },
          { id: 'any', label: 'Open to any industry' }
        ]
      }
    ]
  }
];

/**
 * Get all questions as a flat array.
 * @returns Array of all questions across all steps
 */
export function getAllQuestions() {
  return QUESTIONNAIRE_STEPS.flatMap(step => step.questions);
}

/**
 * Get a specific question by ID.
 * @param id - The question ID to look up
 * @returns The question or undefined if not found
 */
export function getQuestionById(id: string) {
  return getAllQuestions().find(q => q.id === id);
}

/**
 * Get total number of questions.
 * @returns Total question count
 */
export function getTotalQuestionCount(): number {
  return getAllQuestions().length;
}
