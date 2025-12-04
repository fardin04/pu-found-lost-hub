import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const { currentUser, verifyEmail, logoutUser } = useAuth();
  const [sending, setSending] = useState(false);

  const resendEmail = async () => {
    setSending(true);
    try {
      await verifyEmail();
      toast.success("Verification email sent again!");
    } catch (err) {
        console.error("Error resending verification email:", err);
      toast.error("Failed to resend email.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral text-center p-4">
      <h1 className="text-2xl font-bold text-secondary mb-4">Verify Your Email</h1>

      <p className="text-gray-700 max-w-md">
        A verification link has been sent to <strong>{currentUser?.email}</strong>
        Please check your inbox <span>(including the spam folder)</span> and click the link to activate your account.
      </p>

      <button
        onClick={resendEmail}
        disabled={sending}
        className="bg-secondary text-white px-4 py-2 rounded mt-6"
      >
        {sending ? "Sending..." : "Resend Email"}
      </button>

      <button
        onClick={logoutUser}
        className="mt-4 text-red-500 underline"
      >
        Log out
      </button>
    </div>
  );
}
