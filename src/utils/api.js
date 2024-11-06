import axios from "axios";

const apiBase = "https://news-project-fe7s.onrender.com/api";

export const fetchArticles = () => {
  return axios.get(`${apiBase}/articles`);
};

export const fetchArticleById = (article_id) => {
  return axios.get(`${apiBase}/articles/${article_id}`);
};

export const fetchComments = (article_id) => {
  return axios.get(`${apiBase}/articles/${article_id}/comments`);
};

export const postComment = (article_id, newComment) => {
  return axios.post(`${apiBase}/articles/${article_id}/comments`, newComment, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const patchVotes = (article_id, incVote) => {
  return axios.patch(`${apiBase}/articles/${article_id}`, {
    inc_votes: incVote,
  });
};