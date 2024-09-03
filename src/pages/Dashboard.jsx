import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,  faNewspaper, faEye, faTags, faChartLine } from '@fortawesome/free-solid-svg-icons';
import axios from "../utils/AxiosInstances";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../components/Loading/LoadingSpin';

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [categories,setCategoris] = useState([]);

  useEffect( () => {
    const getCategories = async () =>{
     
      try{
        
        const response = await axios.get(`/category`);
        const data = response.data.data.total;
        setCategoris(data)
        
        }
        catch(error){
         
          const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        }
      }
      getCategories()
  },[]);

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/posts`);
      const data = response.data.data.total;
      setPosts(data)
      // Mengambil URL file/gambar untuk setiap post
   
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
  }, []);


  return (
    <div className="p-4">
      <header className="flex flex-col sm:flex-row justify-between items-center bg-blue-600 text-white p-4 rounded-md">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faHome} />
          <span className="ml-2">Dashboards - Default</span>
        </div>
        <div className="mt-2 sm:mt-0 flex space-x-2">
          <button className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600">New</button>
          <button className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600">Filters</button>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">TOTAL POST</h2>
              <h1 className="text-2xl font-bold">{loading ? <LoadingSpinner /> : Posts}</h1>
            </div>
            <FontAwesomeIcon icon={faNewspaper} className="text-red-500 text-3xl" />
          </div>
          <div className="text-green-500 mt-2">↑ 3.48% Since last month</div>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">KATEGORI</h2>
              <h1 className="text-2xl font-bold">{loading ? <LoadingSpinner /> : categories}</h1>
            </div>
            <FontAwesomeIcon icon={faTags} className="text-orange-500 text-3xl" />
          </div>
          <div className="text-green-500 mt-2">↑ 3.48% Since last month</div>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">TOTAL VIEW</h2>
              <h1 className="text-2xl font-bold">924</h1>
            </div>
            <FontAwesomeIcon icon={faEye} className="text-green-500 text-3xl" />
          </div>
          <div className="text-green-500 mt-2">↑ 3.48% Since last month</div>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">KENAIKAN VIEW</h2>
              <h1 className="text-2xl font-bold">49,65%</h1>
            </div>
            <FontAwesomeIcon icon={faChartLine} className="text-blue-500 text-3xl" />
          </div>
          <div className="text-green-500 mt-2">↑ 3.48% Since last month</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="col-span-2 bg-blue-900 p-4 rounded-md shadow-md text-white flex flex-col">
          <div className="flex justify-between items-center">
            <h2>OVERVIEW</h2>
            <div className="space-x-2">
              <button className="bg-blue-700 px-4 py-2 rounded-md text-white hover:bg-blue-800">Month</button>
              <button className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-gray-200">Week</button>
            </div>
          </div>
          <h1 className="text-xl mt-4">View</h1>
          <img src="https://placehold.co/600x300/1e3a8a/1e3a8a" alt="Line chart showing sales value over time" className="mt-4 w-full h-auto" />
        </div>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
          <h2 className="text-gray-500">PERFORMANCE</h2>
          <h1 className="text-xl mt-4">Total Post</h1>
          <img src="https://placehold.co/300x300/ffffff/ffffff" alt="Bar chart showing total orders over time" className="mt-4 w-full h-auto" />
        </div>
      </div>
    </div>
  );
};
