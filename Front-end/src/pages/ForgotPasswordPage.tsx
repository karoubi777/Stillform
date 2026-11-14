import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailConfirmationModal from "../components/EmailConfirmationModal";
export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Validation: both fields marked with asterisk (*) are required
  const isEmailValid = email.trim().includes("@") && email.trim().includes(".");
  const isPasswordValid = newPassword.length >= 6;
  const canSubmit = isEmailValid && isPasswordValid;

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setIsModalOpen(true);
    // Simulate reset action and redirect
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/auth"); // Redirect to sign in page
    }, 1500);
  }

  return (
    <div className="w-full bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Centered Container: Max width 606px */}
      <div className="w-full max-w-[606px] mx-auto text-center">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Forgot password
        </h1>

        {/* Subtitle description */}
        <p className="text-xs sm:text-sm text-gray-500 max-w-[340px] mx-auto leading-relaxed mb-8">
          Enter your email address to reacquisition to your password.
        </p>

        {isSubmitted ? (
          <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-medium">
            ✓ Password reset successfully! Redirecting to sign in...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-left"
          >
            {/* 1. EMAIL FIELD */}
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

            {/* 2. NEW PASSWORD FIELD WITH EYE TOGGLE */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                  className="w-full h-[48px] sm:h-[52px] pl-4 pr-11 rounded border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 p-1 text-gray-400 hover:text-gray-600 transition"
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

            {/* 3. RESET PASSWORD BUTTON */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`
                w-full h-[56px] rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 mt-3
                ${
                  canSubmit
                    ? "bg-[#3B72D9] text-white hover:bg-[#2C62C9] active:scale-[0.99] shadow-md cursor-pointer"
                    : "bg-[#D1D5DB] text-white cursor-not-allowed"
                }
              `}
            >
              RESET PASSWORD
            </button>

            {/* 4. BOTTOM SIGN UP REDIRECT */}
            <div className="text-center text-xs sm:text-sm text-gray-700 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth"
                className="font-bold text-[#FF8A00] hover:underline ml-1"
              >
                Sign Up
              </Link>
            </div>
          </form>
        )}
      </div>
      <div className="w-full bg-white flex flex-col justify-center py-12 px-4">
        {/* Your form ... */}
        <form onSubmit={handleSubmit}>{/* Inputs & Reset button */}</form>

        {/* Confirmation Modal */}
        <EmailConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          email={email}
          type="password-reset"
        />
      </div>
    </div>
  );
}
