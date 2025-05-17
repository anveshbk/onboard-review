
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReviewNotesProps {
  notes: string[];
}

const ReviewNotes = ({ notes }: ReviewNotesProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Review Notes</CardTitle>
        <CardDescription>
          Fields marked for compliance review
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {notes && notes.length > 0 ? (
            <ul className="space-y-2">
              {notes.map((note, index) => (
                <li key={index} className="rounded-md border bg-muted p-2 text-sm">
                  {note}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              <p>No review notes yet. Click the + icon next to any field to add it here.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ReviewNotes;
