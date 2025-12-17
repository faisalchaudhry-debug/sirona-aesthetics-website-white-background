
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Using service role to bypass RLS if needed, or ANON if that's what we have

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkCategories() {
    const { data, error } = await supabase
        .from('products')
        .select('category')

    if (error) {
        console.error('Error fetching categories:', error)
        return
    }

    // Get distinct categories
    const categories = [...new Set(data.map((p: any) => p.category))]
    console.log('Distinct Categories in DB:', categories)
}

checkCategories()
