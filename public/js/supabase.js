import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://jmvqiqyxkcxuxkagshob.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdnFpcXl4a2N4dXhrYWdzaG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTYxOTgsImV4cCI6MjA5NDc5MjE5OH0.sfY75kTqfTHCt976Okpb0rLlcgQWpwEB_iPNd3Gb3K4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)