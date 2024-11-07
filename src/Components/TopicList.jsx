import { Link } from "react-router-dom";

function TopicList() {
  const topics = ["coding", "football", "cooking"];

  return (
    <div>
      <h2>Select a Topic</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>
            <Link to={`/articles?topic=${topic}`}>{topic}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicList;
