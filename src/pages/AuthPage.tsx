
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendEmailLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });
      
      if (error) {
        setError(error.message);
        console.error("Supabase email error:", error);
      } else {
        setEmailSent(true);
        toast({
          title: "Email Sent",
          description: "Check your inbox for the login link",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">EarthSentry Login</CardTitle>
          <CardDescription>
            {emailSent 
              ? "Check your email for the login link" 
              : "Sign in with your email to report illegal mining"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!emailSent ? (
            <form onSubmit={handleSendEmailLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="youremail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Login Link"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-md text-center">
                <p className="text-blue-800">
                  Check your email for a login link. Click the link to sign in.
                </p>
                <p className="mt-2 text-sm text-blue-700">
                  It may take a few minutes to arrive. Don't forget to check your spam folder.
                </p>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setEmailSent(false)}
                disabled={loading}
              >
                Use a Different Email
              </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="text-center text-xs text-gray-500">
          <p className="w-full">
            By signing in, you agree to help protect Ghana's environment by reporting illegal mining activities.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
