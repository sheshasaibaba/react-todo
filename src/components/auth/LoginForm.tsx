import { Link } from 'react-router-dom';
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { useAuthActions } from "../../hooks/useAuthMutation"


const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Password required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" }
    });
    const navigate = useNavigate();
    const { login, loginLoading, loginError } = useAuthActions();


    const onSubmit = (values: LoginFormData) => {
        login(values, {
            onSuccess: () => navigate("/dashboard"),
        });
    };


    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Link to="/signup">
                        <Button variant="link">Sign Up</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
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
                            {/* Password */}
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
                        {loginError && (
                            <span className="text-red-500 text-xs">
                                {(loginError as any)?.message || "Login failed"}
                            </span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full mt-6"
                        disabled={loginLoading}
                    >
                        {loginLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardFooter>
        </Card>
    )
}
