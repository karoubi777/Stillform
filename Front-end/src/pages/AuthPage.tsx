import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type AuthMode = "signin" | "signup";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validation rules for required (*) fields
  const isEmailValid = email.trim().includes("@") && email.trim().includes(".");
  const isPasswordValid = password.length >= 6;
  const isNameValid = mode === "signup" ? name.trim().length > 0 : true;
  const isTermsValid = mode === "signup" ? agreedToTerms : true;

  // Button turns blue ONLY when all required fields are valid
  const canSubmit =
    isEmailValid && isPasswordValid && isNameValid && isTermsValid;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Simulate API call (Connect to your real backend here)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Example: trigger error if email is "fail@test.com"
          if (email === "fail@test.com") {
            reject(new Error("Invalid credentials or server timeout."));
          } else {
            resolve(true);
          }
        }, 1000);
      });

      // On successful login/signup, navigate back home
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full bg-white flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Bar: Back to website link */}
      <div className="w-full max-w-[1440px] mx-auto flex justify-end">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to the website
        </Link>
      </div>

      {/* Main Centered Form Card (Max 606px) */}
      <div className="w-full max-w-[606px] mx-auto my-auto py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-8">
          {mode === "signin" ? "Sign in" : "Sign up"}
        </h1>

        {/* Server / Timeout Error Banner */}
        {errorMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-md bg-red-50 p-4 border border-red-200 text-red-700 text-xs sm:text-sm">
            <svg
              className="w-5 h-5 shrink-0 text-red-500 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          {/* SIGN UP ONLY: Name Field */}
          {mode === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                className="w-full h-[48px] sm:h-[52px] px-4 rounded border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 transition"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full h-[48px] sm:h-[52px] pl-4 pr-11 rounded border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 transition"
              />
              <span className="absolute right-4 text-gray-400 text-sm select-none">
                @
              </span>
            </div>
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                className="w-full h-[48px] sm:h-[52px] pl-4 pr-11 rounded border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 p-1 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Options Row (Remember Me & Forgot Password) */}
          {mode === "signin" ? (
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#3B72D9] border-gray-300 focus:ring-0"
                />
                Remember for 30 days
              </label>
              <Link to="/forgotpass" className="hover:bg-red">
                Forgot password
              </Link>
            </div>
          ) : (
            /* SIGN UP Terms Checkbox */
            <label className="flex items-start gap-2.5 text-xs text-gray-500 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
                className="w-4 h-4 mt-0.5 rounded text-[#3B72D9] border-gray-300 focus:ring-0 shrink-0"
              />
              <span>
                Terms and conditions agreement should start with an introduction
                that lets users know they&apos;re reading a terms and conditions
                agreement
              </span>
            </label>
          )}

          {/* ========================================================
              PRIMARY SUBMIT BUTTON
              - Disabled: Gray background (#D1D5DB)
              - Enabled: Active Blue background (#3B72D9)
              - Height: 56px, Full width
             ======================================================== */}
          <button
            type="submit"
            disabled={!canSubmit || isLoading}
            className={`
              w-full h-[56px] rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 mt-2
              ${
                canSubmit && !isLoading
                  ? "bg-[#3B72D9] text-white hover:bg-[#2C62C9] active:scale-[0.99] shadow-md cursor-pointer"
                  : "bg-[#D1D5DB] text-white cursor-not-allowed"
              }
            `}
          >
            {isLoading
              ? "Please wait..."
              : mode === "signin"
                ? "SIGN IN"
                : "SIGN UP"}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-widest font-medium">
              OR
            </span>
            <div className="border-t border-gray-200 w-full" />
          </div>

          {/* Google Sign In/Up Button */}
          <button
            type="button"
            className="w-full h-[56px] rounded bg-[#3D3D3D] hover:bg-[#2C2C2C] active:scale-[0.99] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-3 transition-colors shadow-xs"
          >
            {/* Google Colorful 'G' SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {mode === "signin" ? "Sign in by google" : "Sign up by google"}
            </span>
          </button>

          {/* Promotional Free Shipping Notice */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#FF3B16] font-medium mt-1">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <span>
              Sign up to save $9 for free shipping with Ausff company through
              australian territory
            </span>
          </div>

          {/* Switcher: Sign in <-> Sign up */}
          <div className="text-center text-xs sm:text-sm text-gray-600 mt-4">
            {mode === "signin" ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#FF8A00] hover:underline cursor-pointer ml-1"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#FF8A00] hover:underline cursor-pointer ml-1"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Empty bottom spacer to keep form centered */}
      <div className="h-6" />
    </div>
  );
}
