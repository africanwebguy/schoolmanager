# Ghana School Management System (GSMS)

A comprehensive school management system specifically tailored for Ghana's educational landscape.

## Overview

GSMS addresses all operational aspects of school administration while incorporating modern technology solutions. It is designed to be scalable, offline-capable, and integrated with local payment and notification systems.

## Documentation

For a detailed system blueprint, including module breakdowns, user roles, and technical architecture, please refer to the [Architecture Blueprint](docs/ARCHITECTURE.md).

## Core Modules

*   **Administration**: SIS, Staff, Academic, Finance.
*   **E-Learning**: LMS, Virtual Classroom, Digital Library.
*   **AI Features**: Predictive Analytics, Intelligent Scheduling.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

*   **Framework**: Next.js 16 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS 4
*   **Database**: Supabase (PostgreSQL)
*   **Authentication**: Supabase Auth
*   **Real-time**: Supabase Realtime

## Database Setup

This project uses Supabase as the backend database and authentication provider. To set up your database:

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Follow the detailed setup instructions in [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)
3. Configure your environment variables:

```bash
# Copy the example env file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features

*   🔐 **Role-based Authentication**: Separate login flows for Staff, Students, and Parents
*   📱 **Mobile-First Design**: Responsive interface that works on all devices
*   🌍 **Offline Support**: PWA capabilities for rural areas with limited connectivity
*   💰 **Mobile Money Integration**: Support for MTN, Vodafone, and AirtelTigo
*   🇬🇭 **GES Compliant**: Adheres to Ghana Education Service standards
