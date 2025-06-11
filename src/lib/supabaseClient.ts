// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edjvffqlkoknldeslkyp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkanZmZnFsa29rbmxkZXNsa3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NTIyOTUsImV4cCI6MjA2NTEyODI5NX0.FC0R2heBjxajalKX4lRRt4mj5bKI3scRB1OQM1aouPI'

export const supabase = createClient(supabaseUrl, supabaseKey)