import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, SettingsFormData } from '../schemas/settingsSchema';

interface SettingsFormProps {
  initialValues?: Partial<SettingsFormData>;
  onSubmitSuccess?: (data: SettingsFormData) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialValues = {
    detectionThreshold: 50,
    alertEmail: '',
    enableAutomaticBlocking: false,
  },
  onSubmitSuccess,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    mode: 'onChange', // Validate on every change to keep 'isValid' state current
    defaultValues: initialValues,
  });

  const onSubmit = async (data: SettingsFormData) => {
    setIsSaved(false);
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    }
    
    setIsSaved(true);
  };

  return (
    <div className="w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-100">Intrusion Detection Settings</h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure security detection rules and response actions.
        </p>
      </div>

      {isSaved && (
        <div 
          role="status"
          className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg"
        >
          Settings successfully saved!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Detection Threshold */}
        <div className="flex flex-col gap-1.5">
          <label 
            htmlFor="detectionThreshold" 
            className="text-sm font-medium text-slate-300"
          >
            Detection Threshold (1 - 100)
          </label>
          <input
            id="detectionThreshold"
            type="number"
            aria-invalid={errors.detectionThreshold ? "true" : "false"}
            aria-describedby={errors.detectionThreshold ? "detectionThreshold-error" : undefined}
            className={`px-3.5 py-2 bg-slate-950 border text-slate-200 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.detectionThreshold 
                ? 'border-red-500/80 focus:ring-red-500/30' 
                : 'border-slate-800 focus:ring-indigo-500/30 focus:border-indigo-500/80'
            }`}
            placeholder="e.g. 50"
            {...register('detectionThreshold', { valueAsNumber: true })}
          />
          {errors.detectionThreshold && (
            <span 
              id="detectionThreshold-error" 
              className="text-xs text-red-400 mt-0.5 font-medium"
              role="alert"
            >
              {errors.detectionThreshold.message}
            </span>
          )}
        </div>

        {/* Alert Email */}
        <div className="flex flex-col gap-1.5">
          <label 
            htmlFor="alertEmail" 
            className="text-sm font-medium text-slate-300"
          >
            Alert Recipient Email
          </label>
          <input
            id="alertEmail"
            type="email"
            aria-invalid={errors.alertEmail ? "true" : "false"}
            aria-describedby={errors.alertEmail ? "alertEmail-error" : undefined}
            className={`px-3.5 py-2 bg-slate-950 border text-slate-200 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.alertEmail 
                ? 'border-red-500/80 focus:ring-red-500/30' 
                : 'border-slate-800 focus:ring-indigo-500/30 focus:border-indigo-500/80'
            }`}
            placeholder="security@company.com"
            {...register('alertEmail')}
          />
          {errors.alertEmail && (
            <span 
              id="alertEmail-error" 
              className="text-xs text-red-400 mt-0.5 font-medium"
              role="alert"
            >
              {errors.alertEmail.message}
            </span>
          )}
        </div>

        {/* Enable Automatic Blocking */}
        <div className="flex items-center gap-3 py-1">
          <input
            id="enableAutomaticBlocking"
            type="checkbox"
            className="w-4 h-4 text-indigo-600 bg-slate-950 border-slate-800 rounded focus:ring-indigo-500 focus:ring-offset-slate-900 focus:ring-2 focus:ring-offset-2 transition-all cursor-pointer"
            {...register('enableAutomaticBlocking')}
          />
          <label 
            htmlFor="enableAutomaticBlocking" 
            className="text-sm font-medium text-slate-300 select-none cursor-pointer"
          >
            Enable Automatic Blocking
          </label>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-2.5 px-4 font-semibold text-sm rounded-lg shadow-md transition-all ${
            !isValid || isSubmitting
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50 shadow-none'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? 'Saving Settings...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};
