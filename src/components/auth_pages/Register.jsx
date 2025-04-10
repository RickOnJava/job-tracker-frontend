import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { server } from "@/config";



const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${server}/api/user/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          fullname: "",
          username: "",
          email: "",
          password: "",
          gender: "",
          phone: "",
          verificationMethod: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className="w-screen h-screen flex items-center justify-around overflow-x-hidden">
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
            <p className="text-center mt-1.5">Create an Account 🚀</p>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent mt-2"
              autoComplete="off"
            />
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
            <Button type="submit">SignUp</Button>
          )}

          <span className="text-center">
            Already have an account?
            <Link to="/login" className="font-bold text-blue-700">
              Login
            </Link>
          </span>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
