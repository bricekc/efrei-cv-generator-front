import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          src="/signup.jpg"
          alt="Image"
          className="w-full object-cover dark:brightness-[0.2] dark:grayscale"
          style={{ height: 'calc(100vh - 64px)' }}
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                type="firstname"
                placeholder="john"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                type="lastname"
                placeholder="doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            You already have an account?{" "}
            <Link to="/Login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
