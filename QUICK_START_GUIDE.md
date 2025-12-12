# Quick Start Guide - GSMS

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- A Supabase account (free at [supabase.com](https://supabase.com))

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Get these values:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings > API
4. Copy the URL and anon key

### Step 3: Set Up Database
1. Open Supabase SQL Editor
2. Run all SQL commands from `docs/SUPABASE_SETUP.md`
3. This creates:
   - user_profiles table
   - students table
   - staff table
   - parents table
   - All necessary triggers and RLS policies

### Step 4: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 What You'll See

### Login Page (/)
- Beautiful Ghana-themed login interface
- Select your role: Staff, Student, or Parent
- Enter credentials and sign in

### Dashboard (/dashboard)
- Overview with key statistics
- Quick action buttons
- Recent activity feed
- Role-based content

### Students Module (/dashboard/students)
- Complete student management interface
- Search and filter students
- View, edit, and manage student records

## 👥 Create Test Users

### Via Supabase Dashboard
1. Go to Authentication > Users
2. Click "Add User"
3. Enter email and password
4. User will automatically get a profile via trigger

### Via SQL (for testing)
```sql
-- Insert a test user (Supabase handles password hashing)
-- Then manually create profile:
INSERT INTO user_profiles (user_id, user_type, full_name, phone_number)
VALUES (
  'user-uuid-here',
  'staff',
  'Kwame Mensah',
  '+233 24 123 4567'
);
```

## 📚 Documentation

- **Full Setup**: `docs/SUPABASE_SETUP.md`
- **Quick Reference**: `docs/SUPABASE_QUICK_REFERENCE.md`
- **Architecture**: `docs/ARCHITECTURE.md`
- **What's Built**: `COMPLETED_FEATURES.md`

## 🔧 Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🆘 Troubleshooting

### "Invalid API Key"
- Check `.env.local` has correct Supabase credentials
- Restart dev server after changing environment variables

### "Table does not exist"
- Run all SQL commands from `docs/SUPABASE_SETUP.md`
- Check table names match exactly

### Login not working
- Ensure user exists in Supabase Auth
- Check user has a profile in user_profiles table
- Verify RLS policies are set up correctly

## 🎨 Features Available Now

✅ Login with role-based authentication  
✅ Protected dashboard with navigation  
✅ User profile display with logout  
✅ Statistics cards with real data  
✅ Students management interface  
✅ Role-based access control  
✅ Dark mode support  
✅ Mobile-responsive design  
✅ Ghana-themed styling  

## 🚧 Coming Soon

⏳ Add/Edit/Delete students  
⏳ Staff management module  
⏳ Attendance tracking  
⏳ Finance and fee collection  
⏳ Academic records and grading  
⏳ Reports and analytics  
⏳ Mobile Money integration  
⏳ Offline PWA capabilities  

## 📱 Test Login Flow

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "Staff" button
3. Enter test credentials
4. Should redirect to dashboard
5. See your name in header
6. Click avatar > Sign Out to logout

## 🎯 Next Actions

1. **Set up database** using `docs/SUPABASE_SETUP.md`
2. **Create test users** in Supabase Dashboard
3. **Test login** with different roles
4. **Explore dashboard** and navigation
5. **Check students page** to see the interface
6. **Start building** additional modules following the patterns!

## 💡 Pro Tips

- Use the sidebar to navigate between modules
- Dark mode auto-detects system preference
- All forms will validate data (to be implemented)
- Check browser console for any errors
- Use Supabase Dashboard to view data directly

## 🌟 You're All Set!

The Ghana School Management System is ready to use. Follow the steps above and you'll be up and running in minutes!

For detailed information about any feature, check the documentation in the `docs/` folder.

**Happy Managing! 🇬🇭**
