import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Globe, 
  Bell, 
  Shield, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  AlertCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { useForm } from '../hooks/useForm';

// Define the fields structure
const initialSettings = {
  fullName: 'Jane Doe',
  username: 'janedoe',
  email: 'jane.doe@example.com',
  bio: 'Senior Frontend Developer & Design enthusiast. Passionate about building premium UI/UX.',
  profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  language: 'en',
  theme: 'dark',
  newPassword: '',
  confirmPassword: '',
  emailProductUpdates: true,
  emailSecurityAlerts: true,
  publicProfile: true,
  marketingEmails: false,
};

type SettingsType = typeof initialSettings;

export default function SettingsForm() {
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'preferences'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form Validation Logic
  const validationRules = {
    validate: (values: SettingsType) => {
      const errors: Partial<Record<keyof SettingsType, string>> = {};

      // Name validation
      if (!values.fullName.trim()) {
        errors.fullName = 'Full name is required';
      } else if (values.fullName.trim().length < 3) {
        errors.fullName = 'Name must be at least 3 characters';
      }

      // Username validation
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!values.username.trim()) {
        errors.username = 'Username is required';
      } else if (values.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      } else if (!usernameRegex.test(values.username)) {
        errors.username = 'Username can only contain letters, numbers, and underscores';
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!values.email.trim()) {
        errors.email = 'Email address is required';
      } else if (!emailRegex.test(values.email)) {
        errors.email = 'Please enter a valid email address';
      }

      // Bio validation
      if (values.bio.length > 150) {
        errors.bio = `Bio must not exceed 150 characters (currently ${values.bio.length})`;
      }

      // Profile Pic validation
      if (values.profilePic.trim()) {
        try {
          new URL(values.profilePic);
        } catch (_) {
          errors.profilePic = 'Please enter a valid URL';
        }
      }

      // Password validation
      if (values.newPassword) {
        if (values.newPassword.length < 8) {
          errors.newPassword = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(values.newPassword)) {
          errors.newPassword = 'Password must contain at least one uppercase letter';
        } else if (!/[0-9]/.test(values.newPassword)) {
          errors.newPassword = 'Password must contain at least one number';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.newPassword)) {
          errors.newPassword = 'Password must contain at least one special character';
        }

        // Confirm Password validation
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Please confirm your new password';
        } else if (values.newPassword !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
      } else if (values.confirmPassword) {
        errors.newPassword = 'New password is required to set confirmation';
      }

      return errors;
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleCustomChange,
    handleSubmit,
  } = useForm<SettingsType>({
    initialValues: initialSettings,
    validationRules,
    onSubmit: async (formValues) => {
      // Simulate API submit delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Saved Settings:', formValues);
      setSuccessMessage('Settings updated successfully!');
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  });

  // Helper to check if a tab contains validation errors
  const hasTabErrors = (tab: 'profile' | 'account' | 'preferences') => {
    if (tab === 'profile') {
      return !!(errors.fullName || errors.username || errors.email || errors.bio || errors.profilePic);
    }
    if (tab === 'account') {
      return !!(errors.newPassword || errors.confirmPassword);
    }
    return false;
  };

  return (
    <div className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-800 bg-slate-900/80 px-4 md:px-6">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 py-4 px-3 border-b-2 font-medium text-sm transition-all relative ${
            activeTab === 'profile'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <User size={16} />
          Profile Settings
          {hasTabErrors('profile') && (
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-3 right-1 animate-pulse" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('account')}
          className={`flex items-center gap-2 py-4 px-3 border-b-2 font-medium text-sm transition-all relative ${
            activeTab === 'account'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock size={16} />
          Account & Security
          {hasTabErrors('account') && (
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-3 right-1 animate-pulse" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-2 py-4 px-3 border-b-2 font-medium text-sm transition-all relative ${
            activeTab === 'preferences'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bell size={16} />
          Preferences
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        
        {/* Success Banner */}
        {successMessage && (
          <div className="flex items-center gap-3 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl animate-fadeIn">
            <CheckCircle2 size={20} className="shrink-0" />
            <p className="text-sm font-medium">{successMessage}</p>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Public Profile</h2>
              <p className="text-sm text-slate-400">Manage how your account looks to others.</p>
            </div>

            {/* Avatar Preview & URL */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
              <div className="relative group w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500/50 bg-slate-800 flex items-center justify-center shrink-0">
                {values.profilePic && !errors.profilePic ? (
                  <img 
                    src={values.profilePic} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150';
                    }}
                  />
                ) : (
                  <User size={32} className="text-slate-500" />
                )}
              </div>
              <div className="flex-1 w-full space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Profile Image URL</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <ImageIcon size={16} />
                  </span>
                  <input
                    type="url"
                    name="profilePic"
                    value={values.profilePic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://example.com/avatar.jpg"
                    className={`w-full pl-9 pr-4 py-2 bg-slate-950/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all ${
                      touched.profilePic && errors.profilePic
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-800 focus:border-indigo-500/50'
                    }`}
                  />
                </div>
                {touched.profilePic && errors.profilePic && (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.profilePic}
                  </p>
                )}
              </div>
            </div>

            {/* Name & Username Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Jane Doe"
                    className={`w-full pl-9 pr-4 py-2.5 bg-slate-950/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all ${
                      touched.fullName && errors.fullName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-800 focus:border-indigo-500/50'
                    }`}
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-slate-300">Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <span className="text-sm font-medium">@</span>
                  </span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="username"
                    className={`w-full pl-9 pr-4 py-2.5 bg-slate-950/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all ${
                      touched.username && errors.username
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-800 focus:border-indigo-500/50'
                    }`}
                  />
                </div>
                {touched.username && errors.username && (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.username}
                  </p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="name@example.com"
                  className={`w-full pl-9 pr-4 py-2.5 bg-slate-950/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all ${
                    touched.email && errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-slate-800 focus:border-indigo-500/50'
                  }`}
                />
              </div>
              {touched.email && errors.email && (
                <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Bio with counter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="bio" className="block text-sm font-medium text-slate-300">Bio</label>
                <span className={`text-xs ${values.bio.length > 150 ? 'text-red-400' : 'text-slate-400'}`}>
                  {values.bio.length}/150
                </span>
              </div>
              <div className="relative">
                <span className="absolute top-3 left-3 text-slate-500">
                  <FileText size={16} />
                </span>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell us about yourself..."
                  className={`w-full pl-9 pr-4 py-2.5 bg-slate-950/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all resize-none ${
                    touched.bio && errors.bio
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-slate-800 focus:border-indigo-500/50'
                  }`}
                />
              </div>
              {touched.bio && errors.bio && (
                <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                  <AlertCircle size={12} /> {errors.bio}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ACCOUNT TAB */}
        {activeTab === 'account' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Account Security & Localization</h2>
              <p className="text-sm text-slate-400">Update your security settings and select default language.</p>
            </div>

            {/* Language & Theme Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Language Selector */}
              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-medium text-slate-300">Preferred Language</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Globe size={16} />
                  </span>
                  <select
                    id="language"
                    name="language"
                    value={values.language}
                    onChange={handleChange}
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-950/60 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm appearance-none focus:border-indigo-500/50 transition-all text-slate-300"
                  >
                    <option value="en">English (US)</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
                    ▼
                  </span>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="space-y-2">
                <label htmlFor="theme" className="block text-sm font-medium text-slate-300">System Theme</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Shield size={16} />
                  </span>
                  <select
                    id="theme"
                    name="theme"
                    value={values.theme}
                    onChange={handleChange}
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-950/60 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm appearance-none focus:border-indigo-500/50 transition-all text-slate-300"
                  >
                    <option value="dark">Dark Mode</option>
                    <option value="light">Light Mode</option>
                    <option value="system">System Default</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* Change Password Block */}
            <div className="border-t border-slate-800 pt-6 space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">Change Password</h3>
              
              {/* New Password */}
              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium text-slate-300">New Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-10 py-2.5 bg-slate-950/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all ${
                      touched.newPassword && errors.newPassword
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-800 focus:border-indigo-500/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {touched.newPassword && errors.newPassword ? (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.newPassword}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Must be 8+ characters and contain a letter, a number, and a special character.
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">Confirm New Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-10 py-2.5 bg-slate-950/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all ${
                      touched.confirmPassword && errors.confirmPassword
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-800 focus:border-indigo-500/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === 'preferences' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Preferences & Toggles</h2>
              <p className="text-sm text-slate-400">Configure notification alerts and profile accessibility.</p>
            </div>

            {/* Notification Toggles */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">Email Notifications</h3>
              
              {/* Product Updates Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:bg-slate-950/60 transition-all">
                <div className="flex gap-3">
                  <Bell className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Product Updates</h4>
                    <p className="text-xs text-slate-400">Get notified about new features, improvements, and releases.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCustomChange('emailProductUpdates', !values.emailProductUpdates)}
                  className={`w-11 h-6 rounded-full transition-all relative ${
                    values.emailProductUpdates ? 'bg-indigo-500' : 'bg-slate-800'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-all ${
                    values.emailProductUpdates ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Security Alerts Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:bg-slate-950/60 transition-all">
                <div className="flex gap-3">
                  <Shield className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Security Alerts</h4>
                    <p className="text-xs text-slate-400">Receive emails about unusual log-ins and security events.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCustomChange('emailSecurityAlerts', !values.emailSecurityAlerts)}
                  className={`w-11 h-6 rounded-full transition-all relative ${
                    values.emailSecurityAlerts ? 'bg-indigo-500' : 'bg-slate-800'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-all ${
                    values.emailSecurityAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="border-t border-slate-800 pt-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">Privacy Settings</h3>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:bg-slate-950/60 transition-all">
                <div className="flex gap-3">
                  <User className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Public Profile</h4>
                    <p className="text-xs text-slate-400">Allow search engines and non-logged-in users to see your profile.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCustomChange('publicProfile', !values.publicProfile)}
                  className={`w-11 h-6 rounded-full transition-all relative ${
                    values.publicProfile ? 'bg-indigo-500' : 'bg-slate-800'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-all ${
                    values.publicProfile ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm rounded-lg hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving Changes...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
