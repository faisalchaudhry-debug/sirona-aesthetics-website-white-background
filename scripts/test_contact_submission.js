const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function testSubmission() {
    try {
        const envPath = path.resolve(__dirname, '../.env.local');
        if (!fs.existsSync(envPath)) {
            console.error('Error: .env.local file not found');
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
            console.error('Missing Supabase credentials');
            return;
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        console.log('Attempting to insert test submission...');

        const { data, error } = await supabase
            .from('contact_submissions')
            .insert({
                first_name: 'Test',
                last_name: 'Script',
                email: 'test@example.com',
                message: 'This is a test from the debug script',
                source: 'test_script'
            })
            .select();

        if (error) {
            console.error('Insert Failed:', error.message);
            console.error('Details:', error);
        } else {
            console.log('Insert Successful!');
            console.log('Inserted data:', data);
        }

    } catch (err) {
        console.error('Script error:', err);
    }
}

testSubmission();
