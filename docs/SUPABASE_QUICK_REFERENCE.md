# Supabase Quick Reference for GSMS

Quick reference guide for common Supabase operations in the GSMS project.

## Client Setup

### Client-side (React Components)
```typescript
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();
```

### Server-side (Server Components, Server Actions)
```typescript
import { createClient } from '@/lib/supabase/server';

const supabase = await createClient();
```

## Authentication

### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});
```

### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      user_type: 'staff',
      full_name: 'John Doe',
    },
  },
});
```

### Sign Out
```typescript
const { error } = await supabase.auth.signOut();
```

### Get Current User
```typescript
const { data: { user } } = await supabase.auth.getUser();
```

### Get Session
```typescript
const { data: { session } } = await supabase.auth.getSession();
```

## Database Operations

### Select (Read)
```typescript
// Get all records
const { data, error } = await supabase
  .from('user_profiles')
  .select('*');

// Get with conditions
const { data, error } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('user_type', 'staff')
  .order('created_at', { ascending: false });

// Get single record
const { data, error } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('user_id', userId)
  .single();

// Get with joins
const { data, error } = await supabase
  .from('students')
  .select(`
    *,
    user_profiles(full_name, email),
    parents:parents(full_name, phone_number)
  `);
```

### Insert (Create)
```typescript
// Insert single record
const { data, error } = await supabase
  .from('user_profiles')
  .insert({
    user_id: userId,
    user_type: 'staff',
    full_name: 'John Doe',
  })
  .select();

// Insert multiple records
const { data, error } = await supabase
  .from('students')
  .insert([
    { student_id: 'STU001', full_name: 'Student 1' },
    { student_id: 'STU002', full_name: 'Student 2' },
  ])
  .select();
```

### Update
```typescript
// Update records
const { data, error } = await supabase
  .from('user_profiles')
  .update({ full_name: 'Jane Doe' })
  .eq('user_id', userId)
  .select();

// Update with conditions
const { data, error } = await supabase
  .from('students')
  .update({ is_active: false })
  .eq('class', 'JHS 3')
  .select();
```

### Delete
```typescript
// Delete records
const { error } = await supabase
  .from('user_profiles')
  .delete()
  .eq('id', profileId);

// Soft delete (preferred)
const { error } = await supabase
  .from('students')
  .update({ is_active: false })
  .eq('id', studentId);
```

## User Profile Queries

### Get User Profile by User ID
```typescript
const { data: profile, error } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('user_id', userId)
  .single();
```

### Get Student Details
```typescript
const { data: student, error } = await supabase
  .from('students')
  .select(`
    *,
    user_profile:user_profiles(
      full_name,
      phone_number,
      email
    ),
    parent:parents(
      full_name,
      phone_number
    )
  `)
  .eq('student_id', studentId)
  .single();
```

### Get Staff Details
```typescript
const { data: staff, error } = await supabase
  .from('staff')
  .select(`
    *,
    user_profile:user_profiles(
      full_name,
      phone_number,
      email
    )
  `)
  .eq('staff_id', staffId)
  .single();
```

## Real-time Subscriptions

### Subscribe to Table Changes
```typescript
const channel = supabase
  .channel('students-changes')
  .on(
    'postgres_changes',
    {
      event: '*', // 'INSERT' | 'UPDATE' | 'DELETE'
      schema: 'public',
      table: 'students',
    },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();

// Unsubscribe when component unmounts
return () => {
  supabase.removeChannel(channel);
};
```

## File Storage (Future Implementation)

### Upload File
```typescript
const { data, error } = await supabase.storage
  .from('profile-images')
  .upload(`${userId}/avatar.png`, file);
```

### Get Public URL
```typescript
const { data } = supabase.storage
  .from('profile-images')
  .getPublicUrl(`${userId}/avatar.png`);

console.log(data.publicUrl);
```

### Download File
```typescript
const { data, error } = await supabase.storage
  .from('profile-images')
  .download(`${userId}/avatar.png`);
```

## Common Patterns

### Check if User is Authenticated
```typescript
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  // Redirect to login
  redirect('/');
}
```

### Get User with Profile
```typescript
const { data: { user } } = await supabase.auth.getUser();
if (user) {
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();
}
```

### Role-based Access
```typescript
const { data: profile } = await supabase
  .from('user_profiles')
  .select('user_type')
  .eq('user_id', userId)
  .single();

if (profile?.user_type === 'admin') {
  // Allow admin access
}
```

## Error Handling

### Basic Error Handling
```typescript
const { data, error } = await supabase
  .from('user_profiles')
  .select('*');

if (error) {
  console.error('Error:', error.message);
  return;
}

// Use data
console.log(data);
```

### Try-Catch for Server Actions
```typescript
'use server';

export async function updateProfile(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ full_name: formData.get('name') })
      .eq('user_id', userId)
      .select();

    if (error) throw error;

    revalidatePath('/profile');
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## TypeScript Types

### Import Database Types
```typescript
import type { UserProfile, Student, Staff, Parent } from '@/lib/types/database.types';

// Use types
const profile: UserProfile = {
  id: '123',
  user_id: 'user123',
  user_type: 'staff',
  full_name: 'John Doe',
  // ...
};
```

## Performance Tips

1. **Use select() to specify columns**: Only fetch what you need
   ```typescript
   .select('id, full_name, email')
   ```

2. **Use indexes**: Queries on indexed columns are faster

3. **Batch operations**: Insert/update multiple records at once

4. **Use RLS policies**: Let the database handle access control

5. **Cache on client**: Use React Query or SWR for client-side caching

## Security Best Practices

1. Always use Row Level Security (RLS)
2. Never expose service_role key in client code
3. Validate data on both client and server
4. Use prepared statements (Supabase does this automatically)
5. Implement rate limiting for sensitive operations

## Resources

- [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
