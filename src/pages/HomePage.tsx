
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Camera, MapPin, List, Shield } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-24 overflow-hidden bg-gradient-to-b from-primary-800 to-primary-600">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">Stop Illegal Mining in Ghana</h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-white/90">
            EarthSentry empowers citizens to report illegal mining activities and protect Ghana's natural resources.
          </p>
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
            <Link to="/report">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Report Illegal Mining
              </Button>
            </Link>
            <Link to="/reports">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                View Reports
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="shadow-md transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="p-2 mb-2 rounded-full w-fit bg-primary-50">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>1. Document</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary">
                  Take photos of illegal mining activities you observe and note the location.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="p-2 mb-2 rounded-full w-fit bg-primary-50">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>2. Submit</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary">
                  Fill out our simple form with details and location. Your identity remains protected.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="p-2 mb-2 rounded-full w-fit bg-primary-50">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>3. Action</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary">
                  Reports are verified and shared with authorities to take appropriate action.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-primary-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Make An Impact</h2>
            <p className="text-lg text-gray-600">
              Illegal mining, known locally as "galamsey," causes devastating environmental damage including water pollution, 
              deforestation, and soil degradation. Your reports help protect Ghana's natural heritage.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-2xl font-bold text-primary">240+</h3>
              <p className="text-gray-600">Reports Submitted</p>
            </div>
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-2xl font-bold text-primary">87%</h3>
              <p className="text-gray-600">Reports Investigated</p>
            </div>
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-2xl font-bold text-primary">156</h3>
              <p className="text-gray-600">Issues Resolved</p>
            </div>
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-2xl font-bold text-primary">12</h3>
              <p className="text-gray-600">Regions Protected</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Join The Fight Against Illegal Mining</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Your reports are crucial in the fight to protect Ghana's water bodies, forests, and communities.
          </p>
          <Link to="/report">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Report Illegal Mining Now
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-secondary text-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center mb-4 md:mb-0">
              <AlertTriangle className="w-6 h-6 mr-2 text-accent" />
              <span className="text-lg font-bold">EarthSentry</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-sm text-white/80 hover:text-white">Home</Link>
              <Link to="/report" className="text-sm text-white/80 hover:text-white">Report</Link>
              <Link to="/reports" className="text-sm text-white/80 hover:text-white">Reports</Link>
              <Link to="/map" className="text-sm text-white/80 hover:text-white">Map</Link>
            </div>
          </div>
          <div className="mt-6 text-sm text-center text-white/60">
            © {new Date().getFullYear()} EarthSentry. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
