interface IPaginationMeta {
  perPage: number;
  totalPages: number;
  currentPage: number;
  pageStartIndex: number;
  hasPrev: boolean;
  hasNext: boolean;
  prev: number | null;
  next: number | null;
}

interface IBooking {
  _id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  vehicle: IVehicle;
  user: IUser;
}

interface IBookingData extends IPaginationMeta {
  bookings: IBooking[];
  totalBookings: number;
}

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

interface IIncome {
  _id: string;
  totalIncome: number;
}

interface IPost {
  _id: string;
  slug: string;
  title: string;
  image: string;
  content: string;
  createdAt: Date;
  updatedAt: string;
}

interface IPostData extends IPaginationMeta {
  posts: IPost[];
  totalPosts: number;
}

interface IRouteMeta {
  [path: string]: {
    title: string;
    breadcrumb: string[];
  };
}

interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  dateofBirth: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserData extends IPaginationMeta {
  users: IUser[];
  totalUsers: number;
}

interface IUserBooking {
  _id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  vehicle: IVehicle;
}

interface IUserBookingData extends IPaginationMeta {
  bookings: IUserBooking[];
  totalBookings: number;
}

interface IVehicle {
  _id: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  vehicleType: 'sedan' | 'suv' | 'van' | 'station vagon' | 'mpv';
  doors: 2 | 3 | 4 | 5;
  passengers: 5 | 7 | 8 | 12;
  transmissionType: 'automatic' | 'manual';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  minAge: 21 | 24 | 27 | 30;
  createdAt: Date;
  updatedAt: Date;
}

interface IVehicleData extends IPaginationMeta {
  vehicles: IVehicle[];
  totalVehicles: number;
}
