// FIX: Pinned versions for Supabase types reference and client for stability and to resolve tooling errors.
/// <reference types="https://esm.sh/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.2";

// IMPORTANT: This Edge Function acts as the server-side game loop.
// It must be deployed to your Supabase project.
//
// How to deploy:
// 1. Ensure you have the Supabase CLI installed.
// 2. Login: `supabase login`
// 3. Link your project: `supabase link --project-ref <YOUR_PROJECT_ID>`
// 4. Set the required secrets:
//    - `supabase secrets set SUPABASE_URL=https://<YOUR_PROJECT_ID>.supabase.co`
//    - `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<YOUR_PROJECT_SERVICE_ROLE_KEY>`
// 5. Deploy the function: `supabase functions deploy crash-tick`

console.log("Crash Tick function initializing!");

const TICK_INTERVAL_MS = 200; // Call the game tick function 5 times per second.

serve(async (_req) => {
  try {
    // Create a Supabase client with the service role key to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { global: { headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` } } }
    );

    // Call the game loop function in the database
    const { data, error } = await supabase.rpc('crash_game_tick');

    if (error) {
      console.error("Error calling crash_game_tick:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Critical error in Edge Function:", err.message);
    return new Response(String(err?.message ?? err), { status: 500 });
  }
}, {
  // This function is designed to be triggered by a cron job.
  // In Supabase, you can set up a cron job to call this function's endpoint.
  // For example, using a service like cron-job.org to ping the function URL
  // every second, which will in turn call the database function.
  // For local development, you can invoke it manually.
  // For production, a cron trigger is more reliable than setInterval.
  // Example cron command to run every second:
  // curl -i -X POST https://<project-id>.supabase.co/functions/v1/crash-tick
});

// The above `serve` function is designed for cron-job invocation.
// An alternative is a long-running instance using setInterval, but this
// is less common for Supabase Edge Functions. The cron approach is recommended.

/*
// --- Alternative long-running instance approach (less common) ---
// Note: This may not be the most cost-effective or reliable method
// on serverless platforms. A cron trigger is generally preferred.

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

setInterval(async () => {
  const { error } = await supabase.rpc('crash_game_tick');
  if (error) {
    console.error('Error in scheduled crash game tick:', error);
  } else {
    console.log('Crash tick executed successfully.');
  }
}, TICK_INTERVAL_MS);

serve((_req) => {
    return new Response("Crash ticker running with setInterval!", {
        headers: { "Content-Type": "application/json" },
    });
});

*/