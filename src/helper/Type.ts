type CommentType = {
  _id: string;
  email: string;
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
