
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubmissions } from "@/contexts/SubmissionContext";
import { format } from "date-fns";
import AppLayout from "@/components/AppLayout";
import { Check, X, ArrowRight, Search } from "lucide-react";

const Dashboard: React.FC = () => {
  const { submissions, isLoading } = useSubmissions();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.tspName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.fiuRegisteredName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEnvironment =
      environmentFilter === "all" || submission.environment === environmentFilter;

    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;

    return matchesSearch && matchesEnvironment && matchesStatus;
  });

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  const handleViewMore = (id: string) => {
    navigate(`/submissions/${id}`);
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-3xl font-bold">Client Onboarding Submissions</h1>
        
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by TSP or FIU name..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              value={environmentFilter}
              onValueChange={setEnvironmentFilter}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="UAT">UAT</SelectItem>
                <SelectItem value="PROD">PROD</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>TSP Name</TableHead>
                    <TableHead>FIU Name</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        {Array.from({ length: 6 }).map((_, j) => (
                          <TableCell key={j}>
                            <Skeleton className="h-6 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No submissions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">
                          {submission.tspName}
                        </TableCell>
                        <TableCell>{submission.fiuRegisteredName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={submission.environment === "PROD" ? "destructive" : "outline"}
                          >
                            {submission.environment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(submission.submissionTimestamp),
                            "MMM dd, yyyy"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status || "Pending"}
                            {submission.status === "approved" && (
                              <Check className="ml-1 h-3 w-3" />
                            )}
                            {submission.status === "rejected" && (
                              <X className="ml-1 h-3 w-3" />
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewMore(submission.id)}
                          >
                            View More
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
