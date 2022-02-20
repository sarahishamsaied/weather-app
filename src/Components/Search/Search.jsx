import React, { Component, Fragment } from 'react';
import axios from 'axios'
import style from '../Home/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as FaIcons from 'react-icons/fa'
import * as BsIcons from 'react-icons/bs'
import { Link } from 'react-router-dom';
import style2 from '../Search/Search.module.css'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
export default class Search extends Component {
  state = {
    searchQuery:'',
    searchResults:[],
    moreData:[],
    night:true,
    errorMessage:''
  }
  handleChange = (e)=>{
    this.setState({
      searchQuery:e.target.value
    })
    console.log(this.state.searchQuery)
  }
  getMoreData = async()=>{
    console.log(this.state.searchResults)
    for(let i = 0;i<this.state.searchResults.length;i++){
      this.state.moreData.title = this.state.searchResults[i].title
      let {data} = await axios.get(`https://the-ultimate-api-challenge.herokuapp.com/https://www.metaweather.com/api/location/${this.state.searchResults[i].woeid}`)
      this.setState({
        moreData:[...this.state.moreData,data]
      })
    } 

    console.log("more data is")   
    console.log(this.state.moreData)
  }
  resetState = ()=>{
    this.setState({
      searchResults:[],
      moreData:[]
    })
  }
  getSearchResults = async()=>{
    if(this.state.searchQuery === '')
    return;
    let {data} = await axios.get(`https://the-ultimate-api-challenge.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${this.state.searchQuery}`)
    if(!data || data.length === 0)
    {
      this.setState({
        errorMessage:"Cant find what you're looking for"
      })
      return
    }
    this.setState({
      searchResults:data,
      errorMessage:''
    })
    // console.log("search results are",this.state.searchResults)
    this.getMoreData()
  }
  onSubmitHanlder = (e)=>{
    e.preventDefault();
    this.resetState()
    this.getSearchResults()
  }
  componentDidMount(){
    this.getSearchResults()
  }
  render() {
    let time = new Date().getHours()
    if(time>=6&&time<18)
    {
        this.state.night = false
    }
    return <Fragment>
        <div className={this.state.night?style2.darkMode:style2.lightMode}>
          <div className="container">
            <h2 className={'display-2 text-white text-center'}>Search</h2>
          <form action="" onSubmit={this.onSubmitHanlder}>
          <input type="text" name="search" id="" className='form-control' placeholder='Search Cities and Countires' onChange={this.handleChange}/>
        </form>
        <h1 className={this.state.searchResults.length === 0?'d-none':'display-4 text-white my-3'}>Search Results:</h1>
        <h5 className={'text-center text-white'}>{this.state.errorMessage}</h5>
        <div className={"row"}>
          {this.state.moreData.map((val,index)=>{
            return <div className={'col-lg-2 col-md-4 col-sm-2 '+style.card}>
                <h4 className='fw-light'>{val.title}</h4>
                <h5>Timezone</h5>
                <p>{val.timezone}</p>
                <h5>Date/Time</h5>
                <p>{new Date(val.time).toDateString("en-us")}</p>
                <Link to ={`/details/${val.woeid}`} className = "btn btn-light text-dark">More Details</Link>
            </div>
          })}   
        </div>
          </div>
        </div>
    </Fragment>
  }
}
