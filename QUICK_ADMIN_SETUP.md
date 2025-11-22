# Quick Admin Setup - Clerk

## 🎯 Goal
Add admin role to your user account to access `/admin`

## 📝 Steps

1. **Go to Clerk Dashboard**
   ```
   https://dashboard.clerk.com
   ```

2. **Navigate to Users**
   - Click "Users" in the left sidebar
   - Find and click on your user account

3. **Edit Metadata**
   - Click the "Metadata" tab
   - Under "Public metadata", click "Edit"

4. **Add Admin Role**
   ```json
   {
     "role": "admin"
   }
   ```

5. **Save & Refresh**
   - Click "Save"
   - Sign out and sign back in to your app
   - Navigate to `/admin`

## ✅ Verification

Visit: `http://localhost:3000/admin`

You should see the admin dashboard!

## 🔧 Troubleshooting

**Still can't access?**
- Sign out and sign back in
- Clear browser cache
- Restart dev server: `npm run dev`
- Verify metadata is in **Public** (not Private)

**JSON Error?**
- Use double quotes: `"role"` not `'role'`
- Proper format: `{"role": "admin"}`

## 📚 Full Guide

See `clerk_admin_setup_guide.md` for detailed instructions with screenshots.
