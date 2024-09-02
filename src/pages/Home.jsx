import { useEffect, useState } from 'react';
import axios from '../utils/AxiosInstances';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback image URL
  const fallbackImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await axios.get('/posts'); // Fetch posts
        const data = response.data.data.posts;
        
        // Fetch image URLs for each post if image URLs are not directly included
        const postsWithImages = await Promise.all(
          data.map(async (post) => {
            if (post.file) {
              try {
                const fileResponse = await axios.get(`/file/signed-url?key=${post.file.key}`);
                post.imageUrl = fileResponse.data.data.url;
              } catch (error) {
                console.error("Error fetching image URL:", error);
                post.imageUrl = fallbackImageUrl; // Use fallback image URL
              }
            } else {
              post.imageUrl = fallbackImageUrl; // Use fallback image URL
            }
            return post;
          })
        );
        
        setPosts(postsWithImages); // Update state with posts and their images
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="font-sans">
      {/* Recent Posts */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Recent Posts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
                onError={(e) => e.target.src = fallbackImageUrl} // Set fallback image on error
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold">{post.title}</h3>
                <p className="mt-4 text-gray-600">{post.desc ? post.desc.substring(0, 100) + '...' : 'No description available'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-100 px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
        <div className="flex justify-center gap-8">
          {[
            { id: 1, name: 'Inspiration', image: 'https://via.placeholder.com/100' },
            { id: 2, name: 'Ideas', image: 'https://via.placeholder.com/100' },
            { id: 3, name: 'Insights', image: 'https://via.placeholder.com/100' },
          ].map(category => (
            <div key={category.id} className="text-center">
              <img src={category.image} alt={category.name} className="w-24 h-24 mx-auto rounded-full" />
              <h3 className="mt-4 text-xl font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Posts</h2>
        <div className="grid md:grid-cols-1 gap-8">
          {[
            { id: 1, title: 'Featured Post 1', desc: 'This is a description of the featured post.', image: 'https://via.placeholder.com/150' },
          ].map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
                onError={(e) => e.target.src = fallbackImageUrl} // Set fallback image on error
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold">{post.title}</h3>
                <p className="mt-4 text-gray-600">{post.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
