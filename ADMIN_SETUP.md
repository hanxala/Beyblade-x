# Admin Panel Setup Guide

## 🎯 Overview

The Beyblade-X admin panel provides a comprehensive interface for managing tournaments, users, rankings, content, and analytics.

## 🔐 Setting Up Admin Access

### Step 1: Configure Admin Role in Clerk

1. **Go to Clerk Dashboard**
   - Visit [https://dashboard.clerk.com](https://dashboard.clerk.com)
   - Select your Beyblade-X application

2. **Assign Admin Role to User**
   - Navigate to **Users** in the sidebar
   - Click on the user you want to make an admin
   - Go to the **Metadata** tab
   - Under **Public metadata**, click **Edit**
   - Add the following JSON:
     ```json
     {
       "role": "admin"
     }
     ```
   - Click **Save**

3. **Verify Admin Access**
   - Sign in with the admin user account
   - Navigate to `/admin` in your browser
   - You should see the admin dashboard

## 📱 Admin Panel Features

### Dashboard (`/admin`)
- View key platform statistics
- Monitor user growth and engagement
- See recent platform activity
- Quick access to common actions

### Tournament Management (`/admin/tournaments`)
- View all tournaments (upcoming, live, completed)
- Create new tournaments
- Edit tournament details
- Delete tournaments
- Filter and search tournaments

### User Management (`/admin/users`)
- View all registered users
- Search users by name, email, or city
- View user statistics and performance
- Ban/unban users
- Filter by user status

### Rankings Management (`/admin/rankings`)
- View player rankings
- See win rates and trends
- Adjust player points (coming soon)
- Track ranking changes

### Content Management (`/admin/content`)
- Create announcements
- Manage announcement visibility
- Delete announcements
- Choose announcement types (info, success, warning)

### Analytics & Reports (`/admin/analytics`)
- View user growth trends
- Monitor tournament activity
- Track registration trends
- See key platform metrics
- Export data (coming soon)

## 🎨 Admin Panel Design

The admin panel features:
- **Collapsible sidebar** navigation
- **Responsive design** for mobile and desktop
- **Dark theme** matching the main site
- **Glassmorphism effects** for modern UI
- **Color-coded status** indicators
- **Interactive charts** and visualizations

## 🔧 Technical Details

### Authentication
- Uses Clerk for authentication
- Role-based access control via metadata
- Middleware protection for all admin routes
- Automatic redirect for non-admin users

### Data Management
Currently using **mock data** for development:
- Easy to test and demo
- Structured for database integration
- TypeScript interfaces defined

**To connect a real database:**
1. Set up your database (MongoDB, PostgreSQL, etc.)
2. Create API routes in `src/app/api/`
3. Replace mock data imports with API calls
4. Update CRUD operations to use your database

### File Structure
```
src/
├── app/admin/              # Admin pages
│   ├── layout.tsx          # Admin layout with auth
│   ├── page.tsx            # Dashboard
│   ├── tournaments/        # Tournament management
│   ├── users/              # User management
│   ├── rankings/           # Rankings management
│   ├── content/            # Content management
│   └── analytics/          # Analytics & reports
├── components/admin/       # Admin components
│   ├── AdminSidebar.tsx    # Navigation sidebar
│   ├── AdminTopBar.tsx     # Top bar
│   ├── StatsCard.tsx       # Stat cards
│   └── ActivityFeed.tsx    # Activity feed
└── lib/
    ├── admin-auth.ts       # Admin utilities
    └── mockData.ts         # Mock data
```

## 🚀 Getting Started

1. **Ensure Clerk is configured**
   - Check that `.env.local` has Clerk keys
   - Verify Clerk is working on the main site

2. **Assign admin role**
   - Follow the steps above to add admin role in Clerk

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the admin panel**
   - Navigate to `http://localhost:3000/admin`
   - Sign in with your admin account

## 🔒 Security Best Practices

1. **Limit admin access**
   - Only assign admin role to trusted users
   - Regularly audit admin users

2. **Monitor admin actions**
   - Review activity logs
   - Track changes made by admins

3. **Use environment variables**
   - Keep API keys in `.env.local`
   - Never commit sensitive data to Git

4. **Implement audit logs** (recommended)
   - Track all admin actions
   - Store logs in database
   - Review regularly

## 📊 Mock Data

The admin panel includes comprehensive mock data:
- 5 sample tournaments
- 5 sample users with statistics
- Player rankings
- Announcements
- Activity logs
- Dashboard statistics

This allows you to:
- Test all features immediately
- Demo the admin panel
- Understand data structure
- Plan database schema

## 🎯 Next Steps

1. **Test all features**
   - Create a tournament
   - Manage users
   - Post an announcement
   - View analytics

2. **Customize as needed**
   - Adjust colors in `admin.css`
   - Add new admin pages
   - Modify mock data

3. **Plan database integration**
   - Choose your database
   - Design schema based on mock data interfaces
   - Create API routes
   - Replace mock data with real data

## 💡 Tips

- **Sidebar collapse**: Click the arrow button to collapse/expand
- **Mobile view**: Sidebar auto-collapses on small screens
- **Search & filters**: Use them to quickly find items
- **Confirmation dialogs**: Prevent accidental deletions
- **Status badges**: Color-coded for quick identification

## 🆘 Troubleshooting

**Can't access admin panel?**
- Verify admin role is set in Clerk metadata
- Check that you're signed in
- Clear browser cache and try again

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Check that Clerk environment variables are set

**Styling issues?**
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

## 📞 Support

For issues or questions:
1. Check the walkthrough documentation
2. Review the implementation plan
3. Inspect browser console for errors
4. Verify Clerk configuration

---

**Admin Panel Version**: 1.0.0  
**Last Updated**: December 2024  
**Built with**: Next.js 16, Clerk, TypeScript
