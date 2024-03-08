# Client [[Thalia](https://github.com/izam-mohammed/thalia)]

Welcome to the Thalia frontend repository! This folder contains all the code for the frontend of our website, including both the user interface and the admin panel. Thalia is built with React.js and utilizes various libraries and tools for enhanced development.

## Features

- **User Interface:** Beautiful and intuitive user interface designed to empower women and provide personalized assistance and insights.
- **Admin Panel:** Dedicated admin panel for managing website content, user data, and other administrative tasks.
- **Tailwind CSS:** Utilizes Tailwind CSS for efficient and customizable styling, ensuring a consistent and visually appealing design.
- **Flowbite React:** Integrates Flowbite React components for responsive and accessible UI elements, enhancing user experience across devices.
- **React Redux Toolkit:** Implements React Redux Toolkit for global state management, allowing for efficient and scalable management of application state.
- **Lazy Loading and Code Splitting:** Utilizes lazy loading and code splitting techniques to improve performance and reduce initial loading times.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/izam-mohammed/thalia.git
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Visit `http://localhost:4000` in your browser to view the Thalia website.

## Directory Structure

The client folder is organized as follows:

```
client/
│
├── src/                      # Source code directory
│   ├── components/           # Reusable UI components
│   ├── pages/                # Page components
│   ├── app/                  # Redux store setup
│   ├── services/             # API services and utilities
│   ├── features/             # Redux state management
│   ├── routes/               # All of the routes
│   ├── assets/               # Public assets
│   ├── main.jsx              # Entry point for the application
│   └── App.jsx               # Main application component
│
├── public/                   # Public assets and HTML template
├── .eslintrc.json            # ESLint configuration
├── .prettierrc.json          # Prettier configuration
├── index.html                # Main html file
├── package.json              # NPM package configuration
├── tailwind.config.js        # configuration for tailwind
├── vercel.json               # Vercel deployment configuration
└── README.md                 # This README file
```

## Contributing

Contributions to the Thalia frontend are welcome! Please refer to the [CONTRIBUTING.md](../CONTRIBUTING.md) file for guidelines and instructions.

## License

This project is licensed under the MIT License - see the [LICENSE.md](../LICENSE) file for details.

## Acknowledgements

- Thalia team would like to thank the creators and contributors of Tailwind CSS, Flowbite React, and React Redux Toolkit for their amazing work and contributions.
- Special thanks to all contributors and supporters who help make Thalia frontend a reality.