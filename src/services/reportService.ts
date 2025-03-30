
import { supabase } from "@/integrations/supabase/client";
import { Report, ReportLocation, ReportStatus } from "@/types/report";
import { Json } from "@/integrations/supabase/types";

export const fetchReports = async (): Promise<Report[]> => {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching reports:", error);
    throw new Error(error.message);
  }

  // Transform the data to match our Report type
  return (data || []).map(item => {
    // Parse the location properly
    let parsedLocation: ReportLocation | null = null;
    
    if (item.location) {
      const loc = item.location as Json;
      // Check if we can extract the expected properties
      if (
        typeof loc === 'object' && 
        loc !== null && 
        'latitude' in loc && 
        'longitude' in loc && 
        'name' in loc
      ) {
        parsedLocation = {
          latitude: Number(loc.latitude),
          longitude: Number(loc.longitude),
          name: String(loc.name),
        };
      }
    }
    
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      location: parsedLocation,
      images: item.images,
      status: item.status as ReportStatus,
      createdAt: item.created_at,
      userId: item.user_id
    };
  });
};

// Add the missing getAllReports function that's used in MapPage.tsx
export const getAllReports = async (): Promise<Report[]> => {
  return fetchReports();
};

export const submitReport = async (reportData: {
  title: string;
  description: string;
  location?: ReportLocation;
  images?: string[];
}): Promise<void> => {
  const { data: userData } = await supabase.auth.getSession();
  
  if (!userData.session) {
    throw new Error("You must be logged in to submit a report");
  }
  
  const { error } = await supabase
    .from('reports')
    .insert({
      title: reportData.title,
      description: reportData.description,
      location: reportData.location ? reportData.location : null,
      images: reportData.images || null,
      user_id: userData.session.user.id
    });

  if (error) {
    console.error("Error submitting report:", error);
    throw new Error(error.message);
  }
};
