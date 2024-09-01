import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/AxiosInstances";
import { toast } from "react-toastify";
import moment from "moment";
import DeleteModal from "../../components/DeleteModal";

export const DetailPost = () => {
  const [post, setPosts] = useState(null);
  const [FileUrl,setFileUrl]= useState(null)
  const params = useParams();
  const PostId = params.id;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

 
  useEffect(() => {
    if (PostId) {
      const GetPost = async () => {
        try {
          const response = await axios.get(`/posts/${PostId}`);
          const data = response.data.data;
          setPosts(data.post);
        
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: toast.TOP_RIGHT,
            autoClose: true,
          });
        }
      };
      GetPost();
    }
  }, [PostId]);

  useEffect(() => {
    if (post && post?.file) {
      const GetImg = async () => {
        try {
          const response = await axios.get(`/file/signed-url?key=${post.file.key}`);
          const data = response.data.data;
        
          setFileUrl(data.url)
          
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: toast.TOP_RIGHT,
            autoClose: true,
          });
        }
      };
      GetImg();
    }
  }, [post]);

  const deletePost = async () => {
    try{
      const response = await axios.delete(`/posts/${PostId}`);
      const data = response.data;
      toast.success(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: true,
      });
     navigate("/post")
    } catch(error){
     
      const response = error.response;
    const data = response.data;
    toast.error(data.message, {
      position: toast.TOP_RIGHT,
      autoClose: true,
    });
    }
    
    closeModal();
  };

  if (!post) {
    
    return <p>Loading...</p>;
  }

  
 
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-4 mb-6">
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition duration-300 flex items-center" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </button>
        <button 
        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300 flex items-center" onClick={() => navigate(`/post/update-post/${PostId}`)}>
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Update Post
        </button>
        <button 
        className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition duration-300 flex items-center"
        onClick={() => {openModal(post)}}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete Post
        </button>
      </div>
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {post.title}
        </h2>
        <h5 className="text-lg font-medium text-gray-600 mb-2">
          {post.category.title}
        </h5>
        <h5 className="text-lg font-medium text-gray-600 mb-2">
          {moment(post.updatedAt).format("YYYY-MM-DD-HH:mm:ss")}
        </h5>
        <h5 className="text-lg font-medium text-gray-600 mb-4">
          {moment(post.updatedAt).format("YYYY-MM-DD-HH:mm:ss")}
        </h5>
        <p className="text-gray-700 leading-relaxed mb-4">{post.desc}</p>
       {FileUrl ? <img src={FileUrl} alt="image" />: ""}
      </div>
      <DeleteModal
    isOpen={isModalOpen}
    closeModal={closeModal}
    deleteAction={deletePost}
    itemType="post"
  />
    </div>
  );
};
