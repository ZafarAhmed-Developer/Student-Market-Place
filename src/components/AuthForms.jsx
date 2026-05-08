import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ================= ALERT BOX =================
function AlertBox({ type, message }) {
  const bgColor = type === 'error' ? 'bg-red-50' : 'bg-green-50';
  const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';
  const borderColor = type === 'error' ? 'border-red-200' : 'border-green-200';

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 mb-4`}>
      <p className={`${textColor} text-sm`}>{message}</p>
    </div>
  );
}

// ================= EYE ICON =================
function EyeToggle({ show }) {
  return show ? (
    // Eye OFF
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeWidth={2} d="M3 3l18 18" />
      <path strokeWidth={2} d="M10.58 10.58A3 3 0 0013.42 13.42M9.88 4.24A9.956 9.956 0 0112 4c5 0 9 4 10 8a9.96 9.96 0 01-4.24 5.38M6.53 6.53A9.953 9.953 0 002 12c1 4 5 8 10 8a9.95 9.95 0 005.47-1.53" />
    </svg>
  ) : (
    // Eye ON
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeWidth={2} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" strokeWidth={2} />
    </svg>
  );
}

// ================= LOGIN FORM =================
export function LoginForm({ onSubmit, onSuccess, onSwitchMode, isModal = false, isLoading: externalLoading = false, error }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = isModal ? internalLoading : externalLoading;

  // Auto redirect if already logged in (only if not modal)
  useEffect(() => {
    if (!isModal) {
      const user = localStorage.getItem("user");
      if (user) navigate("/");
    }
  }, [isModal, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (isModal) setInternalLoading(true);

    try {
      const data = await onSubmit(email, password);

      if (isModal && onSuccess) {
        onSuccess(data);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    } catch (err) {
      setLocalError('Login failed. Please try again.');
    } finally {
      if (isModal) setInternalLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your StudentHub account</p>
      </div>

      {(error || localError) && (
        <AlertBox type="error" message={error || localError} />
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-500"
          >
            <EyeToggle show={showPassword} />
          </button>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
        {isLoading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center">
        Don’t have an account?{" "}
        {isModal ? (
          <button type="button" onClick={onSwitchMode} className="text-blue-600 hover:underline">Sign up</button>
        ) : (
          <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        )}
      </p>
    </form>
  );
}

// ================= SIGNUP FORM =================
export function SignupForm({ onSubmit, onSuccess, onSwitchMode, isModal = false, isLoading: externalLoading = false, error }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    campus: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = isModal ? internalLoading : externalLoading;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.firstName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (isModal) setInternalLoading(true);

    try {
      // Send data to backend
      const data = await onSubmit({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        campus: formData.campus || ''
      });

      if (isModal && onSuccess) {
        onSuccess(data);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    } catch (err) {
      setLocalError(err.message || 'Signup failed');
    } finally {
      if (isModal) setInternalLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <h1 className="text-3xl font-bold">Create Account</h1>

      {(error || localError) && (
        <AlertBox type="error" message={error || localError} />
      )}

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="First Name"
          className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-400"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-400"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-400"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="WhatsApp Number (e.g. +92...)"
        className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-400"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        required
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-400"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2 text-gray-400"
        >
          <EyeToggle show={showPassword} />
        </button>
      </div>

      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Confirm Password"
        className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-400"
        value={formData.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        required
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">
        {isLoading ? "Creating..." : "Sign Up"}
      </button>

      <p className="text-center">
        Already have an account?{" "}
        {isModal ? (
          <button type="button" onClick={onSwitchMode} className="text-blue-600 hover:underline">Login</button>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        )}
      </p>
    </form>
  );
}