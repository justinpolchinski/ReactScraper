import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/saveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Books extends Component {
  state = {
    articles: [],
    savedArticles:[],
    beginDate:"",
    endDate:""
  };
  handleInputChange = (event) =>{
    console.log("Input change");
    const {name,value} = event.target;
    this.setState({
      [name]:value
    })
    
  }
  
  search4articles = (search, beginDate, endDate) =>{
    
    console.log("Searching for Articles");
    API.searchArticles(search, beginDate,endDate)
      .then(res =>  {
        console.log(res.data.response.docs);
        this.setState({articles: res.data.response.docs});
        console.log(this.state.articles);
        console.log("Headline");
        console.log(this.state.articles[0].headline.main);
        console.log("URL");
        console.log(this.state.articles[0].web_url);
        console.log(this.state.articles[0].pub_date);

      })
      .catch(err=> console.log("Search4Articles: " +err));
    
  }
  handleFormSubmit = event =>{
    event.preventDefault();
    console.log("handle form in book.js");
    this.search4articles(this.state.search, this.state.beginDate, this.state.endDate);
  }
  componentDidMount() {
    this.loadgetallarticles();
    console.log(this.state.savedArticles);
  }
  saveArticle = (event) =>{
    const target = event.target.id;
    
    console.log("target: ");
    console.log(target);
    const contents = {
      headline: this.state.articles[target].headline.main,
      web_url: this.state.articles[target].web_url,
      pub_date: this.state.articles[target].pub_date.slice(0,7)
    }
    API.savearticle(contents)
      //.then(res => this.loadBooks())
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.loadgetallarticles();
  }
  deleteArticles = (event) =>{
    const id = event.target.id;
    API.deletearticle(id)
    .then(res =>  this.loadgetallarticles())
    .catch(err => console.log(err));
   
  }
  loadgetallarticles = () => {
    API.getallarticles()
      .then(res => {
        console.log("res.data: %O", res.data);
        this.setState({ savedArticles: res.data })})
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Ny Times Search</h1>
            </Jumbotron>
            <form>
              <Input name="search" placeholder="Article Search(required)"onChange={this.handleInputChange} />
              <Input name="beginDate" placeholder="year (required)" onChange={this.handleInputChange}/>
              <Input name="endDate" placeholder="year (Optional)" onChange={this.handleInputChange}/>
              <FormBtn
              onClick={this.handleFormSubmit}
              >Submit</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Headines</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map((articles, index) => (
                  <ListItem index={index}  key={index}>

                    <a href={articles.web_url}>
                      <strong>
                        {articles.headline.main}
                        <br /> Published on: {articles.pub_date.slice(0,7)}
                      </strong>
                    </a>
                    <br />
                    <SaveBtn id={index} onClick={this.saveArticle}>Save</SaveBtn>
                    
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>My Saved articles</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map((articles, index) => (
                  <ListItem id={articles._id}  key={index}>

                    <a href={articles.web_url}>
                      <strong>
                        {articles.headline}
                        <br /> Published on: {articles.pub_date}
                      </strong>
                    </a>
                    <br />
                    <DeleteBtn id={articles._id} onClick={this.deleteArticles}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
