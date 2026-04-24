
# Invoice Web Application

Invoice Web is a modern, responsive web application for creating, managing, and viewing invoices. Built with React, TypeScript, Vite, and Tailwind CSS, it provides a seamless user experience for freelancers, small businesses, and anyone who needs to generate and track invoices efficiently.

## Features

- Create new invoices with dynamic item lists
- View detailed invoice information
- Filter and search invoices
- Responsive design for desktop and mobile
- Built with a scalable and maintainable folder structure

## Getting Started

Follow these steps to run the project locally on your system:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/meysdays/invoice-app-hng.git
   cd "invoice-app-hng"
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Build for Production

To build the app for production, run:

```bash
npm run build
```

## Project Structure & Approach

- **React + TypeScript + Vite:** The project uses React for UI, TypeScript for type safety, and Vite for fast development and builds.
- **Tailwind CSS:** For utility-first, responsive styling.
- **Component-Based Architecture:** UI is split into reusable components (see `src/component/`).
- **Context API:** Used for managing invoice state globally (see `src/context/invoice-context.tsx`).
- **Pages & Routing:** Each page (home, create invoice, invoice details) is in `src/pages/`.
- **Utilities & Constants:** Shared logic and constants are in `src/lib/` and `src/context/`.

This approach ensures scalability, maintainability, and a great developer experience.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
