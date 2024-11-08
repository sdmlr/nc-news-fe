import { Routes, Route } from "react-router-dom";
import ArticleDetails from "./Components/ArticleDetails";
import ArticleList from "./Components/ArticleList";
import NotFound from "./Components/NotFound";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
