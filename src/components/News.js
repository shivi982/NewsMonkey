import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"



export class News extends Component {
 static defaultProps ={
  country: 'in',
  pageSize: 8,
  category: "general"

 } 

 static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,

 }

constructor(props){
  super(props);
  console.log("i am a constructor")
  this.state ={
    articles : [],
    loading: true, 
    page: 1,
    totalResults: 0
  
  }
  document.title = `${this.props.category} - NewsMonkey`;

}
async updateNews(){
  this.props.setProgress(10);
  const url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e1734dd6ceb6413a9d2c77ce00d2fbfe&page=${this.state.page}&pageSize=${this.props.pageSize}`
  this.setState({loading: true});
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);

  this.setState({
    articles: parsedData.articles, 
    totalResults: parsedData.totalResults,
    loading: false})

    this.props.setProgress(100);
}

async componentDidMount(){
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=
  // e1734dd6ceb6413a9d2c77ce00d2fbfe&page=${this.props.page}&pageSize=${this.props.pageSize}`
  // this.setState({loading: true});
  // let data = await fetch(url);
  // let parsedData = await data.json()
  // console.log(parsedData);

  // this.setState({articles: parsedData.articles, 
  //   totalResults: parsedData.totalResults,
  // loading: false})
  this.updateNews();
  

}

handlePreviousClick = async() =>{
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e1734dd6ceb6413a9d2c77ce00d2fbfe&page=${this.state.page - 1
  // }&pageSize=${this.props.pageSize}`
  // this.setState({loading: true});
  // let data = await fetch(url);
  // let parsedData = await data.json()
  // console.log(parsedData);
  // this.setState({
  //   page: this.state.page - 1,
  //   articles: parsedData.articles,
  //   loading: false
  // })

  this.setState({page: this.state.page - 1})
  this.updateNews();

}

handleNextClick = async() =>{
  // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  
  // let url = `//newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e1734dd6ceb6413a9d2c77ce00d2fbfe&page
  // =${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading: true});
  // let data = await fetch(url);
  // let parsedData = await data.json()
  // this.setState({
  //   page: this.state.page + 1,
  //   articles: parsedData.articles,
  //   loading: false
  
  // })}

  this.setState({page: this.state.page + 1})
  this.updateNews();

}

fetchMoreData = async() => {
  this.setState({page: this.state.page+1})
  const url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e1734dd6ceb6413a9d2c77ce00d2fbfe&page=${this.state.page}&pageSize=${this.props.pageSize}`
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);

  this.setState({
    articles: this.state.articles.concat(parsedData.articles), 
    totalResults: parsedData.totalResults,
    })
};



render() {

  return (
    <>
      <h1 className="text-center">NewsMonkey - Top Headlines on {this.props.category}</h1>
      {this.state.loading && <Spinner/>}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
            <div className="container">
      <div className="row">
        {this.state.articles.map((element)=>{
        return <div className="col-md-4" key={element.url}>
        <Newsitems  title={element.title?element.title : ""} description={element.description? element.description : ""} 
        imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} 
        source={element.source.name}/>
      </div>
      
      })}
      </div>
      </div>
      </InfiniteScroll>
      {/* {/* <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; previous </button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}

</>
    
  )
 
}
}


export default News