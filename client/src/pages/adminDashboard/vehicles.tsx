import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Alert, Button, Table } from 'antd';

import { useCreateData, useDeleteData, useFetchData, useUpdateData } from '@/hooks';
import { AdminLayout, CreateModal, DeleteModal, UpdateModal, VehicleColumns } from '@/components';

type Props = {};

type ModalType = 'delete' | 'update' | 'create' | null;

const Vehicles = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);

  const { data: vehicleData, loading, error, refetch } = useFetchData<IVehicleData>(`/api/vehicle/getVehicles?limit=5&page=${currentPage}`);

  const { update: updateVehicle, loading: updateLoading, error: updateError } = useUpdateData<IVehicle>(`/api/vehicle/updateVehicle/${selectedVehicle?._id}`);

  const { createData, loading: createLoading, error: createError } = useCreateData<Partial<IVehicle>>('/api/vehicle/createVehicle');

  const {
    state: { error: deleteError, loading: deleteLoading },
    deleteItem,
  } = useDeleteData(`/api/vehicle/deleteVehicle/${selectedVehicle?._id}`);

  const openModal = (type: ModalType, vehicleId?: string) => {
    if (vehicleId) {
      const vehicle = vehicleData?.vehicles.find((v) => v._id === vehicleId) || null;

      setSelectedVehicle(vehicle);
    } else {
      setSelectedVehicle(null);
    }
    setModalType(type);
  };

  const handleDelete = async () => {
    if (selectedVehicle) {
      const isDeleted = await deleteItem();
      if (isDeleted) {
        toast.success('Vehicle deleted successfully');
        refetch();
      } else {
        toast.error(deleteError || 'Failed to delete vehicle');
      }
      setModalType(null);
    }
  };

  const handleUpdate = async (updatedData: Partial<IVehicle>) => {
    if (selectedVehicle) {
      await updateVehicle(updatedData);

      if (!updateError) {
        toast.success('Vehicle updated successfully');
        refetch();
      } else {
        toast.error(updateError || 'Failed to update vehicle');
      }

      setModalType(null);
    }
  };

  const handleCreate = async (newVehicle: Partial<IVehicle>) => {
    try {
      await createData(newVehicle);
      toast.success('Vehicle created successfully');
      refetch();
    } catch {
      toast.error(createError || 'Failed to create vehicle');
    } finally {
      setModalType(null);
    }
  };

  const handleCancel = () => {
    setModalType(null);
    setSelectedVehicle(null);
  };

  const dataSource = vehicleData
    ? vehicleData.vehicles.map((vehicle: IVehicle) => ({
        _id: vehicle._id,
        brand: vehicle.brand,
        model: vehicle.model,
        price: vehicle.price,
        image: vehicle.image,
        vehicleType: vehicle.vehicleType,
        doors: vehicle.doors,
        passengers: vehicle.passengers,
        transmissionType: vehicle.transmissionType,
        fuelType: vehicle.fuelType,
        minAge: vehicle.minAge,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt,
      }))
    : [];

  const columns = VehicleColumns(
    (vehicleId) => openModal('delete', vehicleId),
    (vehicleId) => openModal('update', vehicleId)
  );

  return (
    <AdminLayout title="Vehicles">
      {error ? (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      ) : (
        <>
          <Button
            type="primary"
            onClick={() => openModal('create')}
            style={{ marginBottom: '20px' }}
          >
            Create Vehicle
          </Button>

          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            scroll={{ x: 1024 }}
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize: vehicleData?.perPage,
              total: vehicleData ? vehicleData.totalVehicles : 0,
              onChange: (page) => setCurrentPage(page),
              hideOnSinglePage: true,
              showLessItems: true,
            }}
          />
        </>
      )}

      {modalType === 'delete' && (
        <DeleteModal
          isVisible={modalType === 'delete'}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          loading={deleteLoading}
          type="vehicle"
        />
      )}
      {modalType === 'create' && (
        <CreateModal
          isVisible={modalType === 'create'}
          handleCreate={handleCreate}
          handleCancel={handleCancel}
          loading={createLoading}
          type="vehicle"
        />
      )}
      {modalType === 'update' && (
        <UpdateModal
          isVisible={modalType === 'update'}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
          loading={updateLoading}
          type="vehicle"
          selectedItem={selectedVehicle}
        />
      )}
    </AdminLayout>
  );
};

export default Vehicles;
