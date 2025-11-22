# Clerk Authentication Setup

## Quick Start

To enable authentication in this application, you need to set up Clerk API keys.

### 1. Create a Clerk Account

1. Visit [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application
4. Choose your authentication methods (Email/Password, Google, etc.)

### 2. Get Your API Keys

1. In your Clerk Dashboard, navigate to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 3. Create Environment File

Create a file named `.env.local` in the root of this project with the following content:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

**Important**: Replace `pk_test_your_publishable_key_here` and `sk_test_your_secret_key_here` with your actual keys from the Clerk dashboard.

### 4. Start the Development Server

```bash
npm run dev
```

Your application will now have full authentication functionality!

## What's Included

✅ User Sign Up / Sign In  
✅ User Profile Management  
✅ Protected Routes (/profile, /tournaments/register)  
✅ Authentication UI in Header  
✅ Custom Beyblade-X Themed Components  

## Need Help?

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js + Clerk Guide](https://clerk.com/docs/quickstarts/nextjs)

## Security Note

⚠️ **Never commit your `.env.local` file to version control!**  
It's already included in `.gitignore` to prevent accidental commits.
