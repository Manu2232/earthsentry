
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.5"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }
  
  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )
    
    // Create storage bucket if it doesn't exist
    const { data: bucketExists, error: bucketCheckError } = await supabaseAdmin
      .storage
      .getBucket('report-images')
      
    if (bucketCheckError && !bucketExists) {
      const { data, error } = await supabaseAdmin
        .storage
        .createBucket('report-images', { 
          public: true,
          fileSizeLimit: 5242880 // 5MB
        })
        
      if (error) throw error
      
      console.log("Created report-images bucket:", data)
      
      // Set up public policy
      const { error: policyError } = await supabaseAdmin
        .storage
        .from('report-images')
        .createPublicPolicy('public-reads')
        
      if (policyError) throw policyError
    }
    
    return new Response(
      JSON.stringify({ success: true, message: "Storage bucket setup completed" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
