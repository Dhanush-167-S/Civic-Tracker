import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "../../../store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schema/authSchemas";
import { signup } from "../services/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const SignUp = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    console.log("FORM SUBMITTED", data);
    try {
      const res = await signup(data);
      console.log(res);
      setUser(res.user);
      toast.success(`Hey ${res.user.name} 👋 Your account is ready!`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "SignUp failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-4">
          <CardHeader className="text-center pt-4">
            <CardTitle className="text-3xl font-bold tracking-tight leading-[1.1]">
              Join Civic Tracker
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Help improve your community.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className={" flex flex-col space-y-2"}>
            <Button type="submit" className={"w-full flex items-center"}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-3" /> Please
                  wait...
                </>
              ) : (
                "SignUp"
              )}
            </Button>
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-500">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
export default SignUp;
