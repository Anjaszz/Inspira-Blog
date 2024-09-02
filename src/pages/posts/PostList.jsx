import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from "../../utils/AxiosInstances";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const truncateText = (text, wordLimit) => {
  // Pastikan `text` tidak undefined atau null, jika iya set sebagai string kosong
  const validText = text || "";

  const words = validText.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + " ...";
  }
  return validText;
};


export const PostList = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [Search, setSearch] = useState("");

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/posts?page=${currentPage}&q=${Search}`);
      const data = response.data.data;
      
      // Mengambil URL file/gambar untuk setiap post
      const postsWithImages = await Promise.all(
        data.posts.map(async (post) => {
          if (post.file) {
            try {
              const fileResponse = await axios.get(`/file/signed-url?key=${post.file.key}`);
              post.imageUrl = fileResponse.data.data.url;
            } catch (error) {
              console.error("Error fetching image URL:", error);
              post.imageUrl = null;
            }
          }
          return post;
        })
      );

      setTotalPage(data.pages);
      setPosts(postsWithImages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: true,
      });
    }
  };

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];
      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }
      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  const handleSearch = async (e) => {
    const input = e.target.value;
    setSearch(input);
    try {
      const response = await axios.get(`/posts?q=${input}&page=${currentPage}`);
      const data = response.data.data;
      
      const postsWithImages = await Promise.all(
        data.posts.map(async (post) => {
          if (post.file) {
            try {
              const fileResponse = await axios.get(`/file/signed-url?key=${post.file.key}`);
              post.imageUrl = fileResponse.data.data.url;
            } catch (error) {
              console.error("Error fetching image URL:", error);
              post.imageUrl = null;
            }
          }
          return post;
        })
      );
      
      setPosts(postsWithImages);
      setTotalPage(data.pages);
    } catch (error) {
      setLoading(false);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: true,
      });
    }
  };

  const handlePrev = () => {
    setcurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setcurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNum) => {
    setcurrentPage(pageNum);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Post List</h2>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
          onClick={() => navigate("new-post")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New Post
        </button>
      </div>

      <div className="mb-6 flex items-center border rounded-md">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400 mx-3" />
        <input
          className="w-full p-2 pl-0 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          name="search"
          placeholder="Search here"
          onChange={handleSearch}
        />
      </div>

      {Loading ? "loading..." : 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
          {Posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
              onClick={() => navigate(`detail-post/${post._id}`)}
            >
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-2 rounded-md"/>}
              <h4 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h4>
              <p className="text-gray-600">
              {truncateText(post.desc, 20)}
              </p>
            </div>
          ))}
        </div>
      }

      {pageCount.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2 mb-3">
          <button className="bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-gray-300 transition flex items-center" disabled={currentPage === 1} onClick={handlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
            Prev
          </button>
          {pageCount.map((pageNum, index) => (
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              key={index}
              onClick={() => handlePage(pageNum)}
              style={{
                backgroundColor: currentPage === pageNum ? "#B2DFDB" : ""
              }}
            >
              {pageNum}
            </button>
          ))}
          <button className="bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-gray-300 transition flex items-center" disabled={currentPage === totalPage} onClick={handleNext}>
            Next
            <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};
