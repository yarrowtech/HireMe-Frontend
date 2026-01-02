import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaBuilding, FaTimes, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";

function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Username validation
    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    // Company Code validation
    if (!companyCode.trim()) {
      toast.error("Company code is required");
      return;
    }
    if (!/^\d{3}$/.test(companyCode)) {
      toast.error("Company code must be exactly 3 digits");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Password reset instructions sent successfully");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-2xl p-8 w-[90vw] max-w-md relative border border-blue-200/50 backdrop-blur-sm">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-blue-200/50 hover:bg-blue-300/50 text-blue-700 hover:text-blue-800 transition-all duration-200"
        >
          <FaTimes />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <FaShieldAlt className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Forgot Password</h2>
          <p className="text-blue-600 text-sm">Enter your details to receive password reset instructions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-blue-700">
              <FaUser className="text-blue-500" />
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-4 bg-white/80 border border-blue-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-800 placeholder-blue-400 transition-all duration-300"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-blue-700">
              <FaBuilding className="text-blue-500" />
              Company Code
            </label>
            <input
              type="text"
              placeholder="Enter company code (3 digits)"
              className="w-full p-4 bg-white/80 border border-blue-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-800 placeholder-blue-400 transition-all duration-300"
              value={companyCode}
              onChange={e => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                setCompanyCode(value);
              }}
              maxLength={3}
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Sending...
              </div>
            ) : (
              "Send Reset Instructions"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Login({ setShowLogin }: { setShowLogin: (value: boolean) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserState } = useContext(UserContext)!;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Username validation
    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    // Password validation
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Company Code validation
    if (!companyCode.trim()) {
      toast.error("Company code is required");
      return;
    }
    if (!/^\d{3}$/.test(companyCode)) {
      toast.error("Company code must be exactly 3 digits");
      return;
    }

    // API call
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/partner/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
          companyCode: parseInt(companyCode)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and encrypted data
        localStorage.setItem("authToken", data.token);
        
        await updateUserState();
        toast.success(data.message || "Login successful");
        setShowLogin(false);
        navigate("/manage-account")
      } else {
        const message = typeof data.message === "object" ? data.message[0] : data.message;
        toast.error(message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
      <div className="w-[85vw] sm:w-[400px] max-w-[400px] mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-2xl p-6 border border-blue-200/50 backdrop-blur-sm relative">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
            <FaUser className="text-lg text-white" />
          </div>
          <h2 className="text-xl font-bold text-blue-800 mb-1">Welcome Back</h2>
          <p className="text-xs text-blue-600">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-blue-700">
              <FaUser className="text-blue-500" />
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 bg-white/80 border border-blue-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-800 placeholder-blue-400 transition-all duration-300"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-blue-700">
              <FaLock className="text-blue-500" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 pr-12 bg-white/80 border border-blue-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-800 placeholder-blue-400 transition-all duration-300"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Company Code Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-blue-700">
              <FaBuilding className="text-blue-500" />
              Company Code
            </label>
            <input
              type="text"
              placeholder="Enter company code (3 digits)"
              className="w-full p-3 bg-white/80 border border-blue-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-800 placeholder-blue-400 transition-all duration-300"
              value={companyCode}
              onChange={e => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                setCompanyCode(value);
              }}
              maxLength={3}
              disabled={isLoading}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Security Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-blue-600/70">
            Your login is secured with enterprise-grade encryption
          </p>
        </div>
      </div>
    </>
  );
}
