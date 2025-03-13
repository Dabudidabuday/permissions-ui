
export interface Policy {
  id: string;
  name: string;
  action: string;
  resource: string;
}

export interface Role {
  id: string;
  name: 'ADMIN' | 'MANAGER' | 'USER';
  policies: Policy[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
