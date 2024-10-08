import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/AxiosInstances";
import { toast } from "react-toastify";
import moment from "moment";
import { LoadingPage } from "../components/Loading/LoadingPage";

export const DetailPublicPost = () => {
  const [post, setPosts] = useState(null);
  const [FileUrl,setFileUrl]= useState(null)
  const params = useParams();
  const PostId = params.id;
  const navigate = useNavigate();


 
  useEffect(() => {
    if (PostId) {
      const GetPost = async () => {
        try {
          const response = await axios.get(`/posts/all/${PostId}`);
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

  if (!post) {
    
    return <LoadingPage/>;
  }

  
 
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-4 mb-6">
      <button
          className="absolute top-20 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 active:scale-75"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </button>
      </div>
      <div className="bg-white p-8 rounded-md shadow-lg min-h-96 mt-20">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">
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
    </div>
  );
};
