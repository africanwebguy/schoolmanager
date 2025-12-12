# GSMS Setup Instructions

Welcome to the Ghana School Management System (GSMS)! This guide will help you get the project up and running.

## Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier available at [supabase.com](https://supabase.com))

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Where to find these values:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings** > **API**
4. Copy the **Project URL** and **anon/public** key

### 3. Set Up Supabase Database

Follow the comprehensive guide in [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md) to:
- Create your Supabase project
- Set up the database schema
- Configure authentication
- Enable Row Level Security

**TL;DR** - Run the SQL commands from the setup guide in your Supabase SQL Editor.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the login page.

## Project Structure

```
gsms/
├── app/                    # Next.js App Router pages
│   ├── actions/           # Server actions
│   │   └── auth.ts        # Authentication actions
│   ├── dashboard/         # Admin dashboard pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Login page (landing page)
├── lib/                   # Utility libraries
│   ├── supabase/         # Supabase client utilities
│   │   ├── client.ts     # Browser client
│   │   ├── server.ts     # Server client
│   │   └── middleware.ts # Auth middleware helper
│   └── types/            # TypeScript type definitions
│       └── database.types.ts
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md    # System architecture blueprint
│   ├── SUPABASE_SETUP.md # Detailed Supabase setup
│   └── SUPABASE_QUICK_REFERENCE.md # Quick reference guide
├── proxy.ts              # Next.js proxy/middleware for auth
└── .env.local            # Environment variables (create this)
```

## Features Implemented

### ✅ Authentication System
- Role-based login (Staff, Student, Parent)
- Supabase Auth integration
- Protected routes with middleware
- Session management

### ✅ Landing Page
- Professional login interface
- Ghana-themed design (green, yellow, red)
- Mobile-responsive layout
- Dark mode support
- Loading states and error handling

### ✅ Database Integration
- Supabase PostgreSQL setup
- User profiles table
- Students, Staff, and Parents tables
- Row Level Security (RLS) policies
- TypeScript type definitions

## Development Workflow

### Running Tests (To be implemented)
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## User Roles

The system supports four user types:
- **Student**: Access to LMS, grades, attendance
- **Staff**: Teachers and administrators
- **Parent**: View ward's progress and pay fees
- **Admin**: Full system access

## Next Steps

After completing the setup:

1. **Create Test Users**: Use the Supabase Dashboard or SQL commands to create test accounts
2. **Explore Documentation**: Read the architecture blueprint and quick reference guides
3. **Start Development**: Begin implementing features based on the architecture blueprint

## Common Issues

### Issue: "Invalid API Key"
**Solution**: Ensure your `.env.local` file has the correct Supabase credentials and restart the dev server.

### Issue: Build Warnings
**Solution**: These are typically informational. The build should still succeed.

### Issue: Cannot Connect to Database
**Solution**: 
1. Check your internet connection
2. Verify Supabase project is active
3. Confirm environment variables are correct

## Resources

- [Project Architecture](docs/ARCHITECTURE.md)
- [Supabase Setup Guide](docs/SUPABASE_SETUP.md)
- [Supabase Quick Reference](docs/SUPABASE_QUICK_REFERENCE.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

For issues or questions:
1. Check the documentation in the `docs/` folder
2. Review the Supabase setup guide
3. Consult the architecture blueprint for design decisions

## License

This project is designed for educational institutions in Ghana.

---

**Happy Coding! 🇬🇭**
