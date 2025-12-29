import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserManagement from '../UserManagement';
import { AbilityProvider } from '@/providers/AbilityProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { api } from '@/api/axios';

// Mock API
vi.mock('@/api/axios');
// Mock Toast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

// Setup QueryClient
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderWithProviders = (ui: React.ReactNode, role = 'ADMIN') => {
  // Mock local storage for AuthProvider to pick up
  localStorage.setItem('user', JSON.stringify({ id: '1', role }));
  localStorage.setItem('token', 'fake-token');

  const client = createTestQueryClient();

  return render(
    <QueryClientProvider client={client}>
      <AuthProvider>
        <AbilityProvider>
          {ui}
        </AbilityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('UserManagement Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders list of users', async () => {
    const mockUsers = [
      { id: '1', email: 'user1@example.com', role: 'ADMIN' },
      { id: '2', email: 'user2@example.com', role: 'USER' },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.get as any).mockResolvedValueOnce({ data: mockUsers });

    renderWithProviders(<UserManagement />);

    // Check Loading state
    expect(screen.getByRole('status')).toBeInTheDocument(); // Loader has role="status" in Lucide? Actually likely pure SVG, but our fallback is text

    await waitFor(() => {
      expect(screen.getByText('user1@example.com')).toBeInTheDocument();
      expect(screen.getByText('user2@example.com')).toBeInTheDocument();
    });
  });

  it('shows Add User button only for ADMIN', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.get as any).mockResolvedValueOnce({ data: [] });

    renderWithProviders(<UserManagement />, 'ADMIN');

    await waitFor(() => {
      expect(screen.getByText('Add User')).toBeInTheDocument();
    });
  });

  it('hides Add User button for read-only users', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.get as any).mockResolvedValue({ data: [] });

    renderWithProviders(<UserManagement />, 'USER'); // Non-admin role

    await waitFor(() => {
      expect(screen.queryByText('Add User')).not.toBeInTheDocument();
    });
  });
});
