import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EditJobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/jobs/${id}`, {
          headers: { Authorization: token }
        });
        setStatus(res.data.status);
      } catch (err) {
        console.error('Failed to load job', err);
      }
    };
    fetchJob();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/jobs/${id}`, { status }, {
        headers: { Authorization: token }
      });
      navigate('/');
    } catch (err) {
      console.error('Failed to update job', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-purple-800 to-indigo-800 flex justify-center items-center text-white p-6">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">✏️ Update Application Status</h2>

        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="w-full mb-6 p-3 rounded-lg bg-white/20 focus:outline-none text-white-100"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all font-semibold"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};

export default EditJobForm;
