import { createClient } from '@supabase/supabase-js';

// Credenciales directas temporalmente para descartar problemas con el .env
const supabaseUrl = 'https://hfvjzeqvgtxqhdkudypw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmdmp6ZXF2Z3R4cWhka3VkeXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MDg1NzMsImV4cCI6MjEwODI4NDU3M30.PxhrKEbekf2Azelu0TlveAJTaRgXDtWFEvQny56jJtk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);