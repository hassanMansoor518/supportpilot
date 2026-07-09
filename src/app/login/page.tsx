"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { Loader2, BotMessageSquare, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Logged in successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleOAuthLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative font-sans">

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <BotMessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold tracking-tight text-[#111827] text-lg leading-none">SupportPilot</div>
            <div className="text-xs text-[#6B7280] font-medium mt-1">AI Customer Support Platform</div>
          </div>
        </div>
        <Link href="/register">
          <button className="text-sm font-medium text-black hover:text-[#111827] bg-transparent hover:bg-black/5 px-4 py-2 transition-colors border border-[#E5E7EB] rounded-lg">
            Sign up free
          </button>
        </Link>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12 z-10">
        <div className="w-full max-w-[440px] my-auto">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className=" p-4 md:p-10"
          >
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-[24px] font-medium tracking-tight text-[#111827] mb-2">Welcome back</h1>
              <p className="text-[#6B7280] text-sm">Sign in to continue to your workspace.</p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => handleOAuthLogin("google")}
                className="w-full h-[48px] flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-md text-[#111827] font-medium text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5E7EB] focus:ring-offset-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
              <button
                onClick={() => handleOAuthLogin("github")}
                className="w-full h-[48px] flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-md text-[#111827] font-medium text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5E7EB] focus:ring-offset-1"
              >
                <div className="w-5 h-5" />
                Continue with GitHub
              </button>
              <button
                onClick={() => handleOAuthLogin("microsoft")}
                className="w-full h-[48px] flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-md text-[#111827] font-medium text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5E7EB] focus:ring-offset-1"
              >
                <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0H0V10H10V0Z" fill="#F25022" />
                  <path d="M21 0H11V10H21V0Z" fill="#7FBA00" />
                  <path d="M10 11H0V21H10V11Z" fill="#00A4EF" />
                  <path d="M21 11H11V21H21V11Z" fill="#FFB900" />
                </svg>
                Continue with Microsoft
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-[#6B7280] uppercase tracking-wider font-medium">Or</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-[#111827]">
                  Business Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6B7280]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    className={`w-full h-[52px] pl-11 pr-4 rounded-xl border bg-white text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-[#9CA3AF] ${errors.email ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-[#E5E7EB]"
                      }`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-[#111827]">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-[12px] font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6B7280]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full h-[52px] pl-11 pr-12 rounded-xl border bg-white text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-[#9CA3AF] tracking-wide ${errors.password ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-[#E5E7EB]"
                      }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 cursor-pointer  flex items-center text-[#6B7280] hover:text-[#111827] transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[48px] mt-2 bg-gray-950 hover:bg-[#000000] text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#111827] focus:ring-offset-2"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Log in with email"
                )}
              </button>
            </form>

          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center text-[#6B7280] text-xs"
          >
            <p>
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
            <p className="mt-3">
              By continuing, you agree to our <a href="#" className="underline hover:text-[#111827]">Terms of Service</a> and <a href="#" className="underline hover:text-[#111827]">Privacy Policy</a>.
            </p>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
