import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

const VITE_BACK_URL = import.meta.env.VITE_VITE_BACK_URL || "http://localhost:3000/api";

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().min(3, "First name must be at least 3 characters").max(50, "First name must be less than 50 characters").required("First name is required"),
      lastname: Yup.string().min(3, "Last name must be at least 3 characters").max(50, "Last name must be less than 50 characters").required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${VITE_BACK_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Failed to sign up");
        }

        const data = await response.json();
        console.log("Sign up successful:", data);
        navigate("/login")
      } catch (error) {
        console.error("Sign up error:", error);
      }
    },
  });

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          src="/signup.jpg"
          alt="Image"
          className="w-full object-cover dark:brightness-[0.2] dark:grayscale"
          style={{ height: "calc(100vh - 64px)" }}
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and name below to sign up to your account
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                type="text"
                placeholder="John"
                {...formik.getFieldProps("firstname")}
                className={formik.touched.firstname && formik.errors.firstname ? "border-red-500" : ""}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="text-red-500 text-sm">{formik.errors.firstname}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                type="text"
                placeholder="Doe"
                {...formik.getFieldProps("lastname")}
                className={formik.touched.lastname && formik.errors.lastname ? "border-red-500" : ""}
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <div className="text-red-500 text-sm">{formik.errors.lastname}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...formik.getFieldProps("email")}
                className={formik.touched.email && formik.errors.email ? "border-red-500" : ""}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                className={formik.touched.password && formik.errors.password ? "border-red-500" : ""}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            You already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
