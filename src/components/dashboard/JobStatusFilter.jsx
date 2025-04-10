"use client"

import { Button } from "@/components/ui/button"

export function JobStatusFilter({ activeFilter, setActiveFilter }) {
  const filters = ["All", "Applied", "Interview", "Offer", "Rejected"]

  const getButtonColor = (filter) => {
    if (filter !== activeFilter) return "bg-white hover:bg-slate-100 text-slate-700"

    switch (filter) {
      case "Applied":
        return "bg-blue-500 hover:bg-blue-600 text-white"
      case "Interview":
        return "bg-amber-500 hover:bg-amber-600 text-white"
      case "Offer":
        return "bg-green-500 hover:bg-green-600 text-white"
      case "Rejected":
        return "bg-red-500 hover:bg-red-600 text-white"
      default:
        return "bg-slate-800 hover:bg-slate-700 text-white"
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          variant="outline"
          className={`${getButtonColor(filter)} border shadow-sm`}
        >
          {filter}
        </Button>
      ))}
    </div>
  )
}