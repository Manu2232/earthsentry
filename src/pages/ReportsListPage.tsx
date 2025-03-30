
import { useQuery } from "@tanstack/react-query";
import { fetchReports } from "@/services/reportService";
import { Report, ReportStatus } from "@/types/report";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, AlertCircle } from "lucide-react";

const statusColors: Record<ReportStatus, string> = {
  pending: "bg-yellow-500",
  investigating: "bg-blue-500",
  resolved: "bg-green-500",
  dismissed: "bg-gray-500",
};

const ReportsListPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: reports = [], isLoading, error } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
    onError: (err: Error) => {
      toast({
        title: "Error",
        description: "Failed to fetch reports: " + err.message,
        variant: "destructive",
      });
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Illegal Mining Reports</CardTitle>
          <Button onClick={() => navigate("/report")}>Submit New Report</Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading reports...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <AlertCircle className="mx-auto h-10 w-10 mb-2" />
              <p>Failed to load reports</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No reports submitted yet</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate("/report")}
              >
                Be the first to report an incident
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date Reported</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {report.location?.name || "Location not specified"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                          {formatDate(report.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[report.status]}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsListPage;
