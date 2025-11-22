# Beyblade-X Platform 🎯

A modern, full-stack tournament management platform for Beyblade competitions across India. Built with Next.js, MongoDB, and cutting-edge technologies.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green?style=flat-square&logo=mongodb)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=flat-square)

## ✨ Features

### 🏆 Tournament Management
- **Create & Manage Tournaments** - Full CRUD operations for tournaments
- **Real-time Status Updates** - Live, upcoming, and completed tournaments
- **Image Upload** - Cloudinary integration for tournament images
- **Registration System** - Track participants and manage capacity
- **Admin Dashboard** - Comprehensive tournament administration

### 👥 User Management
- **Clerk Authentication** - Secure user authentication and management
- **User Profiles** - Player statistics and tournament history
- **Role-Based Access** - Admin and user roles with permissions
- **Activity Tracking** - Complete audit trail of user actions

### 📊 Rankings & Leaderboards
- **Real-time Rankings** - Dynamic player leaderboards
- **Statistics Tracking** - Wins, losses, points, and win rates
- **City-based Rankings** - Regional competition tracking
- **Automated Updates** - Daily ranking recalculation

### 🔔 Notifications & Workflows
- **Inngest Integration** - Event-driven background jobs
- **Welcome Emails** - Automated user onboarding
- **Tournament Reminders** - 24-hour advance notifications
- **Results Processing** - Automatic result handling
- **Scheduled Tasks** - Daily rankings and weekly digests

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first, works on all devices
- **Dark Theme** - Sleek, modern dark interface
- **Animations** - Smooth transitions and micro-interactions
- **Glassmorphism** - Premium visual effects
- **Dynamic Hero Section** - Auto-rotating tournament images

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **CSS Modules** - Scoped styling
- **React 19** - Latest React features

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database with Mongoose ODM
- **Clerk** - Authentication and user management
- **Inngest** - Background jobs and workflows

### Media & Storage
- **Cloudinary** - Image upload and optimization
- **Next Cloudinary** - Optimized image delivery

### DevOps
- **Git** - Version control
- **npm** - Package management
- **ESLint** - Code linting

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Clerk account
- Cloudinary account (optional)
- Inngest account (optional for production)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/hanxala/Beyblade-x.git
cd Beyblade-x
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Cloudinary (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Inngest (Optional for production)
INNGEST_EVENT_KEY=your_event_key
INNGEST_SIGNING_KEY=your_signing_key
```

4. **Seed the database** (Optional)
```bash
npm run seed
```

5. **Run the development server**
```bash
npm run dev
```

6. **Run Inngest Dev Server** (Optional)
```bash
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
beyblade-x/
├── public/                    # Static assets
│   ├── beyblade-hero.png     # Hero section images
│   ├── tournament-arena.png
│   └── beyblade-action.png
├── scripts/                   # Utility scripts
│   └── seed.ts               # Database seeding
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── admin/           # Admin pages
│   │   ├── api/             # API routes
│   │   ├── profile/         # User profile
│   │   ├── rankings/        # Leaderboards
│   │   └── tournaments/     # Tournament pages
│   ├── components/          # React components
│   │   ├── Hero.tsx
│   │   ├── TournamentCard.tsx
│   │   ├── ImageUpload.tsx
│   │   └── ...
│   ├── inngest/             # Inngest workflows
│   │   ├── client.ts        # Inngest client
│   │   └── functions.ts     # Workflow functions
│   ├── lib/                 # Utilities
│   │   ├── mongodb.ts       # Database connection
│   │   ├── cloudinary.ts    # Image handling
│   │   └── admin-auth.ts    # Auth helpers
│   ├── models/              # Mongoose models
│   │   ├── User.ts
│   │   ├── Tournament.ts
│   │   ├── Announcement.ts
│   │   └── Activity.ts
│   └── styles/              # Global styles
├── .env.local               # Environment variables (not in repo)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Key Features Explained

### Cloudinary Integration
- Secure server-side image uploads
- Automatic image optimization
- Responsive image delivery
- Image deletion on record removal

### Inngest Workflows
- **Welcome Email** - Sent when user signs up
- **Tournament Reminder** - 24h before tournament
- **Results Processing** - After tournament completion
- **Daily Rankings** - Midnight recalculation
- **Weekly Digest** - Monday morning summary

### Admin Features
- Create and manage tournaments
- Upload tournament images
- View all users and activities
- Manage announcements
- Access analytics dashboard

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with sample data
```

### Database Models

- **User** - Player profiles and statistics
- **Tournament** - Tournament information and metadata
- **Announcement** - Platform announcements
- **Activity** - Audit trail and activity logs

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to add all environment variables from `.env.local` to your hosting platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Hanzala**
- GitHub: [@hanxala](https://github.com/hanxala)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Clerk for authentication
- Cloudinary for image management
- Inngest for workflow automation
- MongoDB for the database

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Built with ❤️ for the Beyblade community in India 🇮🇳
