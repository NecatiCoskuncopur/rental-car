import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Alert, Button, Table } from 'antd';

import { useCreateData, useDeleteData, useFetchData, useUpdateData } from '@/hooks';
import { AdminLayout, CreateModal, DeleteModal, PostColumns, UpdateModal } from '@/components';

type ModalType = 'delete' | 'update' | 'create' | null;

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const { data: postData, loading, error, refetch } = useFetchData<IPostData>(`/api/post/getPosts?limit=5&page=${currentPage}`);

  const { update: updatePost, loading: updateLoading, error: updateError } = useUpdateData<IPost>(`/api/post/updatePost/${selectedPost?._id}`);

  const { createData, loading: createLoading, error: createError } = useCreateData<Partial<IPost>>('/api/post/createPost');

  const {
    state: { error: deleteError, loading: deleteLoading },
    deleteItem,
  } = useDeleteData(`/api/post/deletePost/${selectedPost?._id}`);

  const openModal = (type: ModalType, postId?: string) => {
    if (postId) {
      const post = postData?.posts.find((p) => p._id === postId) || null;

      setSelectedPost(post);
    } else {
      setSelectedPost(null);
    }
    setModalType(type);
  };

  const handleDelete = async () => {
    if (selectedPost) {
      const isDeleted = await deleteItem();
      if (isDeleted) {
        toast.success('Post deleted successfully');
        refetch();
      } else {
        toast.error(deleteError || 'Failed to delete post');
      }
      setModalType(null);
    }
  };

  const handleUpdate = async (updatedData: Partial<IPost>) => {
    if (selectedPost) {
      await updatePost(updatedData);

      if (!updateError) {
        toast.success('Post updated successfully');
        refetch();
      } else {
        toast.error(updateError || 'Failed to update post');
      }

      setModalType(null);
    }
  };

  const handleCreate = async (newPost: Partial<IPost>) => {
    try {
      await createData(newPost);
      toast.success('Post created successfully');
      refetch();
    } catch {
      toast.error(createError || 'Failed to create post');
    } finally {
      setModalType(null);
    }
  };

  const handleCancel = () => {
    setModalType(null);
    setSelectedPost(null);
  };

  const dataSource = postData
    ? postData.posts.map((post: IPost) => ({
        _id: post._id,
        slug: post.slug,
        title: post.title,
        image: post.image,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }))
    : [];

  const columns = PostColumns(
    (postId) => openModal('delete', postId),
    (postId) => openModal('update', postId)
  );

  return (
    <AdminLayout title="Posts">
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
            Create Post
          </Button>

          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            scroll={{ x: 1024 }}
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize: postData?.perPage,
              total: postData ? postData.totalPosts : 0,
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
          type="post"
        />
      )}
      {modalType === 'create' && (
        <CreateModal
          isVisible={modalType === 'create'}
          handleCreate={handleCreate}
          handleCancel={handleCancel}
          loading={createLoading}
          type="post"
        />
      )}
      {modalType === 'update' && (
        <UpdateModal
          isVisible={modalType === 'update'}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
          loading={updateLoading}
          type="post"
          selectedItem={selectedPost}
        />
      )}
    </AdminLayout>
  );
};

export default Posts;
