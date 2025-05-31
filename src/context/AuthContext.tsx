
// Re-export everything from the refactored files to maintain backward compatibility
import { AuthContext, AuthProvider } from './AuthProvider';
import { useAuth } from '@/hooks/useAuth';
import { User, AuthContextType } from '@/types/user';

export { AuthContext, AuthProvider, useAuth };
export type { User, AuthContextType };
