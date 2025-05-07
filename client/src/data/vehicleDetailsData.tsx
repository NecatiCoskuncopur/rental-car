import React from 'react';

import { Car, Door, DriverLicense, Fuel, Passenger, Transmission } from '@/icons';

type DetailsConfigItem = {
  key: keyof IVehicle;
  icon: React.JSX.Element;
  label: string;
};

const vehicleDetailsData: DetailsConfigItem[] = [
  {
    key: 'vehicleType',
    label: 'Vehicle Type',
    icon: <Car size={16} />,
  },
  {
    key: 'transmissionType',
    label: 'Transmission Type',
    icon: <Transmission />,
  },
  {
    key: 'minAge',
    label: 'Min.Age',
    icon: <DriverLicense />,
  },
  {
    key: 'doors',
    label: 'Doors',
    icon: <Door />,
  },
  {
    key: 'fuelType',
    label: 'Fuel Type',
    icon: <Fuel />,
  },
  {
    key: 'passengers',
    label: 'Passengers',
    icon: <Passenger />,
  },
];

export default vehicleDetailsData;
