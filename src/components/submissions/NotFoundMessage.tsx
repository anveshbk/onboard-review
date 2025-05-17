
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFoundMessage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-8 text-center">
      <h2 className="text-2xl font-semibold">Submission not found</h2>
      <p className="mt-4">
        The submission you're looking for doesn't exist or has been removed.
      </p>
      <Button
        onClick={() => navigate("/dashboard")}
        variant="outline"
        className="mt-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
      </Button>
    </div>
  );
};

export default NotFoundMessage;
