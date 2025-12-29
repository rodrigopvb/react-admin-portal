import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthProvider } from '@/providers/AuthProvider';
import { api } from '@/api/axios';

// Mock API and Toaster
vi.mock('@/api/axios');
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

// Wrap component with providers
const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText('Login', { selector: 'div' })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('validates empty inputs', async () => {
    renderWithProviders(<Login />);

    // Attempt submit without data
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('handles successful login', async () => {
    // Mock API success response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.post as any).mockResolvedValueOnce({
      data: {
        access_token: 'valid-jwt-token',
        user: { id: '1', email: 'test@example.com', role: 'ADMIN' }
      }
    });

    renderWithProviders(<Login />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      });
      // Check if token was saved (AuthProvider logic)
      expect(localStorage.getItem('token')).toBe('valid-jwt-token');
    });
  });

  it('handles login error', async () => {
    localStorage.clear();
    // Mock API error response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.post as any).mockRejectedValueOnce({
      response: {
        data: { message: 'Unauthorized' }
      }
    });

    renderWithProviders(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      // Assert we tried to login
      expect(api.post).toHaveBeenCalled();
      // Token shouldn't be set
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
