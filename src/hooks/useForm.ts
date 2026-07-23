import { useState, ChangeEvent, FocusEvent, FormEvent } from 'react';

export interface ValidationRules<T> {
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit,
}: {
  initialValues: T;
  validationRules: ValidationRules<T>;
  onSubmit: (values: T) => void | Promise<void>;
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (currentValues: T): Partial<Record<keyof T, string>> => {
    if (validationRules.validate) {
      return validationRules.validate(currentValues);
    }
    return {};
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    let fieldValue: any = value;
    if (type === 'checkbox') {
      fieldValue = (e.target as HTMLInputElement).checked;
    }

    const updatedValues = {
      ...values,
      [name]: fieldValue,
    };

    setValues(updatedValues);

    // Validate field on-the-fly if it was already touched
    if (touched[name as keyof T]) {
      const nextErrors = validateForm(updatedValues);
      setErrors(prev => ({
        ...prev,
        [name]: nextErrors[name as keyof T] || undefined,
      }));
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    const nextErrors = validateForm(values);
    setErrors(prev => ({
      ...prev,
      [name]: nextErrors[name as keyof T] || undefined,
    }));
  };

  const handleCustomChange = (name: keyof T, value: any) => {
    const updatedValues = {
      ...values,
      [name]: value,
    };
    setValues(updatedValues);

    if (touched[name]) {
      const nextErrors = validateForm(updatedValues);
      setErrors(prev => ({
        ...prev,
        [name]: nextErrors[name] || undefined,
      }));
    }
  };

  const setFieldError = (name: keyof T, errorMessage: string) => {
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    setTouched(allTouched);

    const validationErrors = validateForm(values);
    
    // Check if there are any non-undefined errors
    const hasErrors = Object.values(validationErrors).some(
      error => error !== undefined && error !== ''
    );

    if (hasErrors) {
      setErrors(validationErrors);
      // Scroll to the first error
      const firstErrorKey = Object.keys(validationErrors).find(
        key => validationErrors[key as keyof T]
      );
      if (firstErrorKey) {
        const element = document.getElementsByName(firstErrorKey)[0];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      console.error('Form submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleCustomChange,
    setFieldError,
    handleSubmit,
    resetForm,
  };
}
