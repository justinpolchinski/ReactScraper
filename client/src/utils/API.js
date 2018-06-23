import axios from "axios";
const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
const apiKey = "&api-key=6fb325e9f01045fda6bff46cf066427c";
export default {
  //Searching Nytimes with their API
  searchArticles: function (search,beginDate,endDate){
    console.log("API.js searchArticles")
    return axios.get(`${url}q=${search}&begin_date=${beginDate}0101&end_date=${endDate}1231${apiKey}`);
  },
  // Gets all article
  getallarticles: function() {
    return axios.get("/api/article");
  },
  // Gets the article with the given id
  // getarticle: function(id) {
  //   return axios.get("/api/article/" + id);
  // },
  // // Deletes the article with the given id
  // deletearticle: function(id) {
  //   return axios.delete("/api/article/" + id);
  // },
  // Saves a article to the database
  savearticle: function(articleData) {
    console.log("hit API.js savearticle");
    console.log(articleData);
    return axios.post("/api/article", articleData);
  }
};
