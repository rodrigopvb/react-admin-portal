import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthProvider';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock component to consume global AuthContext
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Guest'}</div>
      <div data-testid="user-email">{user?.email}</div>
      <button onClick={() => login('fake-token', { id: '1', email: 'test@example.com', role: 'USER' })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('provides initial state (guest)', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Guest');
    expect(screen.getByTestId('user-email')).toBeEmptyDOMElement();
  });

  it('updates state on login', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login').click();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('updates state on logout', async () => {
    // Setup initial state
    localStorage.setItem('token', 'existing-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', email: 'existing@example.com', role: 'USER' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Verify initial logged in state
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');

    // Perform logout
    await act(async () => {
      screen.getByText('Logout').click();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Guest');
    expect(localStorage.getItem('token')).toBeNull();
  });
});
