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
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/register",
        values
      );
      console.log(response.data);
      // Redirect or show success message
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (
          error?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS
        ) {
          alert("Username already exists");
        }
        console.error("Registration error:", errorMessage);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center my-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account.
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
                Create Account
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
        <p className="text-gray-600">Already have an account ?</p>
        <a href="/" className="hover:text-primary">
          Sign In
        </a>
      </div>
    </div>
  );
}
