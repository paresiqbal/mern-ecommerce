// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Auth() {
  return (
    <div className="py-10">
      <h1 className="text-9xl font-bold">Let's find what you need here</h1>
      <p className="text-4xl mt-4">
        The best procurement store, that you can find in your country.
      </p>
      <div className="flex w-full max-w-sm pt-10 items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Sign Up</Button>
      </div>
    </div>
  );
}
