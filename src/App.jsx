import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ArticleDetails from "./Components/ArticleDetails";
import ArticleList from "./Components/ArticleList";
import "./App.css";
import TopicArticles from "./Components/TopicArticles";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetails />} />
      </Routes>
    </>
  );
}

export default App;
