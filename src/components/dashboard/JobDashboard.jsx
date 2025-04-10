import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, MessageSquare, FileText } from "lucide-react"

export function JobDashboard({ jobs }) {

  const applied = jobs.filter((job) => job.status === "Applied").length
  const interview = jobs.filter((job) => job.status === "Interview").length
  const offer = jobs.filter((job) => job.status === "Offer").length
  const rejected = jobs.filter((job) => job.status === "Rejected").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Applied</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">{applied}</div>
            <FileText className="h-5 w-5 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Interview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">{interview}</div>
            <MessageSquare className="h-5 w-5 text-amber-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">{offer}</div>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Rejected</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">{rejected}</div>
            <XCircle className="h-5 w-5 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}