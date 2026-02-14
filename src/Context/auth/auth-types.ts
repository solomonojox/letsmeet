export interface UserData {
  Subject?: string;
  name?: string;
  id?: string;
  EmailAddress?: string;
  UserName?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  iss?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (token: string) => void;
  logout: () => void;
}