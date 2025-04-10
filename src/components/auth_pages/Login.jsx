import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice.js";
import { motion } from "framer-motion";
import { server } from "@/config";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${server}/api/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data)); // we have passed in backend the user , we get this here

        toast.success(res.data.message);

        setInput({
          email: "",
          password: "",
        });

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-around">
      <motion.div
      initial={{ opacity: 0, y: 80 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1.5 }}
      >
        <form
          className="shadow-lg flex flex-col gap-5 p-8 md:w-96"
          onSubmit={signupHandler}
        >
          <div className="my-4">
            <h1 className="text-center font-bold md:text-2xl text-xl">
              Student Job Tracker
            </h1>
            <p className="text-center mt-1.5">Welcome Back 👋</p>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent mt-2"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent mt-2"
            />
          </div>

          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit">Login</Button>
          )}

          <span className="text-center">
            Don&apos;t have an account?
            <Link to="/register" className="font-bold text-blue-700">
              &nbsp; Create Now
            </Link>
          </span>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
