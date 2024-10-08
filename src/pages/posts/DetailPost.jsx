import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/AxiosInstances";
import { toast } from "react-toastify";
import moment from "moment";
import DeleteModal from "../../components/Modalbox/DeleteModal";
import { LoadingPage } from "../../components/Loading/LoadingPage";

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
    
    return <LoadingPage/>;
  }

  
 
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-4 mb-6">
      <button
      className="absolute bg-blue-500 top-20 left-4 flex items-center text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 transition-transform transform hover:scale-105 active:scale-75 rounded-lg shadow-md hover:shadow-lg"
      onClick={() => navigate(-1)}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
      Go Back
    </button>
        <button 
        className="absolute right-4 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300 flex items-center" onClick={() => navigate(`/post/update-post/${PostId}`)}>
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Update Post
        </button>
        <button 
        className="absolute right-44 bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition duration-300 flex items-center"
        onClick={() => {openModal(post)}}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete Post
        </button>
      </div>
      <div className="bg-white p-8 rounded-md shadow-lg mt-20">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">
          {post.title}
        </h1>
      
        <h5 className="text-lg font-medium text-gray-800 mb-2">Kategori : 
          {post.category.title}
        </h5>
        <h5 className="text-sm font-medium text-gray-600 mb-2">Dibuat Pada :
          {moment(post.updatedAt).format("YYYY-MM-DD-HH:mm:ss")}
        </h5>
        <h5 className="text-sm font-medium text-gray-600 mb-4">Di Update Pada :
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
