"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Building,
  Calendar,
  ExternalLink,
  MoreVertical,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  FileText,
} from "lucide-react"
import { formatDate } from "@/lib/utils"

export function JobCard({ job,  editJob, handleDelete }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800"
      case "Interview":
        return "bg-amber-100 text-amber-800"
      case "Offer":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Applied":
        return <FileText className="h-4 w-4 mr-1" />
      case "Interview":
        return <MessageSquare className="h-4 w-4 mr-1" />
      case "Offer":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "Rejected":
        return <XCircle className="h-4 w-4 mr-1" />
      default:
        return <Clock className="h-4 w-4 mr-1" />
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-800">{job.role}</h3>
              <div className="flex md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => editJob(job)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowConfirmDelete(true)}>
                      <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                      <span className="text-red-500">Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center text-slate-600">
              <Building className="h-4 w-4 mr-2" />
              <span>{job.company}</span>
            </div>

            <div className="flex items-center text-slate-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Applied on {formatDate(job.date)}</span>
            </div>

            {job.link && (
              <div className="flex items-center">
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 flex items-center text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Application
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(job.status)}`}
            >
              {getStatusIcon(job.status)}
              {job.status}
            </div>

            <div className="hidden md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => editJob(job)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowConfirmDelete(true)}>
                    <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-red-500">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {showConfirmDelete && (
          <div className="mt-4 p-3 border border-red-200 bg-red-50 rounded-md">
            <p className="text-sm text-red-800 mb-2">Are you sure you want to delete this job application?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowConfirmDelete(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                 handleDelete(job?._id);
                  setShowConfirmDelete(false)
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}