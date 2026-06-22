import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function RegisterForm() {
  return (
    <Card className="w-full max-w-md mx-auto bg-card-register">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Digite seu nome..." minLength={3} required />
            </div>
            <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" minLength={6} required />
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}
