import TopicList from "./TopicList"
import "../App.css"
function Home() {
  return (
    <>
      <section className="home-body">
        <br />
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/99de29bf-a9dd-4957-b607-5cc1e94dde0e/dbwxlim-2416c4ee-dab2-44a1-acde-e2768eac32a1.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk5ZGUyOWJmLWE5ZGQtNDk1Ny1iNjA3LTVjYzFlOTRkZGUwZVwvZGJ3eGxpbS0yNDE2YzRlZS1kYWIyLTQ0YTEtYWNkZS1lMjc2OGVhYzMyYTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.z6jCFI1LzGcqR0LtBsCQ6V64CTtOyQ5j1vF54GFOFgk" alt="news home picture" id="home-img"/>
      </section>
      <div className="topic-list-container">
        <TopicList/>
      </div>
    </>
  );
}

export default Home;