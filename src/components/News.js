import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1, // pahilyanda 1st page var asu by default 1st page var
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cdee5a0ed81344e6afad426a0e3d5a17&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30)
    let data = await fetch(url);
    this.props.setProgress(70)
    let parseData = await data.json();
    this.props.setProgress(100)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrvClick = async () => {
    console.log("privious");
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("Next");
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  
  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cdee5a0ed81344e6afad426a0e3d5a17&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center" style={{margin: '35px 0px', marginTop:"90px"}}>
        NewsNest -Top from {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner/>}  

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
           <div className="container my-4">

            
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title?element.title.slice(0,45):""}
                    description={element.description?element.description.slice(0,80):""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}              
                    author={element.author}
                    source={element.source.name}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
