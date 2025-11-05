import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthActions } from "../../hooks/useAuthMutation"

const signupSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: { name: "", email: "", password: "" }
    });
    const navigate = useNavigate();
    const { signup, signupLoading, signupError } = useAuthActions();


    const onSubmit = (values: SignupFormData) => {
        signup(values, {
            onSuccess: () => navigate("/dashboard"),
        });
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your details below to create your account
                </CardDescription>
                <CardAction>
                    <Link to="/login">
                        <Button variant="link">Login</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                {...form.register("name")}
                                placeholder="Jane Doe"
                                required
                            />
                            {form.formState.errors.name && (
                                <span className="text-red-500 text-xs">
                                    {form.formState.errors.name.message}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...form.register("email")}
                                placeholder="m@example.com"
                                required
                            />
                            {form.formState.errors.email && (
                                <span className="text-red-500 text-xs">
                                    {form.formState.errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...form.register("password")}
                                required
                            />
                            {form.formState.errors.password && (
                                <span className="text-red-500 text-xs">
                                    {form.formState.errors.password.message}
                                </span>
                            )}
                        </div>
                        {signupError && (
                            <span className="text-red-500 text-xs">
                                {(signupError as any)?.response?.data?.message || "Signup failed"}
                            </span>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 pt-0">
                    <Button
                        type="submit"
                        className="w-full m-5"
                        disabled={signupLoading}
                    >
                        {signupLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign Up with Google
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}