
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { signInSchema } from "@/schema"
import { useAuthRedirect, useCustomForm } from "@/hooks"
import { APP_NAME } from "@/constant"
import { Link } from "react-router-dom";
import { useContext, useState } from "react"
import AppContext from "@/context/AppContext"

function SignIn() {

    useAuthRedirect();
    const { signInUser } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);


    const form = useCustomForm(signInSchema, {
        email: "",
        password: "",
    })

    async function onSubmit(values) {
        setIsLoading(true);
        await signInUser(values.email, values.password);
        setIsLoading(false);
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="hidden w-1/2 bg-black p-12 text-white lg:flex lg:flex-col lg:justify-between">
                <div>
                    <Link to="/" className="mt-4 text-3xl font-semibold">{APP_NAME}</Link>
                </div>
            </div>
            <div className="flex w-full items-center justify-center p-12 lg:w-1/2">
                <div className="w-full max-w-md">
                    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                            <p className="mt-2 text-sm text-gray-600">Enter your email and password below to sign in</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email..." {...field} />
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
                                            <FormLabel className="text-gray-700">Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Password..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div
                                    disabled={isLoading}
                                    className="flex justify-end text-sm text-gray-500 hover:text-gray-700"
                                >
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                </div>
                                <Button className="w-full bg-[#bd1e59] text-white" disabled={isLoading}>
                                    {isLoading ? "Loading..." : "Sign In"}
                                </Button>
                                <div className="mt-4 text-sm text-gray-500 hover:text-gray-700 text-center">
                                    <Link to="/sign-up">Don't have an account? Sign Up</Link>
                                </div>
                            </form>
                            <p className="mt-6 text-xs text-gray-500">
                                By clicking continue, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
