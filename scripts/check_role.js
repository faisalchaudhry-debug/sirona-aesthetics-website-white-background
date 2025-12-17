const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function checkUserRole(email) {
    try {
        const envPath = path.resolve(__dirname, '../.env.local');
        if (!fs.existsSync(envPath)) {
            console.error('Error: .env.local file not found at', envPath);
            return;
        }
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envFile.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2 && !line.trim().startsWith('#')) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim().replace(/(^"|"$)/g, '');
                envVars[key] = value;
            }
        });

        const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        // We ideally need service role key to search all users, but public profile access might work if RLS allows reading all profiles.
        // Our RLS: "Public profiles are viewable by everyone." -> We can read profiles using Anon key.

        const supabase = createClient(supabaseUrl, supabaseKey);

        console.log(`Checking role for email: ${email}`);

        const { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', email);

        if (error) {
            console.error('Error fetching profile:', error.message);
            return;
        }

        if (!profiles || profiles.length === 0) {
            console.log('No profile found for this email. Possible causes:');
            console.log('1. User has not signed up.');
            console.log('2. Trigger failed to create profile (common if trigger was added after signup).');
        } else {
            const profile = profiles[0];
            console.log('Profile found:');
            console.log(`- ID: ${profile.id}`);
            console.log(`- Role: ${profile.role}`);
            console.log(`- Approved: ${profile.is_approved}`);

            if (profile.role !== 'admin') {
                console.log(`\nISSUE DETECTED: User role is '${profile.role}', but needs to be 'admin'.`);
            } else {
                console.log('\nUser IS an admin. Access should work.');
            }
        }

    } catch (err) {
        console.error('Script error:', err.message);
    }
}

// Get email from command line arg
const email = process.argv[2];
if (!email) {
    console.log('Please provide an email address as an argument.');
} else {
    checkUserRole(email);
}
