import { Link } from "react-router-dom";
import "../App.css"

function TopicList() {
  const topics = [
    {
      name: "coding",
      description: "Discover insights about coding and development.",
      imageUrl:
        "https://www.21kschool.com/za/wp-content/uploads/sites/23/2023/07/Coding.png",
    },
    {
      name: "cooking",
      description: "Explore recipes, and cooking tips.",
      imageUrl:
        "https://amazingfoodanddrink.com/wp-content/uploads/2023/12/Cooking-Skills-77.webp",
    },
    {
      name: "football",
      description: "Stay updated with football news, matches, and more.",
      imageUrl:
        "https://t3.ftcdn.net/jpg/08/59/22/20/240_F_859222016_KhaQ8b4h71NdQyh3gJwpQOIjySdejb90.jpg",
    },
  ];

  return (
    <div className="topic-list">
      <h2>Topics</h2>
      <ul className="topic-card-container">
        {topics.map((topic) => (
          <li key={topic.name} className="topic-card">
            <Link to={`/articles?topic=${topic.name}`}>
            <img src={topic.imageUrl} alt="topic picture" className="topic-image" />
            <h3>{topic.name}</h3>
            <p>{topic.description}</p></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicList;
