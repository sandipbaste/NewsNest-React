import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, source, date } = this.props;
    return (
      <div className="container my-3">
        <div className="card">
          <div style={{ display:'flex',
            justifyContent:'flex-end',
            position: 'absolute',
            right: 0
          }}>
          <span className="badge rounded-pill bg-danger">
            {source}   {/* konatya news chi red color madhe batch ahe te  */}
          </span>
          </div>
          <img src={!imageUrl?"https://cdn.ndtv.com/common/images/ogndtv.png": imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p><small>
            <p>{!author? "Unkown Author" : author} on {new Date(date).toGMTString()}</p></small>
            <a href={newsUrl} className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}
