import api from "../../components/api";

const useDeletePost = () => {
  const deletePost = async (postId) => {
    try {
      const res = await api.delete(`api/delete/${postId}`);
      return res.data;
    } catch (error) {
      console.error("Failed to delete post.");
    }
  };
  return deletePost;
};

export default useDeletePost;
