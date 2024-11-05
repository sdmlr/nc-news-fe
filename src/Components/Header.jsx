import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1 className="title">Nothing News</h1>
      <nav id="nav">
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
      </nav>
    </header>
  );
}

export default Header;
