import { Image, Input, InputNumber, Progress, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const vehicle = {
  vehicleTypes: ['sedan', 'suv', 'hatchback', 'station vagon', 'mpv'] as IVehicle['vehicleType'][],
  passengerTypes: [5, 7, 8, 12] as IVehicle['passengers'][],
  transmissionTypes: ['automatic', 'manual'] as IVehicle['transmissionType'][],
  fuelTypes: ['gasoline', 'diesel', 'electric', 'hybrid'] as IVehicle['fuelType'][],
  minAgeOptions: [21, 24, 27, 30] as IVehicle['minAge'][],
  doors: [2, 3, 4, 5] as IVehicle['doors'][],
};

const adminVehicleForm = (handleImageUpload: (file: File) => void, uploadProgress: number, imageUrl: string | null, existingImage: string | undefined) => {
  const { doors, vehicleTypes, passengerTypes, transmissionTypes, fuelTypes, minAgeOptions } = vehicle;

  return [
    {
      label: 'Brand',
      name: 'brand',
      rules: [{ required: true, message: 'Please input brand!' }],
      component: <Input placeholder="Enter brand" />,
    },
    {
      label: 'Model',
      name: 'model',
      rules: [{ required: true, message: 'Please input model!' }],
      component: <Input placeholder="Enter model" />,
    },
    {
      label: 'Price',
      name: 'price',
      rules: [{ required: true, message: 'Please input price!' }],
      component: (
        <InputNumber
          placeholder="Enter price"
          min={0}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      label: 'Doors',
      name: 'doors',
      rules: [{ required: true, message: 'Please select number of doors' }],
      component: (
        <Select placeholder="Select number of doors">
          {doors.map((door) => (
            <Select.Option
              key={door}
              value={door}
            >
              {door}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Vehicle Type',
      name: 'vehicleType',
      rules: [{ required: true, message: 'Please select vehicle type!' }],
      component: (
        <Select placeholder="Select vehicle type">
          {vehicleTypes.map((type) => (
            <Select.Option
              key={type}
              value={type}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Passengers',
      name: 'passengers',
      rules: [{ required: true, message: 'Please select number of passengers' }],
      component: (
        <Select placeholder="Select number of passengers">
          {passengerTypes.map((passenger) => (
            <Select.Option
              key={passenger}
              value={passenger}
            >
              {passenger}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Transmission Type',
      name: 'transmissionType',
      rules: [{ required: true, message: 'Please select transmission type!' }],
      component: (
        <Select placeholder="Select transmission type">
          {transmissionTypes.map((type) => (
            <Select.Option
              key={type}
              value={type}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Fuel Type',
      name: 'fuelType',
      rules: [{ required: true, message: 'Please select fuel type!' }],
      component: (
        <Select placeholder="Select fuel type">
          {fuelTypes.map((type) => (
            <Select.Option
              key={type}
              value={type}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Minimum Age',
      name: 'minAge',
      rules: [{ required: true, message: 'Please select minimum age' }],
      component: (
        <Select placeholder="Select minimum age">
          {minAgeOptions.map((age) => (
            <Select.Option
              key={age}
              value={age}
            >
              {age}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Image',
      name: 'image',
      rules: [
        {
          validator(_: any, value: any) {
            if (existingImage || (imageUrl && value === undefined)) {
              return Promise.resolve();
            }
            return value ? Promise.resolve() : Promise.reject(new Error('Please upload an image!'));
          },
        },
      ],
      component: (
        <Upload
          listType="picture-card"
          maxCount={1}
          beforeUpload={(file: File) => {
            handleImageUpload(file);
            return false;
          }}
          showUploadList={false}
        >
          {uploadProgress > 0 && uploadProgress < 100 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Progress
                type="circle"
                percent={Math.round(uploadProgress)}
                width={80}
                strokeColor="#1890ff"
              />
              <div style={{ marginTop: 8 }}>Uploading...</div>
            </div>
          ) : imageUrl || existingImage ? (
            <Image
              src={imageUrl || existingImage}
              alt="Preview"
              preview={false}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          ) : (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      ),
    },
  ];
};

export default adminVehicleForm;
