# PU Found & Lost Hub

A campus-wide lost and found portal that helps students and staff register missing items, report discoveries, and coordinate quick returns. The project is built with React, Vite, Tailwind CSS, and Firebase for authentication and data storage.

> **Project status:** Early development & scaffolding. Core pages, auth flow, and Firebase integration are being implemented.

## ✨ Features (Planned)

- Post lost or found items with rich item details and attachments.
- Browse a feed of latest reports with powerful filtering and search.
- Authenticate via Firebase to manage your submissions and receive updates.
- Responsive UI tailored for mobile and desktop campus users.
- Admin tooling to review, flag, and resolve reports.

## 🧰 Tech Stack

- **Frontend:** React 19, Vite 7, React Router DOM 7
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- **Backend services:** Firebase (Authentication, Firestore/Realtime DB)
- **Tooling:** ESLint 9, modern ES modules, npm scripts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or an alternative package manager (pnpm, yarn)
- A Firebase project with Web app credentials

### 1. Clone the repository

```bash
git clone https://github.com/fardin04/pu-found-lost-hub.git
cd pu-found-lost-hub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (or copy from a future `.env.example`). The Vite/Firebase setup typically requires:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Update the values with the credentials from your Firebase console.

### 4. Run the app locally

```bash
npm run dev
```

Open the URL printed in the terminal (defaults to `http://localhost:5173`). Vite supports hot module replacement for rapid iteration.

### 5. Build for production (optional)

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
pu-found-lost-hub/
├── public/                # Static assets served as-is
├── src/
│   ├── assets/            # Images, icons, and shared media
│   ├── components/        # Reusable UI widgets
│   ├── common/            # Cross-cutting utilities/helpers
│   ├── layout/            # Layout wrappers and navigation shells
│   ├── ui/                # Tailwind-driven UI primitives
│   ├── context/           # React context (e.g., AuthContext)
│   ├── hooks/             # Custom hooks (e.g., useAuth)
│   ├── lib/               # Firebase client & shared libraries
│   ├── pages/             # Page-level routes (Feed, Profile, Auth, etc.)
│   ├── App.jsx            # Root application component
│   └── main.jsx           # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

> Many directories currently contain scaffolding files awaiting implementation. Contributions should follow this structure to keep the codebase organized.

## 🔌 Available npm Scripts

- `npm run dev` – Start the Vite development server with HMR
- `npm run build` – Generate an optimized production build in `dist/`
- `npm run preview` – Preview the production build locally
- `npm run lint` – Run ESLint against the project source

## 🔐 Firebase Configuration Tips

- Enable email/password authentication (and any social providers you need) in the Firebase console.
- Set up a Firestore database with security rules that protect user data; document rules alongside the implementation when finalized.
- Consider using Firebase Storage for image uploads associated with lost/found posts.

## 🗺️ Roadmap

- [ ] Implement authentication context and custom `useAuth` hook
- [ ] Build Lost/Found post creation forms and validations
- [ ] Populate feed page with mock data and real Firebase data
- [ ] Add profile management and item history
- [ ] Connect push/email notifications for item status changes

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request describing your changes and testing steps

Please keep PRs focused and include screenshots or videos for UI updates when possible.

## 📝 License

This project has not yet selected a license. Add your preferred license by including a `LICENSE` file at the root of the repository.

## 🙌 Acknowledgements

- Inspired by campus lost & found initiatives that make student life easier.
- Built with the React + Vite ecosystem and the Firebase web SDK.
