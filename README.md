# Kishore Biradar — AI Engineering & Full-Stack Portfolio

A premium, production-grade Next.js portfolio website built for AI Engineers and Machine Learning optimization architects. The system features a responsive **AI Recruiter Assistant** (RAG indexing), an interactive **Job Matcher** utility, dynamic **Recruiter Role Customizations**, and structured case studies mapping deep learning optimization benchmarks.

---

## 🚀 Portfolio Core Purpose
This portfolio is engineered to communicate technical capabilities to recruiters and engineering managers within **30 seconds**. Instead of displaying simple text descriptions, it presents:
- **Optimization Philosophy**: Hardware-constrained neural model servicing.
- **Storytelling Narratives**: Core background, technical specializations, and future engineering paths.
- **Proof of Work**: Expected Calibration Error (ECE) calibrations, Triton container benchmarks, and hackathon milestones.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.3 (App Router with Turbopack compilation)
- **Styling**: Vanilla Tailwind CSS v4.0 (dark/light theme configurations)
- **State Management**: Zustand (Recruiter presets persistence)
- **Animations**: Framer Motion (reduced-motion media query support)
- **Type Checking**: Strict TypeScript
- **Auth**: Clerk Core Middleware (optional/configured toggle)
- **Database & ORM**: Supabase PostgreSQL / Drizzle ORM (RAG search schemas)

---

## ✨ Main Features

### 1. Recruiter Personalization Mode
Allows recruiters to toggle active roles in the navbar control panels to instantly customize the candidate story:
- **Presets**: ML Ops mode, Full-Stack AI, NLP Researcher, and default configurations.
- **Interactive UI tailoring**: Highlights specific projects, prioritizes skills radar vectors, and highlights targeted employment records.

### 2. Floating AI Assistant (Avatar RAG Portal)
- **Breathing Avatar Orb**: Configured with organic blinking and head sway animations (responsive on mobile, supporting reduced-motion variables).
- **Fallback Database**: Runs local keyword matching if OpenAI credentials are unconfigured, keeping RAG search functional.
- **Viseme Spectrum Waveform**: Displays visual feedback when speech synthesis loops generate answers.

### 3. ATS-Friendly Resume Viewer & Job Matcher
- **Resume Canvas**: High-contrast, clean layout matching parser expectations (downloadable PDF link).
- **Match My Profile Scanner**: Recruiters paste a target job description. The scanner checks the text against a structured skills glossary, outputs a matching score, flags missing components, and recommends the best resume persona version.

---

## 📁 Project Directory Structure

```text
├── public/                 # Static media and pdf resume documents
│   ├── profile.png        # Candidate headshot asset
│   └── resume.pdf         # Print-ready ATS PDF resume
├── src/
│   ├── app/                # Next.js App Router Page hierarchy
│   │   ├── about/          # Storytelling journey page
│   │   ├── admin/          # Clerk-protected administrator pages
│   │   ├── api/            # API Route handlers (contact, tailoring, mock database)
│   │   ├── experience/     # Employment timeline page
│   │   ├── projects/       # Flagship case study routes
│   │   ├── resume/         # ATS resume and Job Matcher panel
│   │   └── page.tsx        # Homepage (story cards, flagship grids, trust signals)
│   ├── components/         # Reusable UI components
│   │   ├── ai-avatar.tsx   # Floating animated assistant widget
│   │   ├── navbar.tsx      # Main navigation with recruiter controls
│   │   └── skills-matrix.tsx # Interactive radar chart skills matrix
│   ├── lib/                # Core logic & databases
│   │   ├── job-matcher.ts  # Job specification matching algorithms
│   │   ├── projects.ts     # Unified project case study definitions
│   │   ├── resume-data.ts  # Structured resume details database
│   │   └── vector.ts       # Fallback keyword matching and semantic searches
│   └── store/              # Zustand global state definitions
```

---

## 💻 Local Development

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Environment Variables
Create a `.env` file in the root directory:
```env
# Clerk Authentication Keys (Optional fallback configuration)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder
CLERK_SECRET_KEY=sk_test_placeholder

# Database Configuration (Optional RAG persistence)
DATABASE_URL=postgresql://postgres:placeholder@db.supabase.co:5432/postgres

# OpenAI API Key (Optional real-time assistant responses)
OPENAI_API_KEY=sk-proj-placeholder

# Resend Email Service Keys (Required for contact form delivery)
RESEND_API_KEY=re_placeholder
CONTACT_EMAIL=biradarkishore07@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

### 3. Run Dev Server
```bash
pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to inspect the application.

## ⚡ Production Deployment & Optimization Guide

### 1. Database Setup
This application uses **Drizzle ORM** with **PostgreSQL**.
1. Provision a Postgres database (e.g., Supabase, Neon).
2. Grab the connection string.
3. Configure tables by running migrations from this workspace:
   ```bash
   pnpm drizzle-kit push
   ```
   *(Note: Skip this step if you are running in local fallback mode without `DATABASE_URL` configured.)*

### 2. Clerk Authentication Setup
Secure the `/admin` telemetry logs by setting up Clerk:
1. Create a application on the [Clerk Dashboard](https://dashboard.clerk.com).
2. Retrieve the **Publishable Key** and **Secret Key**.
3. In the Clerk dashboard settings, ensure the sign-in and sign-up URLs match your production domain.

### 3. Vercel Deployment Steps
1. Push your local workspace branch to your remote GitHub repository.
2. Link your repository in [Vercel](https://vercel.com).
3. Set the following environment variables in Vercel's **Environment Variables** project settings:
   - `NEXT_PUBLIC_APP_URL` (your production URL, e.g., `https://yourdomain.com`)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
4. Click **Deploy**. Vercel will automatically compile, optimize, and serve your application statically.

### 4. Post-Deployment Verification
Once your build succeeds on Vercel:
1. Load `https://yourdomain.com/` and confirm that all links and sections (Projects, About, Experience, Resume, Blog, Contact) navigate smoothly.
2. Navigate to `https://yourdomain.com/admin`. Verify that Clerk intercepts the request and prompts you to sign in.
3. Test the contact form and matching engine to verify they complete successfully.
4. Interact with the floating AI Assistant avatar to verify fallback/live streaming matches queries.
