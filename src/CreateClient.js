import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(
    "https://hyifcbxonxhtxeeqrtgg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5aWZjYnhvbnhodHhlZXFydGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MDIyNjksImV4cCI6MjAxNTA3ODI2OX0.m8agOtNi1G5sO4Znc1t-lN1g3xBnQQlCQAENHVPH2tM"
    )