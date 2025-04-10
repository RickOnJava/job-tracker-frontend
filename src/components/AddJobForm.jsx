import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../redux/jobSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddJobForm = () => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    link: "",
  });
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/jobs", form, {
        headers: { Authorization: token },
      });

      if (res.data.success) {
        dispatch(addJob(res.data));
        navigate("/dashboard");
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 p-8 rounded-xl text-white shadow-2xl backdrop-blur-md"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Job ✨</h2>

        <div className="grid gap-4">
          <input
            type="text"
            name="company"
            placeholder="Company"
            onChange={handleChange}
            required
            className="p-2 rounded bg-white/20"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            onChange={handleChange}
            required
            className="p-2 rounded bg-white/20"
          />
          <select
            name="status"
            onChange={handleChange}
            required
            className="p-2 rounded bg-white/20 text-white-100"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            required
            className="p-2 rounded bg-white/20"
          />
          <input
            type="url"
            name="link"
            placeholder="Job Link"
            onChange={handleChange}
            className="p-2 rounded bg-white/20"
          />
          <button
            type="submit"
            className="mt-4 bg-white text-indigo-600 font-semibold py-2 rounded hover:bg-indigo-100"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;
