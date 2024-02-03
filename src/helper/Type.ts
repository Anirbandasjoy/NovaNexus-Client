import { UserCredential } from "firebase/auth";

// News Types
export type CommentType = {
  _id: string;
  name: string;
  profileImage: string;
  commentImage: string;
  commentText: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type NewsIdType = {
  other_info: {
    is_today_pick: boolean;
    is_tranding: boolean;
  };
  author: AuthorType;
  _id: string;
  like: number;
  title: string;
  thumbnail_url: string;
  details: string;
  comments: CommentType[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type AuthorType = {
  name: string;
  image: string;
  publishDate: string;
};

export type NewsType = {
  other_info: {
    is_today_pick: boolean;
    is_tranding: boolean;
  };
  author: AuthorType;
  _id: string;
  like: number;
  title: string;
  thumbnail_url: string;
  details: string;
  comments: CommentType[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  newsId: NewsIdType;
};

export type NewsPayloadType = {
  success: boolean;
  message: string;
  payload: NewsType[];
};

// Date Types

export type DateTimeFormatOptions = {
  month?: "long" | "numeric" | "2-digit" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  hour12?: boolean;
};

// Comment Types

export type commentFormValuType = {
  commentText: string;
};

// Registation form types

export type RegistationTypes = {
  fullname: string;
  email: string;
  password: string;
};

export type LoginTypes = {
  email: string;
  password: string;
};
// AuthcontextType
export type AuthContextType = {
  user: AuthUser | null;
  googleUserLogin: () => Promise<UserCredential>;
  registerUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loading: boolean;
};
// AuthUser
export type AuthUser = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
};

// AuthcontextType
export type AuthInformation = {
  loading: boolean;
  user: AuthUser | null;
  googleUserLogin: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  registerUser: (
    email: string,
    password: string
  ) => Promise<UserCredential> | null;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
};
