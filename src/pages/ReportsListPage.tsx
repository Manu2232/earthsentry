
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, CalendarIcon, Image, ChevronRight } from "lucide-react";
import { Report, ReportStatus } from "@/types/report";
import { supabase } from "@/integrations/supabase/client";

const ReportsListPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Transform the data to match our Report type
        const formattedReports: Report[] = data.map(report => ({
          id: report.id,
          title: report.title,
          description: report.description,
          location: report.location,
          images: report.images || [],
          status: report.status as ReportStatus,
          createdAt: report.created_at,
          updatedAt: report.created_at // Using created_at as updatedAt since we don't have an updated_at field yet
        }));
        
        setReports(formattedReports);
        setFilteredReports(formattedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    let result = reports;
    
    // Filter by status
    if (activeTab !== "all") {
      result = result.filter(report => report.status === activeTab);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        report =>
          report.title.toLowerCase().includes(term) ||
          report.description.toLowerCase().includes(term) ||
          report.location.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredReports(result);
  }, [searchTerm, activeTab, reports]);

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending Review</Badge>;
      case "investigating":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Investigating</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container px-4 py-8 mx-auto md:py-16">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-primary-700">Illegal Mining Reports</h1>
        <p className="text-gray-600">
          Browse submitted reports of illegal mining activities across Ghana
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col mb-8 space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative w-full md:w-64">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            type="search"
            placeholder="Search reports..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="investigating">Investigating</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="space-y-4 text-center">
              <div className="inline-block w-12 h-12 border-4 rounded-full border-primary/30 border-t-primary animate-spin"></div>
              <p className="text-gray-500">Loading reports...</p>
            </div>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="p-10 text-center border rounded-lg">
            <p className="text-xl font-semibold text-gray-500">No reports found</p>
            <p className="mt-2 text-gray-400">
              {searchTerm || activeTab !== "all"
                ? "Try adjusting your filters"
                : "Be the first to report an illegal mining activity"}
            </p>
            <Link to="/report" className="mt-6">
              <Button>Submit a Report</Button>
            </Link>
          </div>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="overflow-hidden transition border border-gray-200 shadow-sm hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex flex-col justify-between mb-1 space-y-2 sm:flex-row sm:items-center sm:space-y-0">
                  <CardTitle className="text-lg font-semibold">{report.title}</CardTitle>
                  {getStatusBadge(report.status)}
                </div>
                <div className="flex flex-wrap text-xs text-gray-500">
                  <div className="flex items-center mr-4 mb-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {report.location.name || "Unknown location"}
                  </div>
                  <div className="flex items-center mr-4 mb-1">
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    {formatDate(report.createdAt)}
                  </div>
                  <div className="flex items-center mb-1">
                    <Image className="w-3 h-3 mr-1" />
                    {report.images.length} {report.images.length === 1 ? "photo" : "photos"}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-gray-600">
                  {report.description}
                </p>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {report.images.slice(0, 3).map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Evidence for ${report.title}`}
                        className="object-cover w-full h-full rounded-md"
                      />
                      {report.images.length > 3 && index === 2 && (
                        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50 rounded-md">
                          <span className="text-lg font-bold">+{report.images.length - 3}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Button variant="ghost" size="sm" className="ml-auto text-primary">
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportsListPage;
