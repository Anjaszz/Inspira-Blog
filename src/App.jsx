import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { PrivateLayout } from "./components/layout/PrivateLayout";
import Home from "./pages/Home";
import { CatList } from "./pages/category/CatList";
import { PostList } from "./pages/posts/PostList";
import { Profile } from "./pages/Profile";
import { Setting } from "./pages/Setting";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { NewCategory } from "./pages/category/NewCategory";
import { UpdateCategory } from "./pages/category/UpdateCat";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="categories" element={<CatList />} />
          <Route path="categories/new-category" element={<NewCategory />} />
          <Route path="categories/update-category/:id" element={<UpdateCategory />} />
          <Route path="post" element={<PostList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
