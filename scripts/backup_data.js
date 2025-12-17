const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load env vars manually
const envPath = path.join(__dirname, '../.env.local');
let SUPABASE_URL = '';
let SUPABASE_KEY = '';
let IS_SERVICE_ROLE = false;

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            const val = value.join('=').trim().replace(/"/g, ''); // simple parsing
            if (key.trim() === 'NEXT_PUBLIC_SUPABASE_URL') SUPABASE_URL = val;
            if (key.trim() === 'SUPABASE_SERVICE_ROLE_KEY') {
                SUPABASE_KEY = val;
                IS_SERVICE_ROLE = true;
            }
            if (!SUPABASE_KEY && key.trim() === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
                SUPABASE_KEY = val;
            }
        }
    });
} catch (e) {
    console.error('Could not read .env.local file');
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase Credentials in .env.local');
    process.exit(1);
}

if (!IS_SERVICE_ROLE) {
    console.warn('WARNING: Using Anonymous Key. Private data (Orders, Reviews, Profiles) may not be backed up completely. Add SUPABASE_SERVICE_ROLE_KEY to .env.local for full backup.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const TABLES = [
    'profiles',
    'products',
    'product_media',
    'product_reviews',
    'orders',
    'order_items',
    'blogs'
];

async function backup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];
    const backupDir = path.join(__dirname, '../backups', `data_${timestamp}`);

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    console.log(`Starting backup to ${backupDir}...`);

    for (const table of TABLES) {
        console.log(`Backing up ${table}...`);
        const { data, error } = await supabase.from(table).select('*');

        if (error) {
            console.error(`Error backing up ${table}:`, error.message);
        } else if (data) {
            const filePath = path.join(backupDir, `${table}.json`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Saved ${data.length} rows to ${table}.json`);
        }
    }

    console.log('Backup operation finished.');
}

backup().catch(console.error);
