<div align="center">

<img src="https://advisor-omega.vercel.app/ac-logo.png" alt="Academic Compass Logo" width="120" />

# 🎓 Academic Compass — Ungarov Advisor

**Smart Academic Specialization Advisor**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-advisor--omega.vercel.app-6366f1?style=for-the-badge)](https://advisor-omega.vercel.app/en)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> A transparent, rule-based expert system that guides students toward their ideal academic specialization — built with clarity and trust, not black-box AI.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Specializations Covered](#-specializations-covered)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Expert Rule Engine](#-expert-rule-engine)
- [Screenshots](#-screenshots)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧭 Overview

**Academic Compass (Ungarov Advisor)** is a rule-based expert system designed to help students identify the right academic specialization. Unlike opaque machine learning models, every recommendation is fully explainable — users always know *why* a path was suggested.

The system evaluates answers to a **15-question assessment** against **70+ weighted expert rules**, returning the **top 3 personalized recommendations** with match scores and detailed explanations.

```
IF   interest     = "programming"
AND  skill        = "logical thinking"
THEN recommend    = "Computer Science"
WITH confidence   = 92%
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **Expert Rule Engine** | 70+ hand-crafted IF-THEN rules by academic & industry specialists |
| 🎯 **Personalized Results** | Top 3 specialization matches with individual confidence scores |
| 💡 **Explainable Recommendations** | Clear reasoning behind every suggestion — no black-box mystery |
| 🔐 **Privacy First** | Answers processed in real-time; never sold or shared with third parties |
| 💾 **Save & Track** | Create a free account to save history and track interest evolution |
| 🌐 **Multi-language Support** | Interface available in multiple languages |
| ♻️ **Retake Anytime** | Reassess as your skills and interests grow |
| 🆓 **Completely Free** | No paywalls, no premium tiers |

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   1. Answer 15 Questions                                │
│      Interests · Skills · Career Goals                  │
│                        │                               │
│                        ▼                               │
│   2. Expert Rule Engine                                 │
│      70+ weighted rules evaluated against answers       │
│                        │                               │
│                        ▼                               │
│   3. Ranked Results                                     │
│      Top 3 Specializations + Match Score + Explanation  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

1. **Answer 15 Questions** — A thoughtfully designed survey covering your interests, technical skills, creative abilities, and long-term career goals.
2. **Rule Engine Analysis** — Your answers are matched against a comprehensive knowledge base of 70+ rules developed by domain experts.
3. **Get Ranked Results** — Receive your top 3 specialization matches, each with a score and a human-readable explanation.
4. *(Optional)* **Save Progress** — Register a free account to revisit past assessments and observe how your profile evolves.

---

## 🎓 Specializations Covered

The system provides guidance across **10 in-demand fields** in technology and business:

| # | Specialization |
|---|---|
| 1 | 💻 Computer Science |
| 2 | 📊 Data Science & Analytics |
| 3 | 🔒 Cybersecurity |
| 4 | 🌐 Web Development |
| 5 | 📱 Mobile App Development |
| 6 | 🎨 UI/UX Design |
| 7 | 🤖 Artificial Intelligence |
| 8 | 🎮 Game Development |
| 9 | ☁️ Cloud Computing & DevOps |
| 10 | 📈 Business & IT Management |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Deployment** | Vercel |
| **Auth** | Custom authentication (JWT) |
| **AI Engine** | Rule-based inference engine (custom) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn or pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/advisor-omega.git
cd advisor-omega

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in the required values in .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_database_url
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
advisor-omega/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx          # Landing page
│   │   ├── login/            # Authentication
│   │   ├── register/
│   │   └── more/             # About page
│   ├── questionnaire/        # 15-question assessment
│   └── api/                  # API routes
├── components/               # Reusable UI components
├── lib/
│   ├── rules/                # Expert rule definitions (70+ rules)
│   └── engine/               # Rule inference engine
├── public/                   # Static assets
├── messages/                 # i18n translation files
└── types/                    # TypeScript type definitions
```

---

## 🧩 Expert Rule Engine

The core of Advisor is a **forward-chaining rule-based inference engine**. Rules are defined as weighted conditions:

```typescript
// Example rule definition
{
  id: "CS_001",
  conditions: [
    { field: "interest", value: "programming", weight: 0.9 },
    { field: "skill",    value: "logic",       weight: 0.8 },
  ],
  conclusion: {
    specialization: "Computer Science",
    confidence: 0.92,
  },
  explanation: "Strong programming interest combined with logical thinking aligns with CS fundamentals."
}
```

**Key characteristics:**
- **70+ active rules** across all 10 specializations
- Each rule carries a **confidence weight** (0.0 – 1.0)
- Results are **aggregated and ranked** by total match score
- Every output includes a **human-readable explanation**

---

## 📸 Screenshots

| Landing Page | Assessment | Results |
|:---:|:---:|:---:|
| ![Landing](https://advisor-omega.vercel.app/_next/image?url=%2Fac-logo.png&w=256&q=75) | *15-question survey* | *Top 3 matches with scores* |

> 🔗 Try it live: [advisor-omega.vercel.app/en](https://advisor-omega.vercel.app/en)

---

## ❓ FAQ

**Is this AI or a traditional algorithm?**
> Advisor is a rule-based expert system — a classical form of AI using explicit IF-THEN rules, not neural networks. Every recommendation is fully explainable.

**How accurate are the recommendations?**
> Our system achieves approximately a **94% match rate** — users confirm the suggested specialization aligns with their interests. Accuracy improves with honest, thorough answers.

**Do I need an account?**
> No. Anyone can take the assessment and view results for free. An account is only needed to save your history.

**Can I retake the assessment?**
> Yes, as many times as you like. Your interests and skills evolve — we encourage periodic re-assessment.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development guidelines.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **[Ungarov Academy](https://advisor-omega.vercel.app)**

*This is a rule-based expert system, not a machine learning model.*

⭐ Star this repo if you found it useful!

</div>
