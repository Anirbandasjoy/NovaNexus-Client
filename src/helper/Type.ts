// News Types
export type CommentType = {
  _id: string;
  name: string;
  profileImage: string;
  commentText: string;
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
