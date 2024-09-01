import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faArrowLeft, faArrowRight,faSearch,faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import  axios from "../../utils/AxiosInstances";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment/moment";
import DeleteModal from "../../components/DeleteModal";

export const CatList = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false)
  const [categories,setCategoris] = useState([])
  const [totalPage,setTotalPage] = useState(1);
  const [currentPage, setcurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState([]);
  const [Search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const deleteCategory = async () => {
    try{
      const response = await axios.delete(`/category/${categoryId}`);
      const data = response.data;
      toast.success(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: true,
      });
      getCategories();
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

  const handlePrev = () =>{
    setcurrentPage((prev) => prev - 1)
  }

  const handleNext = () =>{
    setcurrentPage((prev) => prev + 1)
  }

  const handlePage = (pageNum) =>{
    setcurrentPage(pageNum)
  }
  const getCategories = async () =>{
     
    try{
      setLoading(true)
      const response = await axios.get(`/category?page=${currentPage}&q=${Search}`);
      const data = response.data.data;
      setTotalPage(data.pages)
     
      setCategoris(data.categories)
      setLoading(false)
      }
      catch(error){
        setLoading(false)
        const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: true,
      });
      }
    };
    
  useEffect(() =>{
       getCategories();
  },[currentPage]);

  useEffect(()=>{
    if(totalPage > 1){
let tempPageCount = []
for(let i = 1; i <= totalPage  ;i++){
  tempPageCount = [...tempPageCount,i]
}
setPageCount(tempPageCount)
    }else{
      setPageCount([])
    }
  },[totalPage])

  const handleSearch = async (e) =>{
    const input = e.target.value
    setSearch(input)
    try{
      const response = await axios.get(`/category?q=${input}&page=${currentPage}`)
      const data = response.data.data
      setCategoris(data.categories) 
      setTotalPage(data.pages)
    }catch(error){
      setLoading(false)
      const response = error.response;
    const data = response.data;
    toast.error(data.message, {
      position: toast.TOP_RIGHT,
      autoClose: true,
    });
    }
  }

  return (
    <div className="p-6 bg-[#FAF3E0] min-h-screen">
    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
    <button
  className="bg-[#379777] text-white py-2 px-4 rounded-xl transition-transform transform hover:scale-105 hover:bg-[#31886b] focus:outline-none focus:ring-2 focus:ring-[#31886b] focus:ring-opacity-50 flex items-center justify-center w-2/5 sm:w-auto"
  onClick={() => navigate("new-category")}
>
  <FontAwesomeIcon icon={faPlus} className="mr-2 text-xl" />
  <span className="text-base font-medium">Tambah Kategori</span>
</button>

      
      <div className="flex items-center border border-gray-300 rounded-lg w-full max-w-md sm:max-w-xs">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400 mx-3" />
        <input
          className="w-full py-2 px-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="search"
          placeholder="Search here"
          onChange={handleSearch}
        />
      </div>
    </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h2>

      <div className="overflow-x-auto bg-beige shadow-md rounded-lg">
  {Loading ? "Loading..." : (
     <table className="w-full text-left border-collapse">
     <thead>
       <tr className="bg-peach text-black uppercase text-sm">
         <th className="py-3 px-6">Title</th>
         <th className="py-3 px-6">Description</th>
         <th className="py-3 px-6">Created At</th>
         <th className="py-3 px-6">Updated At</th>
         <th className="py-3 px-6">Action</th>
       </tr>
     </thead>
     <tbody className="text-gray-600 text-md font-normal">
       {categories.length === 0 ? (
         <tr>
           <td colSpan="5" className="py-6 text-center text-gray-500 h-96">
             <div className="flex items-center justify-center space-x-2">
               <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-xl" />
               <span>Kategori masih Kosong</span>
             </div>
           </td>
         </tr>
       ) : (
         categories.map((category) => (
           <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-100">
             <td className="py-3 px-6">{category.title}</td>
             <td className="py-3 px-6">{category.desc}</td>
             <td className="py-3 px-6">{moment(category.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
             <td className="py-3 px-6">{moment(category.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
             <td className="py-3 px-6 flex space-x-2">
               <button
                 className="bg-mint text-white py-1 px-3 rounded hover:bg-mint-dark transition flex items-center"
                 onClick={() => navigate(`update-category/${category._id}`)}
               >
                 <FontAwesomeIcon icon={faEdit} className="mr-1" />
                 Update
               </button>
               <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition flex items-center" onClick={() => {openModal(category), setCategoryId(category._id)}}>
                 <FontAwesomeIcon icon={faTrash} className="mr-1" />
                 Delete
               </button>
             </td>
           </tr>
         ))
       )}
     </tbody>
   </table>
  )}
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
  <DeleteModal
    isOpen={isModalOpen}
    closeModal={closeModal}
    deleteAction={deleteCategory}
     itemType="Kategori"
  />
</div>


   
    </div>
  );
}
