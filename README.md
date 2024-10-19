# Efrei CV Generator Front

## Description

This project is a frontend application for a CV generator. It allows users to create and manage their CVs using a modern and interactive web interface. The application connects to a backend service to manage user data and CVs.

The project is built with React and Vite, with a modern stack of tools for optimized development and production environments. Tailwind CSS is used for styling, and the UI components are powered by Radix UI.

## Technologies

- **React**
- **Vite**
- **Tailwind CSS**
- **Formik**
- **Yup**
- **Radix UI**
- **React Router**
- **ESLint**

## Setup Instructions

### Step 1: Clone the repository

To get started with the project, clone the repository to your local machine:

```bash
git clone https://github.com/bricekc/efrei-cv-generator-front.git
cd efrei-cv-generator-front
```

### Step 2: Install dependencies

Install all necessary dependencies for the project using npm:

```bash
npm install
```

### Step 3: Create `.env` file

You need to create a `.env` file for environment-specific variables. Start by copying the `.env.example` file:

```bash
cp .env.example .env
```

In the `.env` file, replace the `VITE_BACK_URL` value with the correct URL of your backend API:

```
VITE_BACK_URL="http://your-backend-url:3000/api"
```

### Step 4: Available NPM Scripts

- **`npm run dev`**: Starts the development server using Vite. The app will be accessible at `http://localhost:5173`.
- **`npm run build`**: Builds the project for production.
- **`npm run lint`**: Runs ESLint to check for code quality issues.
- **`npm run preview`**: Previews the production build locally using Vite.
- **`npm run lint:fix`**: This command runs ESLint and automatically fixes any fixable linting issues in the codebase.
- **`npm run format`**: This command runs Prettier to format all files in the project according to the defined Prettier rules.
