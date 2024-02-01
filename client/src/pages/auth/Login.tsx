import { useNavigate } from "react-router-dom";

// zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// library
import axios from "axios";

// shadcn
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// icons
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { UserErrors } from "@/models/error";

// schema
const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login", // Adjust the endpoint for login
        values
      );
      localStorage.setItem("token", response.data.token); // Store the JWT in local storage
      console.log("Login successful");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorType = error.response.data.type as UserErrors;
        switch (errorType) {
          case UserErrors.NO_USER_FOUND:
          case UserErrors.WRONG_CREDENTIAL:
            alert("Invalid username or password.");
            break;
          case UserErrors.SERVER_ERROR:
            alert("Server error. Please try again later.");
            break;
          default:
            alert("An unexpected error occurred.");
        }
        console.error("Login error:", error.response.data.error);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center my-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign to E-Commerce</CardTitle>
          <CardDescription>
            Enter your email and password below to signin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username" aria-label="username">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input id="username" placeholder="pares" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password" aria-label="password">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>

        <div className="flex items-center my-4">
          <div className="flex-grow">
            <Separator className="my-4" />
          </div>
          <span className="mx-4 text-sm text-gray-600">OR CONTINUE WITH</span>
          <div className="flex-grow">
            <Separator className="my-4" />
          </div>
        </div>

        <CardFooter className="flex justify-between">
          <Button className="flex gap-2 items-center">
            <FaGoogle /> Google
          </Button>
          <Button className="flex gap-2 items-center">
            <FaFacebook /> Facebook
          </Button>
        </CardFooter>
      </Card>
      <div className="flex gap-2">
        <p className="text-gray-600">Don't have an account ?</p>
        <a href="/" className="hover:text-primary">
          Sign Up
        </a>
      </div>
    </div>
  );
}
