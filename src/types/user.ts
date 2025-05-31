
// Define user type
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  address?: string;
  age?: number;
  height?: number;
  weight?: number;
  bloodGroup?: string;
  medicalConditions?: string[];
}

// Define auth context type
export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  downloadHealthCard: () => void;
};
