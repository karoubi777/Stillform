import { useEffect } from "react";

export type ConfirmationType = "registration" | "password-reset";

type EmailConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  type: ConfirmationType;
};

export default function EmailConfirmationModal({
  isOpen,
  onClose,
  email,
  type,
}: EmailConfirmationModalProps) {
  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    /* Modal Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 transition-opacity animate-in fade-in duration-200">
      {/* Modal Box */}
      <div
        className="
          relative w-full max-w-[380px] bg-white rounded-lg shadow-2xl 
          p-6 sm:p-8 text-center flex flex-col items-center
          animate-in zoom-in-95 duration-200
        "
      >
        {/* Close Button (X) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 text-gray-400 hover:text-black transition text-xl leading-none p-1"
        >
          ✕
        </button>

        {/* Dynamic Icon based on type */}
        <div className="mb-4 flex items-center justify-center">
          {type === "registration" ? (
            /* Party Popper Icon (Registration) */
            <svg
              className="w-16 h-16 text-[#3B72D9]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
          ) : (
            /* Envelope with @ Icon (Password Reset) */
            <svg
              className="w-16 h-16 text-[#3B72D9]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
              />
            </svg>
          )}
        </div>

        {/* Modal Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Check Your Email
        </h3>

        {/* Modal Subtitle description */}
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-1">
          {type === "registration"
            ? "We have just sent you your new confirmation email to complete your registration to"
            : "We have just sent you your new confirmation email to"}
        </p>

        {/* Highlighted Email Address */}
        <p className="text-xs sm:text-sm font-bold text-gray-900 break-all mb-4">
          {email || "your email address."}
        </p>
      </div>
    </div>
  );
}
