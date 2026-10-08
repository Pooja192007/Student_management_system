import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vtnqlkwdzydgetjtfdpy.supabase.co";
const supabaseKey = "sb_publishable_yLaIc_qYYs9LupWedqO36w_DYwz-9za";

export const supabase = createClient(supabaseUrl, supabaseKey);