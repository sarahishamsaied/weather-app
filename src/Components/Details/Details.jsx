import React, { Component, Fragment } from 'react'
import axios from 'axios'
import style from '../Home/Home.module.css'
import * as BsIcons from 'react-icons/bs'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
export default class Details extends Component {

    weatherIcons = (weatherState)=>{
        switch(weatherState.toLowerCase()){
            case 'light cloud':
            return <BsIcons.BsCloudyFill className={style.icon}/>
            case 'heavy cloud':
            return <BsIcons.BsCloudsFill className={style.icon}/>
            case 'clear':
            return <BsIcons.BsFillSunFill className={style.icon}/>
            case 'showers':
            return <BsIcons.BsFillCloudRainHeavyFill className={style.icon}/>
            case 'thunderstorm':
            return <BsIcons.BsFillCloudLightningRainFill className={style.icon}/>
            case 'hail':
            return <BsIcons.BsCloudHailFill className={style.icon}/>
            case 'heavy rain':
                return <BsIcons.BsCloudRainHeavyFill className={style.icon}/>
            case 'light rain':
                return <BsIcons.BsCloudDrizzleFill className={style.icon}/>
        }
    }
    state = {
        cityDetails:{},
        weatherStates:[],
        isLoaded:false,
        night:true
    }
    woeid = this.props.match.params.id
    getData = async()=>{
        let {data} = await axios.get(`https://the-ultimate-api-challenge.herokuapp.com/https://www.metaweather.com/api/location/${this.woeid}/`)
        console.log(data)
        this.setState({
            cityDetails:data,
            weatherStates:data.consolidated_weather,
            isLoaded:true
        })
        console.log(this.state.weatherStates)
    }
    componentDidMount(){
        this.getData()
    }
  render() {
      if(!this.state.isLoaded)
      return <LoadingScreen/>
      let date = new Date(this.state.cityDetails.time)
      console.log(date.toLocaleString("en-us",{timeZone:this.state.cityDetails.timezone}))
      let x = date.toLocaleString("en-us",{timeZone:this.state.cityDetails.timezone}) 
      let currentCityTime = new Date(x)
      console.log(currentCityTime.getHours())
      if(currentCityTime.getHours()>=6&&currentCityTime.getHours()<18)
      {
          this.state.night = false
      }
    return <Fragment>
        <div className={this.state.night?style.darkMode:style.lightMode}>
            <div className="container p-5">
            <h1 className=' text-white mt-2'>{this.state.cityDetails.title}</h1>
            <p className=' text-white'>{new Date(this.state.cityDetails.time).toDateString()}</p>
            <p className=' text-white'>Timezone: {this.state.cityDetails.timezone}</p>
            <div className="row ">
                {this.state.weatherStates.map((val,index)=>{
                    return <div className={'col-lg-2 col-md-5 col-sm-2 text-white  '+style.card}>
                    {this.weatherIcons(val.weather_state_name)}
                         <h5 className='text-center mt-3'>{val.weather_state_name}</h5>
                        <p>Humidity: {val.humidity} g.kg-1</p>
                        <p>Temperature: {Math.round(val.the_temp)} °C</p>
                        <p>Wind Speed: {Math.round(val.wind_speed)} m/s</p>
                    </div>
                })}
            </div></div>
        </div>
    </Fragment>
  }
}
