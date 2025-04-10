import { useState } from "react";
import { JobCard } from "./JobCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { EditJobForm } from "./EditJobForm";
import { setJobs } from "@/redux/jobSlice";
import axios from "axios";
import { toast } from "sonner";
import { server } from "@/config";

export function JobList({ jobs, allJobs, setAllJobs }) {
  const { token } = useSelector((store) => store.auth);

  const [searchTerm, setSearchTerm] = useState("");

  const [editingJob, setEditingJob] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch();

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingJob(null);
    setIsFormOpen(false);
  };

  const saveEditedJob = (updatedJob) => {
    const updatedJobs = allJobs.map((job) =>
      job._id === updatedJob._id ? updatedJob : job
    );

    setAllJobs(updatedJobs);
    dispatch(setJobs(updatedJobs)); // Update Redux state
    setEditingJob(null);
    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      const res = await axios.delete(`${server}/api/jobs/${id}`, {
        headers: { Authorization: token },
      });

      if (res.data.success) {
        // Filter out the deleted job from the local state
        const updatedJobs = allJobs.filter((job) => job._id !== id);

        // Update local state and Redux state
        setAllJobs(updatedJobs);
        dispatch(setJobs(updatedJobs));
        toast.success(res.data.message || "Internal server error");
      }
    } catch (err) {
      toast.error(err.response.data.message || "Internal server error");
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-6">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
          <p className="text-slate-500">No job applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              editJob={handleEditJob}
              handleDelete={handleDelete}
            />
          ))}

          {isFormOpen && editingJob && (
            <EditJobForm
              job={editingJob}
              closeForm={closeForm}
              saveEditedJob={saveEditedJob}
            />
          )}
        </div>
      )}
    </div>
  );
}
