import { useEffect, useRef, useState } from "react";
import axios from "../utils/AxiosInstances";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faQuoteLeft, faUsers } from "@fortawesome/free-solid-svg-icons";
import { LoadingPage } from "../components/Loading/LoadingPage";
import contactImage from '../assets/images/contact.svg';
import AboutImage from '../assets/images/about.svg';
import headerImage from '../assets/images/header-image.svg';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
      }
    };
    const intervalId = setInterval(scroll, 50); 
    return () => clearInterval(intervalId);
  }, []);

 
  const fallbackImageUrl = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); 
        const response = await axios.get("/posts/all", { params: { size: 6 } }); 
        const data = response.data.data.posts;
       
        const postsWithImages = await Promise.all(
          data.map(async (post) => {
            if (post.file) {
              try {
                const fileResponse = await axios.get(`/file/signed-url?key=${post.file.key}`);
                post.imageUrl = fileResponse.data.data.url;
              } catch (error) {
                console.error("Error fetching image URL:", error);
                post.imageUrl = fallbackImageUrl;
              }
            } else {
              post.imageUrl = fallbackImageUrl; // Use fallback image URL
            }
            return post;
          })
        );

        setPosts(postsWithImages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
  <div className="flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 bg-gray-50 w-full mt-16">
  <div className="md:w-1/2 flex flex-col items-start">
    <h1 className="text-2xl sm:text-5xl font-bold text-gray-800 leading-tight">
      Selamat datang di <br />
      <span className="text-[#7695FF]">inspiraBlog</span>
    </h1>
    <p className="mt-4 text-gray-600 text-xs sm:text-sm text-left">
      Di sini, kami menghadirkan beragam inspirasi, ide, dan pandangan untuk memotivasi setiap langkah Anda. Temukan artikel menarik yang memicu kreativitas, memacu semangat, dan membantu Anda mencapai versi terbaik dari diri sendiri.
      Mari bersama-sama menjelajahi dunia penuh inspirasi.
    </p>
    <div className="relative inline-flex group mt-6">
      <div
        className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
      ></div>
      <a
        onClick={()=> navigate("/signup")}
        className="relative inline-flex items-center justify-center px-5 py-2 text-sm sm:text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        role="button"
      >
        Gabung
      </a>
    </div>
  </div>
  <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
    <img src={headerImage} alt="Illustration of people working on a project" className="w-full h-auto object-cover rounded-lg" />
  </div>
</div>



      {/* Fitur Section */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Fitur-Fitur</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-dashed border-2 border-gray-300 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full flex items-center justify-center w-16 h-16">
                <FontAwesomeIcon icon={faFileAlt} size="2x" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Artikel Inspiratif</h2>
            <p className="text-gray-600">Kami menyajikan berbagai artikel yang penuh dengan inspirasi, mulai dari tips produktivitas, panduan pengembangan diri, hingga cerita-cerita motivasi yang membangkitkan semangat.</p>
          </div>
          <div className="border-dashed border-2 border-gray-300 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full flex items-center justify-center w-16 h-16">
                <FontAwesomeIcon icon={faQuoteLeft} size="2x" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quotes of the Day</h2>
            <p className="text-gray-600">Dapatkan kutipan motivasi harian yang dikurasi khusus untuk membantu Anda memulai hari dengan penuh semangat dan fokus.</p>
          </div>
          <div className="border-dashed border-2 border-gray-300 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full flex items-center justify-center w-16 h-16">
                <FontAwesomeIcon icon={faUsers} size="2x" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Komunitas Pembaca</h2>
            <p className="text-gray-600">Bergabunglah dengan komunitas pembaca inspiraBlog di media sosial dan forum kami. Berbagi pengalaman, bertukar ide, dan temukan teman baru yang juga mencari inspirasi dalam hidup mereka.</p>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center py-16 px-6">
        <div className="md:w-1/2">
          <img src={AboutImage} alt="Illustration of people working with charts and graphs" className="w-full" />
        </div>
        <div className="md:w-1/2 w-full pl-2 sm:pl-12 mt-8 md:mt-0">
          <h2 className="text-[#7695FF] text-sm sm:text-lg font-semibold">Kenapa memilih kami?</h2>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-2 text-center">Tentang Kami</h1>
          <p className="text-gray-600 text-center mt-4 text-xs sm:text-lg">
            inspiraBlog adalah ruang digital yang didedikasikan untuk menggali dan menyebarkan inspirasi, kami berkomitmen untuk menghadirkan konten yang memotivasi, membangkitkan kreativitas, dan menginspirasi perubahan positif dalam
            kehidupan pembaca kami. Melalui artikel, cerita, dan panduan, inspiraBlog menjadi sumber daya bagi siapa pun yang mencari dorongan untuk mencapai tujuan mereka, menjelajahi ide-ide baru, atau sekadar mencari semangat dalam
            keseharian. Kami percaya bahwa setiap orang memiliki potensi luar biasa yang dapat dikembangkan, dan inspiraBlog ada untuk membantu Anda menemukan dan mewujudkan potensi tersebut. Terima kasih telah menjadi bagian dari komunitas
            kami, dan selamat menjelajahi dunia inspirasi bersama kami.
          </p>
        </div>
      </div>

      <div className="py-12">
        {loading && <LoadingPage />}
        <h2 className="text-center text-2xl font-bold mb-8">Post terbaru</h2>
        <div ref={scrollRef} className="overflow-x-scroll scrollbar-hide flex space-x-4 px-4">
          {posts.map((post) => (
            <div key={post._id} className="flex-shrink-0 mb-2 w-64 bg-white rounded-lg shadow-md" onClick={() => navigate(`detail-post/${post._id}`)}>
              <img src={post.imageUrl} alt={post.title} className="w-full h-40 rounded-t-lg object-cover" onError={(e) => (e.target.src = fallbackImageUrl)} />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-500">{post.desc ? post.desc.substring(0, 100) + "..." : "No description available"}</p>
              </div>
              <div className="flex items-center justify-center p-2">
                <button className="text-xl text-gray-600 hover:text-gray-900 transition duration-200">&#8250;</button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="w-2 h-2 bg-[#7695FF] rounded-full mx-1"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
        </div>
      </div>
      {/*contact*/}
      <div className="container mx-auto px-1 sm:px-4 py-16 flex flex-col items-center">
        <div className="sm:w-1/2">
          <img src={contactImage} alt="Illustration of a person with a headset, sitting at a desk with a laptop, and various communication icons around" className="w-full"/>
        </div>
        <div className="w-full sm:w-1/2 pl-2 sm:pl-12">
          <h2 className="text-[#7695FF] text-md font-semibold sm:text-lg">Kontak kami</h2>
          <h1 className="text-sm sm:text4xl font-bold mb-2 sm:mb-4">Kami Siap Membantu Anda</h1>
          <p className="text-gray-600 mb-8 text-xs sm:text-lg text-left">
            Kami ingin mendengar dari Anda! Jika Anda memiliki pertanyaan, komentar, atau umpan balik, jangan ragu untuk menghubungi kami melalui formulir di bawah ini atau menggunakan informasi kontak yang tertera. Kami akan segera
            membalas pesan Anda.
          </p>
          <form className="space-y-4  px-2 sm:px-6">
            <div className="flex space-x-4 ">
              <input type="text" placeholder="Name" className="w-1/2 h-2/3 p-2 border border-gray-300 rounded" />
              <input type="email" placeholder="Email" className="w-1/2 p-2 border border-gray-300 rounded" />
            </div>
            <textarea placeholder="Message" className="w-full p-4 border border-gray-300 rounded h-32"></textarea>
            <button type="submit" disabled className="bg-[#7695FF] text-white px-6 py-3 rounded">
              Kirim
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
