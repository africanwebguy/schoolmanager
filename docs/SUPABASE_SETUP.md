# Supabase Setup Guide for GSMS

This guide will help you set up Supabase for the Ghana School Management System (GSMS).

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed
- Access to the GSMS project repository

## Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in the project details:
   - **Project Name**: GSMS (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest region to Ghana (e.g., Europe West)
4. Click "Create new project"
5. Wait for the project to be provisioned (this may take a few minutes)

## Step 2: Get Your API Keys

1. Once your project is created, navigate to **Settings** > **API**
2. Copy the following values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 3: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 4: Set Up Database Schema

Run the following SQL commands in the Supabase SQL Editor (Dashboard > SQL Editor):

### 1. Create User Types Enum

```sql
-- Create enum for user types
CREATE TYPE user_type AS ENUM ('student', 'staff', 'parent', 'admin');
```

### 2. Create User Profiles Table

```sql
-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  user_type user_type NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  profile_image_url TEXT,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add index for faster lookups
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_user_type ON user_profiles(user_type);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own profile
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);
```

### 3. Create Students Table

```sql
-- Create students table
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  student_id TEXT UNIQUE NOT NULL,
  ges_id TEXT,
  admission_date DATE NOT NULL,
  class TEXT,
  section TEXT,
  roll_number TEXT,
  parent_id UUID REFERENCES user_profiles(id),
  blood_group TEXT,
  medical_conditions TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add indexes
CREATE INDEX idx_students_student_id ON students(student_id);
CREATE INDEX idx_students_user_profile_id ON students(user_profile_id);
CREATE INDEX idx_students_parent_id ON students(parent_id);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
```

### 4. Create Staff Table

```sql
-- Create staff table
CREATE TABLE staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  staff_id TEXT UNIQUE NOT NULL,
  employee_type TEXT, -- Teacher, Admin, Support
  department TEXT,
  designation TEXT,
  qualification TEXT,
  joining_date DATE NOT NULL,
  salary DECIMAL(10, 2),
  bank_account_number TEXT,
  ssnit_number TEXT,
  tin_number TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add indexes
CREATE INDEX idx_staff_staff_id ON staff(staff_id);
CREATE INDEX idx_staff_user_profile_id ON staff(user_profile_id);

-- Enable RLS
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
```

### 5. Create Parents Table

```sql
-- Create parents table
CREATE TABLE parents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id TEXT UNIQUE NOT NULL,
  relationship TEXT, -- Father, Mother, Guardian
  occupation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add indexes
CREATE INDEX idx_parents_parent_id ON parents(parent_id);
CREATE INDEX idx_parents_user_profile_id ON parents(user_profile_id);

-- Enable RLS
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
```

### 6. Create Function to Update timestamp

```sql
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all relevant tables
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at
  BEFORE UPDATE ON staff
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parents_updated_at
  BEFORE UPDATE ON parents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 7. Create Function to Auto-Create User Profile

```sql
-- Function to automatically create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, user_type, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'staff')::user_type,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

## Step 5: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. You should see the login page

## Step 6: Create Test Users

You can create test users either through:

1. **Supabase Dashboard**:
   - Go to Authentication > Users
   - Click "Add user"
   - Fill in email and password

2. **Through the Application**:
   - Create a signup page (to be implemented)
   - Or use the Supabase client directly

### Example: Create Test Users via SQL

```sql
-- Note: This is for development only. In production, use proper authentication flows.

-- Create test staff user
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES ('staff@gsms.edu.gh', crypt('password123', gen_salt('bf')), now());

-- Get the user ID and create profile
-- (Or let the trigger handle it automatically)
```

## Step 7: Configure Authentication Settings

1. Go to **Authentication** > **Settings** in your Supabase Dashboard
2. Configure the following:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add your production URLs when deploying
   - **Email Templates**: Customize confirmation and password reset emails
   - **Email Auth**: Enable if you want email/password authentication

## Step 8: Enable Email Confirmations (Optional)

By default, email confirmation is enabled. To disable it for development:

1. Go to **Authentication** > **Settings**
2. Scroll to **Email Auth**
3. Toggle "Enable email confirmations" off (for development only)

## Security Best Practices

1. **Never expose your service_role key** - only use the anon/public key in client-side code
2. **Always use Row Level Security (RLS)** for your tables
3. **Validate user input** on both client and server sides
4. **Use environment variables** for sensitive data
5. **Enable MFA** for admin accounts in production

## Mobile Money Integration (Future)

For integrating Mobile Money payments with Supabase:

1. Create a `transactions` table
2. Use Supabase Edge Functions to handle payment webhooks
3. Store payment provider credentials in Supabase Vault

## Offline Support

For offline functionality:

1. Use Supabase Realtime for data synchronization
2. Implement local storage caching in the PWA
3. Use service workers to queue failed requests

## Troubleshooting

### Issue: "Invalid API Key"
- Check that your `.env.local` file has the correct values
- Restart your development server after changing environment variables

### Issue: "Row Level Security" errors
- Ensure RLS policies are correctly set up
- Check that the user is authenticated before accessing protected resources

### Issue: "CORS errors"
- Add your frontend URL to the allowed origins in Supabase settings

## Next Steps

1. Set up additional tables for:
   - Classes and subjects
   - Attendance records
   - Grades and assessments
   - Financial transactions
   - Library management

2. Implement additional features:
   - Password reset functionality
   - Email verification
   - Two-factor authentication
   - Social login (Google, etc.)

3. Deploy to production:
   - Update environment variables with production URLs
   - Enable email confirmations
   - Set up proper RLS policies
   - Configure backup strategy

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth with Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
