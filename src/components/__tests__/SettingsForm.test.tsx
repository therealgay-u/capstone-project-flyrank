import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsForm } from '../SettingsForm';

describe('SettingsForm Component', () => {
  it('renders all form elements with labels and default values', () => {
    render(<SettingsForm />);

    // Check labels and inputs
    const thresholdInput = screen.getByLabelText(/Detection Threshold/i);
    expect(thresholdInput).toBeInTheDocument();
    expect(thresholdInput).toHaveAttribute('type', 'number');
    expect(thresholdInput).toHaveValue(50); // initial default value

    const emailInput = screen.getByLabelText(/Alert Recipient Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveValue(''); // initial default empty

    const blockingCheckbox = screen.getByLabelText(/Enable Automatic Blocking/i);
    expect(blockingCheckbox).toBeInTheDocument();
    expect(blockingCheckbox).not.toBeChecked(); // initial default false

    const saveButton = screen.getByRole('button', { name: /Save Settings/i });
    expect(saveButton).toBeInTheDocument();
  });

  it('keeps the save button disabled when the form is invalid initially', () => {
    // Initial values has alertEmail: '', which is invalid
    render(<SettingsForm initialValues={{ detectionThreshold: 50, alertEmail: '', enableAutomaticBlocking: false }} />);
    const saveButton = screen.getByRole('button', { name: /Save Settings/i });
    expect(saveButton).toBeDisabled();
  });

  it('enables the save button when all fields are filled with valid values', async () => {
    render(<SettingsForm initialValues={{ detectionThreshold: 50, alertEmail: '', enableAutomaticBlocking: false }} />);
    const emailInput = screen.getByLabelText(/Alert Recipient Email/i);
    const saveButton = screen.getByRole('button', { name: /Save Settings/i });

    expect(saveButton).toBeDisabled();

    // Type a valid email
    await userEvent.type(emailInput, 'security@company.com');

    // Wait for the state to update and button to become enabled
    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    });
  });

  it('shows inline validation errors for invalid detection threshold values', async () => {
    render(<SettingsForm initialValues={{ detectionThreshold: 50, alertEmail: 'security@company.com', enableAutomaticBlocking: false }} />);
    const thresholdInput = screen.getByLabelText(/Detection Threshold/i);
    const saveButton = screen.getByRole('button', { name: /Save Settings/i });

    // Clear value and set to 0 (below min 1)
    await userEvent.clear(thresholdInput);
    await userEvent.type(thresholdInput, '0');

    // Check inline error
    await waitFor(() => {
      expect(screen.getByText(/must be at least 1/i)).toBeInTheDocument();
      expect(thresholdInput).toHaveAttribute('aria-invalid', 'true');
      expect(saveButton).toBeDisabled();
    });

    // Clear and set to 101 (above max 100)
    await userEvent.clear(thresholdInput);
    await userEvent.type(thresholdInput, '101');

    await waitFor(() => {
      expect(screen.getByText(/cannot exceed 100/i)).toBeInTheDocument();
      expect(thresholdInput).toHaveAttribute('aria-invalid', 'true');
      expect(saveButton).toBeDisabled();
    });

    // Set to a valid value (e.g. 75)
    await userEvent.clear(thresholdInput);
    await userEvent.type(thresholdInput, '75');

    await waitFor(() => {
      expect(screen.queryByText(/must be at least 1/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/cannot exceed 100/i)).not.toBeInTheDocument();
      expect(thresholdInput).toHaveAttribute('aria-invalid', 'false');
      expect(saveButton).toBeEnabled();
    });
  });

  it('shows inline validation errors for invalid email formats', async () => {
    render(<SettingsForm initialValues={{ detectionThreshold: 50, alertEmail: '', enableAutomaticBlocking: false }} />);
    const emailInput = screen.getByLabelText(/Alert Recipient Email/i);
    const saveButton = screen.getByRole('button', { name: /Save Settings/i });

    // Type invalid email
    await userEvent.type(emailInput, 'invalid-email');

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      expect(saveButton).toBeDisabled();
    });

    // Backspace / Clear and type valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'valid.email@example.com');

    await waitFor(() => {
      expect(screen.queryByText(/Invalid email address/i)).not.toBeInTheDocument();
      expect(emailInput).toHaveAttribute('aria-invalid', 'false');
      expect(saveButton).toBeEnabled();
    });
  });

  it('submits the form successfully with valid inputs and displays success status', async () => {
    const handleSubmitSuccess = vi.fn();
    render(<SettingsForm onSubmitSuccess={handleSubmitSuccess} />);

    const thresholdInput = screen.getByLabelText(/Detection Threshold/i);
    const emailInput = screen.getByLabelText(/Alert Recipient Email/i);
    const blockingCheckbox = screen.getByLabelText(/Enable Automatic Blocking/i);
    const saveButton = screen.getByRole('button', { name: /Save Settings/i });

    // Change values
    await userEvent.clear(thresholdInput);
    await userEvent.type(thresholdInput, '82');
    await userEvent.type(emailInput, 'admin@secops.io');
    await userEvent.click(blockingCheckbox);

    expect(saveButton).toBeEnabled();

    // Click submit
    await userEvent.click(saveButton);

    // Verify submittings state and then success callback
    expect(screen.getByText(/Saving Settings.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(handleSubmitSuccess).toHaveBeenCalledWith({
        detectionThreshold: 82,
        alertEmail: 'admin@secops.io',
        enableAutomaticBlocking: true,
      });
    }, { timeout: 1500 });

    // Check success message displayed
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/Settings successfully saved!/i);
    });
  });
});
