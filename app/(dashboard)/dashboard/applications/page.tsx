// ============================================
// FILE: src/app/(dashboard)/dashboard/applications/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";

const mockApplications = [
  {
    id: "1",
    university: "Massachusetts Institute of Technology",
    program: "Master of Science in Computer Science",
    country: "USA",
    status: "in-progress",
    deadline: "2025-01-15",
    progress: 60,
  },
  {
    id: "2",
    university: "University of Oxford",
    program: "MSc in Engineering Science",
    country: "UK",
    status: "submitted",
    deadline: "2024-12-20",
    progress: 100,
  },
  {
    id: "3",
    university: "Technical University of Munich",
    program: "M.Sc. in Data Engineering",
    country: "Germany",
    status: "accepted",
    deadline: "2024-11-30",
    progress: 100,
  },
];

const statusConfig = {
  "in-progress": { label: "In Progress", color: "bg-yellow-500", icon: Clock },
  "submitted": { label: "Submitted", color: "bg-blue-500", icon: CheckCircle2 },
  "accepted": { label: "Accepted", color: "bg-green-500", icon: CheckCircle2 },
  "rejected": { label: "Rejected", color: "bg-red-500", icon: XCircle },
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-muted-foreground mt-2">Track your university applications</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Application
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockApplications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockApplications.filter(a => a.status === "in-progress").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {mockApplications.filter(a => a.status === "accepted").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockApplications.map((app) => {
          const StatusIcon = statusConfig[app.status as keyof typeof statusConfig].icon;
          return (
            <Card key={app.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{app.university}</h3>
                      <p className="text-muted-foreground">{app.program}</p>
                      <p className="text-sm text-muted-foreground mt-1">{app.country}</p>
                    </div>
                    <Badge className={statusConfig[app.status as keyof typeof statusConfig].color}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {statusConfig[app.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Application Progress</span>
                      <span className="font-medium">{app.progress}%</span>
                    </div>
                    <Progress value={app.progress} />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {new Date(app.deadline).toLocaleDateString()}</span>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}