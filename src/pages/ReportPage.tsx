
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, Upload, X, Check } from "lucide-react";
import { createReport } from "@/services/reportService";
import { CreateReportInput } from "@/types/report";

const ReportPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: {
      latitude: 0,
      longitude: 0,
      name: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value,
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      const newImagePreviews = newImages.map(file => URL.createObjectURL(file));
      
      setImages([...images, ...newImages]);
      setPreviewImages([...previewImages, ...newImagePreviews]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];
    
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: {
              ...formData.location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
          toast({
            title: "Location detected",
            description: `Lat: ${position.coords.latitude.toFixed(6)}, Long: ${position.coords.longitude.toFixed(6)}`,
          });
        },
        (error) => {
          toast({
            title: "Error getting location",
            description: error.message,
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please provide a title and description",
        variant: "destructive",
      });
      return;
    }

    if (formData.location.latitude === 0 && formData.location.longitude === 0) {
      toast({
        title: "Location required",
        description: "Please provide or detect your location",
        variant: "destructive",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const reportData: CreateReportInput = {
        ...formData,
        images,
      };

      await createReport(reportData);

      toast({
        title: "Report submitted successfully",
        description: "Thank you for helping protect Ghana's environment",
      });

      navigate("/reports");
    } catch (error) {
      toast({
        title: "Error submitting report",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-primary-700">Report Illegal Mining Activity</h1>
          <p className="text-gray-600">
            Help protect Ghana's environment by reporting illegal mining activities. Your information will be kept confidential.
          </p>
        </div>

        <Card className="border border-gray-200">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
              <CardDescription>
                Provide as much detail as possible about the illegal mining activity you observed
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Title & Description */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="E.g., 'Illegal mining near Ankobra River'"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe what you saw, including the scale of operations, equipment used, and environmental impacts"
                    rows={5}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              {/* Location */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Location *</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getCurrentLocation}
                    className="flex items-center gap-1 text-xs"
                  >
                    <MapPin className="w-3 h-3" />
                    Detect My Location
                  </Button>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="latitude" className="block mb-1 text-xs text-gray-500">
                      Latitude
                    </label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      step="0.000001"
                      placeholder="e.g., 5.6037"
                      value={formData.location.latitude || ""}
                      onChange={handleLocationChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="longitude" className="block mb-1 text-xs text-gray-500">
                      Longitude
                    </label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      step="0.000001"
                      placeholder="e.g., -0.1870"
                      value={formData.location.longitude || ""}
                      onChange={handleLocationChange}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="name" className="block mb-1 text-xs text-gray-500">
                    Location Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="E.g., 'Near Ankobra River, Prestea'"
                    value={formData.location.name}
                    onChange={handleLocationChange}
                  />
                </div>
              </div>
              
              {/* Image Upload */}
              <div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Photos *</label>
                  <p className="text-xs text-gray-500">Upload images of the illegal mining activity</p>
                </div>
                
                <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-md border-gray-300 bg-gray-50">
                  <Camera className="w-10 h-10 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">Drag photos here or click to upload</p>
                  <label className="cursor-pointer">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Select Photos
                    </Button>
                  </label>
                </div>
                
                {/* Image previews */}
                {previewImages.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">Uploaded Images:</p>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="object-cover w-full rounded-md aspect-square"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
            </CardContent>
            
            <CardFooter className="flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
              <p className="text-xs text-gray-500">* Required fields</p>
              <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Submit Report
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportPage;
