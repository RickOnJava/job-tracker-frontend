import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { updateJob } from "../../redux/jobSlice";
import { server } from "@/config";

export function EditJobForm({ job, closeForm, saveEditedJob }) {
  const { token } = useSelector((store) => store.auth);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");

  const dispatch = useDispatch();

  // If editing, populate form with job data
  useEffect(() => {
    if (job) {
      setCompany(job.company);
      setRole(job.role);
      setStatus(job.status);
      setDate(job.date);
      setLink(job.link);
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company || !role || !date) {
      return;
    }
    const formData = {
      company,
      role,
      status,
      date,
      link,
    };

    try {
      const res = await axios.put(
        `${server}/api/jobs/${job._id}`,
        formData,
        {
          headers: { Authorization: token },
        }
      );

      if (res.data.success) {
        dispatch(updateJob(res.data.job));
        toast.success(res.data.message || "Job updated successfully");
        saveEditedJob({
          ...job,
          company,
          role,
          status,
          date,
          link
        })
        closeForm();
      }
    } catch (err) {
      toast.error(err.response.data.message || "Failed to update job");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={closeForm}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{"Edit Job Application"}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Job title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date Applied</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Application Link</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com/job"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={closeForm}>
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-800 hover:bg-slate-700">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
