# ParentChildLearning - Buganda Culture Learning Platform

A web application designed to help children learn about Buganda culture through interactive lessons, games, and quizzes.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/ParentChildLearning.git
cd ParentChildLearning

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## Development Setup

1. Configure environment variables:

```bash
# Create .env file in the root directory
touch .env

# Add the following variables
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
```

2. Start the development server:

```bash
# In the root directory
npm run dev
```

This will start:
- Client on `http://localhost:5173`
- Server on `http://localhost:5000`

## Mobile Device Access

To access the app on your mobile device during development:

1. Ensure your phone is connected to the same WiFi network as your computer

2. Find your computer's IP address:

```bash
# On Windows
ipconfig
# Look for IPv4 Address under your active network adapter
```

3. Access the app on your phone:
   - Open your phone's browser
   - Enter `http://YOUR_PC_IP:5173`
   - Example: `http://192.168.1.5:5173`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run tests
npm test
```

## Project Structure

```
ParentChildLearning/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and helpers
│   └── public/           # Static assets
│
├── server/                # Backend Express server
│   ├── routes/           # API routes
│   ├── auth/             # Authentication logic
│   └── storage/          # Database interactions
│
└── shared/               # Shared types and utilities
```

## Features

- Interactive learning modules
- Virtual museum
- Educational games
- Progress tracking
- Parent dashboard
- Child-friendly interface
- Authentication system
- Points and achievements system

## Technology Stack

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Shadcn/ui

### Backend
- Node.js
- Express
- SQLite/PostgreSQL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email [your-email@example.com](mailto:your-email@example.com) or open an issue in the repository.