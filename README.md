Portfolio Website
=================

Live Deployment
---------------

*   [Frontend LIVE LINK](https://nextjs-prisma-portfolio-frontend.vercel.app/)
*   [Backend API](https://next-prisma-portfolio-backend.vercel.app/)

Project Overview
----------------

This is a modern, responsive portfolio website built to showcase projects, blogs, and professional information. It includes a user-friendly dashboard for authenticated users to manage content, a contact form for inquiries, and a clean, intuitive interface with light/dark mode support. The application is designed with scalability and maintainability in mind, utilizing modern web development best practices.

### Key Features

*   **Responsive Design**: Fully responsive layout that works seamlessly across devices (desktop, tablet, mobile).
*   **Dynamic Content**: Displays projects and blog posts fetched from a backend API.
*   **Content Management**: Authenticated users can create, edit, and delete blogs and projects via a dashboard.
*   **Rich Text Editing**: Integrated rich text editor (Tiptap) for creating and editing blog posts and project descriptions.
*   **Theme Support**: Light and dark mode toggle with system preference detection.
*   **Authentication**: Secure login system with JWT-based authentication for dashboard access.
*   **SEO Optimization**: Includes metadata and proper URL structures for better search engine visibility.
*   **Interactive UI**: Smooth animations, hover effects, and transitions for an engaging user experience.
*   **Contact Form**: Client-side form with validation and toast notifications for user feedback.
*   **Error Handling**: Graceful handling of API errors and loading states with skeleton placeholders.

Technology Stack
----------------

### Frontend

*   **Next.js 14**: React framework for server-side rendering, static site generation, and API routes.
*   **React**: For building reusable UI components.
*   **TypeScript**: For type-safe JavaScript development.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **Shadcn/UI**: Reusable, accessible UI components.
*   **Tiptap**: Rich text editor for blog and project content creation.
*   **React Hot Toast**: For user notifications and feedback.
*   **Lucide Icons**: Modern icon library for UI elements.

### Backend

*   **Prisma ORM**: For database management and querying.
*   **PostgreSQL**: Relational database for storing blog and project data.
*   **Node.js/Express.js**: For the backend API.
*   **JWT**: For secure authentication.

### Deployment & Tools

*   **Vercel**: For hosting and automatic scaling of the frontend and backend.
*   **Git & GitHub**: Version control and source code management.
*   **ESLint & Prettier**: For code linting and formatting.
*   **Unsplash API**: For placeholder images in blogs and projects.

Setup Instructions
------------------

Follow these steps to set up the project locally.

### Prerequisites

*   **Node.js**: Version 18.x or higher.
*   **npm** or **yarn**: For package management.
*   **PostgreSQL**: Local or cloud-based database instance.
*   **Git**: For cloning the repository.

### Installation

1.  **Clone the Repository**:
    
        git clone https://github.com/mahadi-zulfiker/Nextjs-Prisma-Portfolio-Frontend
        cd portfolio
    
2.  **Install Dependencies**:
    
        npm install
        # or
        yarn install
    
3.  **Set Up Environment Variables**:
    
    Create a `.env.local` file in the project root and add:
    
        NEXT_PUBLIC_BACKEND_URL=https://next-prisma-portfolio-backend.vercel.app
    
4.  **Set Up the Backend**:
    *   Ensure the backend is running at [https://next-prisma-portfolio-backend.vercel.app](https://next-prisma-portfolio-backend.vercel.app).
    *   Configure the PostgreSQL database connection in the backend's `.env` file.
    *   Run database migrations:
        
            npx prisma migrate dev
        
5.  **Run the Development Server**:
    
        npm run dev
        # or
        yarn dev
    
    The app will be available at `http://localhost:3000`.
    
6.  **Build for Production**:
    
        npm run build
        npm run start
        # or
        yarn build
        yarn start
    
7.  **Access Default Credentials**:
    *   Email: `admin@example.com`
    *   Password: `password123`

### Project Structure

    portfolio/
    ├── src/
    │   ├── app/                    # Next.js app directory (pages and API routes)
    │   ├── components/             # Reusable React components
    │   ├── lib/                    # Utility functions (e.g., cn for classnames)
    │   ├── tools/                  # Scripts for project utilities
    │   └── globals.css             # Global styles
    ├── public/                     # Static assets
    ├── prisma/                     # Prisma schema (if included in the frontend repo)
    ├── .env.local                  # Environment variables
    ├── next.config.mjs             # Next.js configuration
    ├── tsconfig.json               # TypeScript configuration
    ├── package.json                # Dependencies and scripts
    └── README.md                   # Project documentation
    

Additional Notes
----------------

*   **Authentication**: The dashboard requires a valid JWT token stored in `localStorage`. Ensure the backend API is configured to issue tokens upon successful login.
*   **Image Handling**: The project uses Unsplash for placeholder images. For production, consider hosting images on a CDN or integrating a file upload system.
*   **Performance**: The app uses Incremental Static Regeneration (ISR) with a revalidation interval of 3600 seconds (1 hour) for blog and project pages.
*   **Security**: Input validation is implemented using Zod for the login form. Ensure additional validation on the backend for blog and project submissions.
*   **Customization**: Update the contact information, social media links, and profile picture in the respective components (`About`, `Contact`, `Footer`, `Home`).
*   **Testing**: Add unit tests using Jest and React Testing Library for critical components like `BlogForm` and `ProjectForm`.
*   **Deployment**: The project is optimized for Vercel, but can be deployed to other platforms like Netlify or AWS with minimal configuration changes.

Contributing
------------

Contributions are welcome! Please:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/your-feature`).
3.  Commit your changes (`git commit -m "Add your feature"`).
4.  Push to the branch (`git push origin feature/your-feature`).
5.  Open a pull request.

License
-------

This project is licensed under the MIT License.