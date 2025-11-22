# PU Found & Lost Hub

A campus-wide lost and found portal designed to assist students and staff in registering missing items, reporting discoveries, and coordinating quick returns. This project is built using React, Vite, Tailwind CSS, and Firebase for authentication and data storage, with Cloudinary for image uploads.

> **Project Status:** Actively developed. Core features, authentication flow, and Firebase integration are being implemented.

## ✨ Features

- Post lost or found items with detailed descriptions and image attachments.
- Upload images directly to Cloudinary for efficient storage and retrieval.
- Browse a feed of recent reports with filtering and search capabilities.
- Authenticate via Firebase to manage submissions and receive updates.
- Responsive design tailored for both mobile and desktop users.
- Admin tools for reviewing, flagging, and resolving reports.

## 🧰 Tech Stack

- **Frontend:** React 18, Vite 4, React Router DOM 6
- **Styling:** Tailwind CSS 3 (via `@tailwindcss/vite` plugin)
- **Backend Services:** Firebase (Authentication, Firestore)
- **Image Hosting:** Cloudinary for image uploads
- **Tooling:** ESLint, modern ES modules, npm scripts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or an alternative package manager (pnpm, yarn)
- A Firebase project with Web app credentials
- A Cloudinary account for image uploads

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/pu-found-lost-hub.git
cd pu-found-lost-hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root (or copy from `.env.sample`). The Vite/Firebase setup typically requires:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_CLOUDINARY_NAME=your-cloudinary-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

Update the values with the credentials from your Firebase and Cloudinary consoles.

### 4. Run the App Locally

```bash
npm run dev
```

Open the URL printed in the terminal (defaults to `http://localhost:5173`). Vite supports hot module replacement for rapid iteration.

### 5. Build for Production (Optional)

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
│   ├── components/        # Reusable UI components
│   ├── common/            # Utility functions and helpers
│   ├── layout/            # Layout wrappers and navigation components
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

> Many directories currently contain scaffolding files awaiting implementation. Contributions should follow this structure to maintain organization.

## 🔌 Available npm Scripts

- `npm run dev` – Start the Vite development server with hot module replacement.
- `npm run build` – Generate an optimized production build in `dist/`.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint against the project source.

## 🔐 Firebase Configuration Tips

- Enable email/password authentication (and any social providers you need) in the Firebase console.
- Set up a Firestore database with security rules that protect user data; document rules alongside the implementation when finalized.
- Consider using Firebase Storage for image uploads associated with lost/found posts.

## ☁️ Cloudinary Configuration Tips

- Create a Cloudinary account and set up your upload preset.
- Ensure your upload preset allows unsigned uploads if you are not using authentication.
- Update your `.env` file with your Cloudinary credentials.

## 🗺️ Roadmap

- [ ] Implement authentication context and custom `useAuth` hook.
- [ ] Build Lost/Found post creation forms and validations.
- [ ] Populate feed page with mock data and real Firebase data.
- [ ] Add profile management and item history.
- [ ] Connect push/email notifications for item status changes.

## 🤝 Contributing

1. Fork the project.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m "Add amazing feature"`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a pull request describing your changes and testing steps.

Please keep PRs focused and include screenshots or videos for UI updates when possible.

## 📝 License

This project has not yet selected a license. Add your preferred license by including a `LICENSE` file at the root of the repository.

## 🙌 Acknowledgements

- Inspired by campus lost & found initiatives that enhance student life.
- Built with the React + Vite ecosystem and the Firebase web SDK.
- Utilizes Cloudinary for efficient image management.
