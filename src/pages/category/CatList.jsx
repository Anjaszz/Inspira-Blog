import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import  axios from "../../utils/AxiosInstances";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment/moment";


export const CatList = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false)
  const [categories,setCategoris] = useState([])
  const [totalPage,setTotalPage] = useState(1);
  const [currentPage, setcurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState([]);

  const handlePrev = () =>{
    setcurrentPage((prev) => prev - 1)
  }

  const handleNext = () =>{
    setcurrentPage((prev) => prev + 1)
  }

  const handlePage = (pageNum) =>{
    setcurrentPage(pageNum)
  }

  useEffect(() =>{
    const getCategories = async () =>{
     
      try{
        setLoading(true)
        const response = await axios.get(`/category?page=${currentPage}`);
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

console.log(currentPage)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center"
          onClick={() => navigate("new-category")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New Category
        </button>
        <input
          className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="search"
          placeholder="Search here"
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Category List</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
       {Loading ? "Loading..." : (
         <table className="w-full text-left border-collapse">
         <thead>
           <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
             <th className="py-3 px-6">Title</th>
             <th className="py-3 px-6">Description</th>
             <th className="py-3 px-6">Created At</th>
             <th className="py-3 px-6">Updated At</th>
             <th className="py-3 px-6">Action</th>
           </tr>
         </thead>
         <tbody className="text-gray-600 text-sm font-light">
           {categories.map((category) => (
             <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-100">
               <td className="py-3 px-6">{category.title}</td>
               <td className="py-3 px-6">{category.desc}</td>
               <td className="py-3 px-6">{moment(category.createdAt).format('YYYY-MM-DD-HH:mm:ss')}</td>
               <td className="py-3 px-6">{moment(category.updatedAt).format('YYYY-MM-DD-HH:mm:ss')}</td>
               <td className="py-3 px-6 flex space-x-2">
                 <button
                   className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition flex items-center"
                   onClick={() => navigate("update-category")}
                 >
                   <FontAwesomeIcon icon={faEdit} className="mr-1" />
                   Update
                 </button>
                 <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition flex items-center">
                   <FontAwesomeIcon icon={faTrash} className="mr-1" />
                   Delete
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
       )}
        {pageCount.length &&  (
        <div className="flex justify-center mt-6 space-x-2">
        <button className="bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-gray-300 transition flex items-center" disabled={currentPage === 1} onClick={handlePrev}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
          Prev
        </button>
       {pageCount.map((pageNum,index) =>(
         <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition" 
         key={index} 
         onClick={() => handlePage(pageNum)}
         style={{
          backgroundColor: currentPage === pageNum ? "#ccc" : ""
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

   
    </div>
  );
}
