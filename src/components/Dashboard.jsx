// Dashboard.jsx
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import { setJobs } from "../redux/jobSlice";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const statusColors = {
  Applied: "bg-blue-500",
  Interview: "bg-yellow-500",
  Offer: "bg-green-500",
  Rejected: "bg-red-500",
};

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  // Function to format date as dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 text-white p-4 rounded-2xl shadow-xl backdrop-blur-md border border-white/10"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{job.company}</h3>
          <p className="text-sm opacity-80">{job.role}</p>
        </div>
        <p
          className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${
            statusColors[job.status]
          }`}
        >
          {job.status}
        </p>
      </div>

      <p className="text-sm mt-2 opacity-60">{formatDate(job.date)}</p>

      <div className="flex items-center justify-around">
        <a
          href={job.link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-300  mt-4 text-sm inline-block hover:underline"
        >
          View Application ↗
        </a>
        <Button
          onClick={() => navigate(`/edit/${job._id}`)}
          className="block mt-4 text-sm text-indigo-100 hover:text-white "
        >
          ✏️ Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(job._id)}
          className="block mt-4 text-sm"
        >
          🗑️ Delete
        </Button>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { jobs } = useSelector((store) => store.jobs);
  const { token } = useSelector((store) => store.auth);

  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/jobs", {
          headers: { Authorization: token },
        });
        dispatch(setJobs(res.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, [dispatch, token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      const res = await axios.delete(`http://localhost:4000/api/jobs/${id}`, {
        headers: { Authorization: token },
      });

      if (res.data.success) {
        dispatch(setJobs(jobs.filter((job) => job._id !== id)));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const jobDate = new Date(job.date);
    const matchesStart = !startDate || jobDate >= new Date(startDate);
    const matchesEnd = !endDate || jobDate <= new Date(endDate);
    return matchesStatus && matchesStart && matchesEnd;
  });

  const getStatusCount = (status) =>
    jobs.filter((job) => job.status === status).length;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎯 Job Applications</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {["Applied", "Interview", "Offer", "Rejected"].map((status) => (
          <div
            key={status}
            className={`rounded-xl p-4 text-center shadow-lg font-semibold ${statusColors[status]}`}
          >
            <h2 className="text-lg">{status}</h2>
            <p className="text-2xl">{getStatusCount(status)}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded-lg bg-white/20 focus:outline-none text-white-100"
        >
          <option value="All">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded-lg bg-white/20 focus:outline-none"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded-lg bg-white/20 focus:outline-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))
        ) : (
          <p>No job applications match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
