Ashvanth Task Manager


A modern, minimal task management web application built by Ashvanth to organize daily work, track progress, and visualize productivity in a clean dashboard. The app focuses on clarity, fast interactions, and a distraction‑free UI for managing personal or small‑team tasks.

Live demo
Deployed app: https://ashvanth-task-manager.lovable.app

Features
Create, edit, and delete tasks with clear titles and descriptions.

Organize tasks by status (for example: Todo, In Progress, Done) to track progress visually.

Prioritize work using simple indicators like due dates or priority tags (low/medium/high).

Clean, responsive layout that works well on desktop and mobile screens.

Built with a modern React + TypeScript + Tailwind + shadcn‑ui stack for smooth UI and fast development.
​

Ready to extend with analytics, dashboards, and routing for multiple pages.
​

Tech stack
Vite – fast frontend tooling and dev server.
​

React with TypeScript – component‑based UI and strong typing.
​

Tailwind CSS – utility‑first styling for rapid design.
​

shadcn‑ui – accessible, composable UI components.
​

Getting started
Prerequisites
Node.js and npm installed on your system.

Git installed (optional but recommended).

Setup
Clone the repository:

bash
git clone https://github.com/Ashvanth-M/Ashvanth-Task-Manager.git
cd Ashvanth-Task-Manager
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Open the local URL shown in the terminal (usually http://localhost:5173) in your browser.

Project structure
src/ – main application code (components, pages, routing, analytics, and core logic).
​

public/ – static assets.
​

index.html – HTML entry file and base metadata.
​

tailwind.config.ts – Tailwind configuration and design tokens.
​

tsconfig*.json – TypeScript configuration files.
​

vite.config.ts – Vite configuration.
​

You can extend this project by adding:

Separate pages for dashboard, task lists, analytics, and settings.
​

API integration to sync tasks with a backend and database.

User authentication so each user manages their own tasks.

Development notes
The codebase follows a React + TypeScript structure, making it easy to scale and refactor safely.
​

Tailwind and shadcn‑ui are used to keep the design consistent and easy to customize.
​

Configuration files like tailwind.config.ts and tsconfig.app.json are already set up for a modern development workflow.
​

Roadmap / ideas
Add task categories, labels, or projects.

Implement reminders and due‑date notifications.

Add charts to visualize completed vs pending tasks over time.

Support drag‑and‑drop between task columns.

Dark mode and theme customization.

Author
Ashvanth – design, development, and deployment of this task manager.

GitHub: @Ashvanth-M
