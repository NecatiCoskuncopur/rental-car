interface ICurrentUser {
  currentUser: {
    _id: string;
    name: string;
    surname: string;
    dateofBirth: string;
    email: string;
    isAdmin: boolean;
  } | null;
  error: string | null;
  loading: boolean;
}

interface IPost {
  _id: string;
  slug: string;
  title: string;
  image: string;
  content: string;
  updatedAt: string;
}

interface IPostData {
  totalPosts: number;
  posts: IPost[];
}

interface IRouteMeta {
  [path: string]: {
    title: string;
    breadcrumb: string[];
  };
}
