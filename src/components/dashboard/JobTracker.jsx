import { useState, useEffect } from "react";

import { JobDashboard } from "./JobDashboard";
import { JobForm } from "./JobForm";
import { JobList } from "./JobList";
import { JobHeader } from "./JobHeader";
import { JobStatusFilter } from "./JobStatusFilter";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "@/redux/jobSlice";
import axios from "axios";
import { logout } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { server } from "@/config";

export default function JobTracker() {

  const { jobs } = useSelector((store) => store.jobs);
  const { token, user } = useSelector((store) => store.auth);

  const [allJobs, setAllJobs] = useState(jobs);

  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${server}/api/jobs`, {
          headers: { Authorization: token },
        });
  
        const sortedJobs = res.data.sort(
          (a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)
        );
  
        dispatch(setJobs(sortedJobs));
        setAllJobs(sortedJobs); // Update local state
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, [dispatch, token]);


  //! Apply filters when jobs or activeFilter changes
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredJobs(allJobs);
    } else {
      setFilteredJobs(allJobs.filter((job) => job.status === activeFilter));
    }
  }, [allJobs, activeFilter]);


  //! Add a new job
  const addJob = (job) => {

  const updatedJobs = [job, ...allJobs];

  updatedJobs.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));

  setAllJobs(updatedJobs);
  dispatch(setJobs(updatedJobs)); // Update Redux state
  setIsFormOpen(false);
};


//! Logout handler
const handleLogout = async() => {
  dispatch(logout());
  navigate('/login'); // redirect to login page
  toast.success("Logged out successfully");
}

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <JobHeader
        openForm={() => {
          setEditingJob(null);
          setIsFormOpen(true);
        }}
        handleLogout = {handleLogout}
        user={user}
      />

      <JobDashboard jobs={jobs} />

      <div className="mt-8">
        <JobStatusFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          
        />
      </div>

      {isFormOpen && (
        <JobForm
          addAllJob={addJob}
          closeForm={() => {
            setIsFormOpen(false);
            setEditingJob(null);
          }}
        />
      )}

      <JobList
        jobs={filteredJobs}
        // updateJobStatus={updateJobStatus}
        // deleteJob={handleDelete}
        // editJob={updateJobs}
        allJobs = {allJobs}
        setAllJobs = {setAllJobs}
      />
    </div>
  );
}
