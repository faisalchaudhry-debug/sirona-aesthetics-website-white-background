const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function checkConnection() {
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

        if (!supabaseUrl || !supabaseKey) {
            console.error('Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local');
            console.log('Found keys:', Object.keys(envVars));
            return;
        }

        console.log(`Checking connection to: ${supabaseUrl}`);
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Try to fetch a single row or just check health
        const { data, error } = await supabase.from('products').select('*').limit(1);

        if (error) {
            console.error('Connection failed with Supabase error:', error.message, error.details || '');
        } else {
            console.log('Connection successful!');
            console.log('Successfully fetched data from "products" table.');
        }
    } catch (err) {
        console.error('Script execution error:', err.message);
    }
}

checkConnection();
