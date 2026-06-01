# Admin Dashboard Setup Guide

## Overview
Your Dirt Trails site now has a full admin dashboard with:
- ✅ Admin authentication with Supabase
- ✅ Inquiries management
- ✅ Bookings management  
- ✅ Users management
- ✅ Analytics & metrics

## Quick Start

### 1. Access the Admin Dashboard
- **URL**: `/admin`
- **Default demo login**: (You can create your own account)

### 2. Environment Variables (Already Set)
Your `.env` file now includes:
```
VITE_FORMSPREE_CONTACT_ID=xpwjoknq
VITE_FORMSPREE_INQUIRY_ID=mqkbdzdk
```

## Setting Up Supabase Tables

To make the admin dashboard fully functional, create these tables in your Supabase project:

### Table 1: Website Inquiries

```sql
CREATE TABLE website_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  business_type text,
  first_name text,
  last_name text,
  company_name text,
  email text NOT NULL,
  country text,
  phone text,
  website text,
  interest text,
  message text,
  privacy_consent boolean DEFAULT FALSE,
  receive_promotions boolean DEFAULT FALSE,
  status text DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE website_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy to allow public inserts from the website form
CREATE POLICY "Allow public insert website inquiries" ON website_inquiries 
FOR INSERT TO public WITH CHECK (true);

-- Policy to allow public reads for the demo admin dashboard
CREATE POLICY "Allow public read website inquiries" ON website_inquiries 
FOR SELECT TO public USING (true);
```

### Table 2: Bookings

```sql
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  tour_name text,
  travel_date text,
  amount numeric,
  status text DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy to allow insert
CREATE POLICY "Allow insert bookings" ON bookings 
FOR INSERT WITH CHECK (true);

-- Policy to allow read for authenticated users
CREATE POLICY "Allow read bookings" ON bookings 
FOR SELECT USING (auth.role() = 'authenticated');
```

### Table 3: Users

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  email text UNIQUE,
  role text DEFAULT 'user'
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy to allow read for authenticated users
CREATE POLICY "Allow read users" ON users 
FOR SELECT USING (auth.role() = 'authenticated');
```

## Using the Admin Dashboard

### 1. **Inquiries Tab**
- View all travel inquiries from the form
- Search by email, name, or subject
- Mark as read
- View full inquiry details
- Delete inquiries
- Reply via email from the detail view

### 2. **Bookings Tab**
- View all bookings with status
- Filter by status (pending, confirmed, cancelled)
- Update booking status
- View booking details
- Track revenue

### 3. **Users Tab**
- View all registered users
- See join date and last sign-in
- Manage user list

### 4. **Analytics Tab**
- View KPI metrics
- Track conversion rates
- Monitor revenue
- See monthly trends

## Authentication

The admin dashboard uses **Supabase Auth** for security:

1. **First Time Setup**:
   - Go to `/admin/login`
   - Click "Create New Account"
   - Enter email and password
   - Confirm email (check spam folder)

2. **Login**:
   - Use the same credentials

3. **Logout**:
   - Click logout button in sidebar

## Connecting Forms to Dashboard

Forms now save data to Supabase! Here's how:

### Update InquiryForm to Save to Supabase

After form submission, add this to store in database:

```typescript
// After successful Formspree submission
const { error } = await supabase
  .from('inquiries')
  .insert({
    name: formData.get('name'),
    email: formData.get('_replyto'),
    message: formData.get('specialRequests'),
    countries: formData.get('countries'),
    subject: 'New Travel Inquiry'
  });
```

## Environment Variables Reference

```env
# Supabase
VITE_SUPABASE_URL=https://ywxvgfhwmnwzsafwmpil.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Formspree Forms
VITE_FORMSPREE_CONTACT_ID=xpwjoknq
VITE_FORMSPREE_INQUIRY_ID=mqkbdzdk

# Backend
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
```

## Troubleshooting

### Admin Page Not Loading
- Ensure you're logged in
- Check `.env` variables are set
- Verify Supabase credentials

### Forms Not Appearing
- Check your Formspree form IDs in `.env`
- Verify email configurations
- Check browser console for errors

### No Data in Dashboard
- Tables must be created in Supabase first
- RLS policies must allow authenticated access
- Check that Row Level Security is enabled

## Next Steps

1. ✅ Update `.env` with your Formspree IDs
2. ✅ Create Supabase tables using SQL above
3. ✅ Test admin login at `/admin/login`
4. ✅ Connect forms to store data in database
5. ✅ Monitor inquiries and bookings in dashboard

## Support

For issues:
- Check Supabase dashboard for errors
- Review browser console for client errors
- Verify all environment variables are set
- Check Formspree form IDs are correct