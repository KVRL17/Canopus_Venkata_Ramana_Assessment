# DevBook - Developer Microblog Platform

A modern, responsive microblog platform designed specifically for developers to share quick updates, insights, and experiences with the community.

## 🚀 Features

### Authentication
- **Secure Sign Up/Login**: JWT-style authentication with persistent sessions
- **Session Management**: Automatic session persistence using localStorage
- **Protected Routes**: Secure access to authenticated-only features

### Post Management
- **Create Posts**: Share updates with title and content (300 character limit)
- **Edit Posts**: Modify your existing posts with real-time validation
- **Delete Posts**: Remove posts with confirmation dialog
- **Character Counter**: Live character count with visual feedback

### Feed & Discovery
- **Chronological Feed**: View all posts sorted by creation date
- **Author Information**: See post author and timestamp for each update
- **Real-time Updates**: Instant feed updates when posts are created/modified
- **Community Stats**: Track total posts, active users, and personal contributions

### User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, developer-focused design with smooth animations
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback during async operations

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **date-fns** for date formatting
- **Vite** for build tooling

### State Management
- **React Context API** for global state
- **Custom Hooks** for data management
- **localStorage** for data persistence

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **PostCSS** with Autoprefixer
- **Hot Module Replacement** for development

## 📱 Screenshots

<img width="1912" height="903" alt="image" src="https://github.com/user-attachments/assets/e75a547f-f2c3-4b11-b3c5-4e68c54d622e" />
<img width="1912" height="887" alt="image" src="https://github.com/user-attachments/assets/d3f7fd90-21d7-4b3f-90aa-8254083888a4" />
<img width="1865" height="882" alt="image" src="https://github.com/user-attachments/assets/993e3d24-4eb5-40e5-87ad-6c1aab3fd96e" />
<img width="1872" height="885" alt="image" src="https://github.com/user-attachments/assets/b074b1cd-f1c1-41e4-ba0d-cacc14276314" />





### Login/Signup Flow
- Clean authentication forms with validation
- Gradient branding and professional design

### Main Feed
- Card-based post layout
- Community statistics dashboard
- Quick post creation access

### Post Management
- Inline editing capabilities
- Delete confirmation dialogs
- Character limit indicators

### User Profile
- Personal post collection
- User statistics and activity
- Profile management interface

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devbook.git
   cd devbook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication forms
│   ├── Layout/         # Layout components
│   └── Posts/          # Post-related components
├── contexts/           # React Context providers
├── pages/              # Main page components
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) - Main brand color
- **Secondary**: Blue (#3B82F6) - Accent and links
- **Success**: Green (#10B981) - Success states
- **Background**: Gray (#F9FAFB) - Page background
- **Cards**: White (#FFFFFF) - Content containers

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body**: Clean, readable font stack
- **Code**: Monospace for technical content

### Components
- **Cards**: Subtle shadows with hover effects
- **Buttons**: Gradient backgrounds with smooth transitions
- **Forms**: Clean inputs with focus states
- **Icons**: Consistent Lucide React icon set

## 🔧 Key Features Implementation

### Authentication Flow
- Context-based user management
- Persistent session handling
- Protected route implementation
- Automatic redirects for unauthorized access

### Post Management
- Real-time character counting
- Optimistic UI updates
- Error handling with user feedback
- Chronological sorting with timestamps

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

### Frontend Deployment Options

#### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

#### Vercel
1. Connect your GitHub repository
2. Vercel will automatically detect Vite configuration
3. Deploy with zero configuration

#### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to gh-pages branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Vite** for the lightning-fast build tool

## 📞 Contact

**Your Name** - Venkata Ramana Karri

**Project Link**: [https://github.com/KVRL17/Canopus_Venkata_Ramana_Assessment/](https://canopus-venkata-ramana-assessment.vercel.app/login)
