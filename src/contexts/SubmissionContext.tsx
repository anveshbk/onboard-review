
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockSubmissions, Submission } from "@/utils/mockData";
import { toast } from "sonner";

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

  useEffect(() => {
    // Simulate fetching data from API
    const fetchSubmissions = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmissions(mockSubmissions);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
        toast.error("Failed to load submissions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

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
            reviewComments: comments || submission.reviewComments
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
