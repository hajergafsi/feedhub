export interface IAuthError {
  message: string;
}

interface IToken {
  token: string;
  expiryDate: string;
}

export interface IUser {
  username: string;
  phone: string;
  role: string;
  loginHistory: [
    {
      ip: string;
      deviceType: string;
      location: {
        country: string;
        region: string;
        city: string;
        longitude: number;
        latitude: number;
        id: string;
      }[];
      user: string;
      createdAt: string;
      updatedAt: string;
      id: string;
    },
  ];
  fullName?: string;
  bio?: string;
  company?: string;
  jobTitle?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  tags?: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  readingStreak: number;
  lastRead: string;
  id: string;
}

export interface IAuth {
  user: IUser;
  tokens: {
    access: IToken;
  };
}

export enum EAuthErrors {
  FORGOT_PASSWORD = 'forgot password',
}
