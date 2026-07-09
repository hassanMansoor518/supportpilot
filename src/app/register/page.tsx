"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2, BotMessageSquare, Mail, Lock, Eye, EyeOff, User, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Schema ---

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof registerSchema>;

// --- Components ---

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col relative font-sans">
      {children}
    </div>
  );
}

function AuthHeader() {
  return (
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
      <div className="hidden sm:flex items-center gap-4">
        <span className="text-sm text-[#6B7280] font-medium">Already have an account?</span>
        <Link href="/login">
          <button type="button" className="text-sm font-medium text-[#111827] hover:text-[#000000] bg-transparent hover:bg-black/5 px-4 py-2 transition-colors border border-[#E5E7EB] rounded-lg">
            Log in
          </button>
        </Link>
      </div>
      <div className="sm:hidden">
        <Link href="/login">
          <button type="button" className="text-sm font-medium text-[#111827] hover:text-[#000000] bg-transparent hover:bg-black/5 px-4 py-2 transition-colors border border-[#E5E7EB] rounded-lg">
            Log in
          </button>
        </Link>
      </div>
    </header>
  );
}

function SocialButtons() {
  const handleOAuthLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="space-y-3 mb-8">
      <button
        onClick={() => handleOAuthLogin("google")}
        type="button"
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
        type="button"
        className="w-full h-[48px] flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-md text-[#111827] font-medium text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5E7EB] focus:ring-offset-1"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
        Continue with GitHub
      </button>
    </div>
  );
}

function AuthDivider() {
  return (
    <div className="relative mb-8 mt-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#E5E7EB]" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-white px-3 text-[#6B7280] uppercase tracking-wider font-medium">Or</span>
      </div>
    </div>
  );
}

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ElementType;
  error?: string;
  registerProps: UseFormRegisterReturn;
}

function AuthInput({ icon: Icon, error, registerProps, ...props }: AuthInputProps) {
  return (
    <div className="space-y-1.5">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6B7280]">
          <Icon className="h-5 w-5" />
        </div>
        <input
          className={`w-full h-[50px] pl-11 pr-4 rounded-xl border bg-white text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-[#9CA3AF] ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-[#E5E7EB]"
            }`}
          {...registerProps}
          {...props}
        />
      </div>
      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-1">
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface PasswordInputProps extends AuthInputProps {
  label: string;
}

function PasswordInput({ icon: Icon, error, registerProps, label, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-[#111827]">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6B7280]">
          <Icon className="h-5 w-5" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full h-[50px] pl-11 pr-12 rounded-xl border bg-white text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-[#9CA3AF] tracking-wide ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-[#E5E7EB]"
            }`}
          {...registerProps}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#6B7280] hover:text-[#111827] transition-colors focus:outline-none"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-1">
          {error}
        </motion.p>
      )}
    </div>
  );
}

function PasswordStrength({ password }: { password?: string }) {
  const requirements = [
    { label: "At least 8 characters", valid: (password?.length || 0) >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password || "") },
    { label: "Lowercase letter", valid: /[a-z]/.test(password || "") },
    { label: "Number", valid: /[0-9]/.test(password || "") },
    { label: "Special character", valid: /[^A-Za-z0-9]/.test(password || "") },
  ];

  return (
    <div className="space-y-2.5 mt-4 bg-[#FAFAFA] p-4 rounded-xl border border-[#E5E7EB]">
      {requirements.map((req, i) => (
        <div key={i} className="flex items-center gap-2.5 text-xs">
          <div className={`flex items-center justify-center w-4 h-4 rounded-full transition-colors ${req.valid ? "bg-green-500 text-white" : "bg-gray-200 text-transparent"}`}>
            <Check className="w-3 h-3" />
          </div>
          <span className={req.valid ? "text-[#111827] font-medium transition-colors" : "text-[#6B7280] transition-colors"}>{req.label}</span>
        </div>
      ))}
    </div>
  );
}

function AuthButton({ children, isLoading, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="w-full h-[48px] mt-6 bg-red-700 hover:bg-red-800 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#111827] focus:ring-offset-2"
    >
      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
    </button>
  );
}

function AuthFooter() {
  return (
    <div className="text-center text-xs text-[#6B7280] flex flex-col gap-2">
      <p>
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[#111827] hover:underline">
          Log in
        </Link>
      </p>
      <p>
        By continuing, you agree to our <a href="#" className="underline hover:text-[#111827]">Terms of Service</a> and <a href="#" className="underline hover:text-[#111827]">Privacy Policy</a>.
      </p>
    </div>
  );
}

// --- Main Page Component ---

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange"
  });

  const passwordValue = watch("password");

  const onNextStep = async () => {
    const isValid = await trigger(["name", "email"]);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      const json = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        toast.error(json.message || "Something went wrong");
        return;
      }

      toast.success("Account created successfully! Please log in.");
      router.push("/login");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to create account");
    }
  };

  return (
    <div className=" bg-white  ">
      <AuthLayout>
        <AuthHeader />

        <div className=" flex-1 flex flex-col items-center px-4 pt-15 pb-6 z-10 w-full">
          <div className="w-full max-w-[460px] my-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className=" p-8 md:p-12 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-8">
                      <h1 className="text-2xl md:text-[28px] font-medium tracking-tight text-[#111827] mb-2">Get started for free</h1>
                      <p className="text-[#6B7280] text-sm">Create your SupportPilot account in just two simple steps.</p>
                    </div>

                    <SocialButtons />
                    <AuthDivider />

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#111827]">Full Name</label>
                        <AuthInput
                          icon={User}
                          placeholder="John Doe"
                          registerProps={register("name")}
                          error={errors.name?.message}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#111827]">Business Email</label>
                        <AuthInput
                          icon={Mail}
                          type="email"
                          placeholder="name@company.com"
                          registerProps={register("email")}
                          error={errors.email?.message}
                        />
                      </div>

                      <AuthButton type="button" onClick={onNextStep}>
                        Continue <ArrowRight className="w-4 h-4 ml-2" />
                      </AuthButton>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center text-sm font-medium text-[#6B7280] hover:text-[#111827] mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </button>

                    <div className="mb-8">
                      <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-[#111827] mb-2">Secure your account</h1>
                      <p className="text-[#6B7280] text-sm">Create a strong password to protect your workspace.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <PasswordInput
                        label="Password"
                        icon={Lock}
                        placeholder="••••••••"
                        registerProps={register("password")}
                        error={errors.password?.message}
                      />

                      <PasswordInput
                        label="Confirm Password"
                        icon={Lock}
                        placeholder="••••••••"
                        registerProps={register("confirmPassword")}
                        error={errors.confirmPassword?.message}
                      />

                      <PasswordStrength password={passwordValue} />

                      <AuthButton type="submit" isLoading={isLoading}>
                        Create Account
                      </AuthButton>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <AuthFooter />
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
