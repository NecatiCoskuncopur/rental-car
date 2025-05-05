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

interface IUserBooking {
  _id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  vehicle: IVehicle;
}

interface IUserBookingData {
  bookings: IUserBooking[];
  totalBookings: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
  pageStartIndex: number;
  hasPrev: boolean;
  hasNext: boolean;
  prev: number | null;
  next: number | null;
}
