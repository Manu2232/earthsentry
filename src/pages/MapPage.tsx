
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { getAllReports } from "@/services/reportService";
import { Report } from "@/types/report";
import { MapPin } from "lucide-react";

const MapPage = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await getAllReports();
        setReports(data);
      } catch (error) {
        toast({
          title: "Error loading map data",
          description: "Could not load report locations",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [toast]);

  return (
    <div className="container px-4 py-8 mx-auto md:py-16">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-primary-700">Illegal Mining Map</h1>
        <p className="text-gray-600">
          Visualize reported illegal mining activities across Ghana
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="space-y-4 text-center">
            <div className="inline-block w-12 h-12 border-4 rounded-full border-primary/30 border-t-primary animate-spin"></div>
            <p className="text-gray-500">Loading map data...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="col-span-2 h-[600px] bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
              <p className="text-gray-500">
                Interactive map coming soon
              </p>
              <p className="text-sm text-gray-400">
                This is where an interactive map will display all report locations
              </p>
            </div>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Reports</h2>
            <div className="space-y-3">
              {reports.slice(0, 5).map(report => (
                <Card key={report.id} className="p-4">
                  <h3 className="font-medium">{report.title}</h3>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {report.location.name || "Unknown location"}
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="p-4 rounded bg-primary-50 text-center">
                <p className="text-2xl font-bold text-primary">{reports.length}</p>
                <p className="text-xs text-gray-500">Total Reports</p>
              </div>
              <div className="p-4 rounded bg-primary-50 text-center">
                <p className="text-2xl font-bold text-primary">
                  {reports.filter(r => r.status === "investigating").length}
                </p>
                <p className="text-xs text-gray-500">Investigating</p>
              </div>
              <div className="p-4 rounded bg-primary-50 text-center">
                <p className="text-2xl font-bold text-primary">
                  {reports.filter(r => r.status === "resolved").length}
                </p>
                <p className="text-xs text-gray-500">Resolved</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
