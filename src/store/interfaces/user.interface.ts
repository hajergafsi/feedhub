export type TUdapeUserBody = {
  fullName?: string;
  bio?: string;
  company?: string;
  jobTitle?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  avatar?: string;
  tags?: string[];
  password?: string;
};

export type IProfile = {
  username: string;
  readingStreak: number;
  status: string;
  createdAt: string;
  avatar: string;
  bio: string;
  fullName: string;
  lastRead: string;
  id: string;
};

export type CurrentYearActivity = {
  count: number;
  date: string;
}[];
