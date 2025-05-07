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

interface IVehicleData {
  vehicles: IVehicle[];
  totalVehicles: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
  pageStartIndex: number;
  hasPrev: boolean;
  hasNext: boolean;
  prev: number | null;
  next: number | null;
}
