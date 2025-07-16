# Notebook Frontend Social Media App

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Getting Started](#getting-started)
5. [Deployment](#deployment)
6. [Contributing](#contributing)
7. [License](#license)

## Project Overview

**Notebook** is a college-focused social media platform combining professional networking and community discussions. The _Notebook Frontend_ provides the web interface where students can sign up, create profiles, and connect with peers. Inspired by LinkedIn’s networking features and Reddit’s discussion forums, the app lets users share posts, follow others, join interest-based groups, comment on threads, and engage in real-time chat within a responsive web UI.

## Tech Stack

The frontend is built with a modern React-based stack. Key technologies include:

- **React (v19)** – A component-based UI library for building web interfaces.
- **Vite** – A next-generation build tool and dev server that is _“blazing fast”_ for frontend development. It provides hot-module replacement and an optimized Rollup build for production.
- **TypeScript** – Adds static typing to JavaScript for better developer productivity.
- **Tailwind CSS** – A utility-first CSS framework for rapid styling.
- **DaisyUI** – A Tailwind CSS plugin offering pre-built UI components and theming.
- **Redux Toolkit** – State management library for managing global app state.
- **React Router** – Client-side routing library for navigating between pages.
- **TanStack React Query** – Data-fetching and caching library for server state.
- **Axios** – Promise-based HTTP client for API calls.
- **Socket.IO** – Real-time bidirectional communication (used for live chat).

## Features

Notebook’s frontend supports all main user-facing features of the platform, including:

- **User Authentication:** Sign up and log in with email/password, including password hashing and JWT sessions.
- **Profiles & Connections:** Create/edit personal profiles (e.g. name, college, skills), view others’ profiles, and manage connections. Users can send/accept friend requests or follow/unfollow others.
- **Posts & Discussions:** Create, read, update, and delete posts in public feeds or groups. Users can like posts and leave comments (including nested replies) on any discussion.
- **Groups:** Create or join interest-based groups. Group members can post within the group feed, and creators can assign moderators.
- **Media Upload:** Attach images to posts via a cloud storage integration (e.g. Cloudinary).
- **Real-Time Chat:** Chat or message other users in real time using WebSocket communication.
- **Responsive Design:** Fully responsive layouts styled with Tailwind/DaisyUI ensure the app works on desktops and mobile devices.

## Getting Started

To run the Notebook frontend locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Redpandanot/Notebook-Frontend-Social-Media-App.git
    cd Notebook-Frontend-Social-Media-App
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment:** Create a .env file in the project root to specify the backend API endpoints. For example:

    ```bash
    VITE_API_URL=http://localhost:5000/api
    VITE_SOCKET_URL=http://localhost:5000
    ```

    Adjust these URLs to point to your Notebook Backend server.

4.  **Run the dev server:**

    ```bash
    npm run dev
    ```

    This starts the Vite development server (default at http://localhost:5173). Ensure the backend server is running so the frontend can fetch data.

## Deployment

For production deployment:

Run npm run build to generate optimized static files in the dist/ directory.
Deploy the contents of dist/ to a static web host or server (e.g. Vercel, Netlify, GitHub Pages).
On the production host, set the same environment variables (e.g. VITE_API_URL) so the frontend knows the backend’s location.
