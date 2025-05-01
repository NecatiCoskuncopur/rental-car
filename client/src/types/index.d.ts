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

interface IRouteMeta {
  [path: string]: {
    title: string;
    breadcrumb: string[];
  };
}
