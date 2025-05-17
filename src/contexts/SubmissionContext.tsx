
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockSubmissions, Submission } from "@/utils/mockData";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

type SubmissionContextType = {
  submissions: Submission[];
  setSubmissionStatus: (
    id: string,
    status: "approved" | "rejected",
    comments?: string
  ) => void;
  getSubmission: (id: string) => Submission | undefined;
  addReviewNote: (id: string, note: string) => void;
  isLoading: boolean;
};

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate fetching data from API
    const fetchSubmissions = async () => {
      try {
        console.log("Fetching submissions data...");
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmissions(mockSubmissions);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
        toast.error("Failed to load submissions");
      } finally {
        setIsLoading(false);
        console.log("Submissions data loaded");
      }
    };

    if (user) {
      fetchSubmissions();
    } else {
      // If no user, don't try to fetch data
      setSubmissions([]);
      setIsLoading(false);
    }
  }, [user]);

  const setSubmissionStatus = (
    id: string,
    status: "approved" | "rejected",
    comments?: string
  ) => {
    setSubmissions(prev =>
      prev.map(submission => {
        if (submission.id === id) {
          return {
            ...submission,
            status,
            reviewComments: comments || submission.reviewComments,
            // Add approval metadata if approved
            ...(status === "approved" && user ? {
              approvedBy: user.name,
              approvalTimestamp: new Date().toISOString()
            } : {}),
            // Add rejection metadata if rejected
            ...(status === "rejected" && user ? {
              rejectedBy: user.name,
              rejectionTimestamp: new Date().toISOString()
            } : {})
          };
        }
        return submission;
      })
    );

    if (status === "approved") {
      toast.success("Submission approved successfully");
    } else {
      toast.success("Submission rejected successfully");
    }

    // Store updated submissions in localStorage for persistence
    // In a real app, you would save this to a database
    localStorage.setItem("submissions", JSON.stringify(submissions));
  };

  const getSubmission = (id: string) => {
    return submissions.find(submission => submission.id === id);
  };

  const addReviewNote = (id: string, note: string) => {
    setSubmissions(prev =>
      prev.map(submission => {
        if (submission.id === id) {
          const reviewNotes = submission.reviewNotes || [];
          return {
            ...submission,
            reviewNotes: [...reviewNotes, note]
          };
        }
        return submission;
      })
    );

    // Store updated submissions in localStorage for persistence
    localStorage.setItem("submissions", JSON.stringify(submissions));
  };

  return (
    <SubmissionContext.Provider
      value={{
        submissions,
        setSubmissionStatus,
        getSubmission,
        addReviewNote,
        isLoading
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmissions = (): SubmissionContextType => {
  const context = useContext(SubmissionContext);
  if (context === undefined) {
    throw new Error("useSubmissions must be used within a SubmissionProvider");
  }
  return context;
};
