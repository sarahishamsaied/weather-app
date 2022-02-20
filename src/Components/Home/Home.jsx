import React, { Component, Fragment } from 'react';
import axios from 'axios'
import style from '../Home/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as FaIcons from 'react-icons/fa'
import * as BsIcons from 'react-icons/bs'
import Navbar from '../Navbar/Navbar';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
class Home extends Component {
    state = {
        coords:[0,0],
        locationData:{},
        moreData:{},
        weatherStates:[],
        isLoaded:false,
        night:true
    }
    getData = async(coords)=>{
        console.log(coords)
        let {data} = await axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${coords[0]},${coords[1]}`);
        console.log("data issdajbk")
        this.setState({locationData:data[0]});
        this.getLocationData(this.state.locationData.woeid)
        console.log(this.state)
    }
    getCoords = ()=>{
        navigator.geolocation.getCurrentPosition(this.getPosition)
    }
    getPosition= (pos)=>{
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;
        console.log(latitude,longitude)
        this.setState({coords:[latitude,longitude]})
        this.getData(this.state.coords)
        return [latitude,longitude];
    } 
    getLocationData = async(woeid)=>{
        let {data} = await axios.get(`https://www.metaweather.com/api/location/${woeid}/`)
        this.setState(
            {
                moreData:data,
                weatherStates:data.consolidated_weather,
                isLoaded:true
            }
            )
        console.log(this.state.moreData)
        console.log(this.state.weatherStates)

    }
    componentDidMount(){
        this.getCoords()
    }
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
    render() {
        if(!this.state.isLoaded)
        return <LoadingScreen/>
        let date = new Date(this.state.moreData.time)
        console.log("date is")
        console.log(date.getHours())
        if(date.getHours()>=6&&date.getHours()<18)
        {
            this.state.night = false
            console.log("morning")
        }
        return <Fragment>
            <div className={this.state.night?style.darkMode:style.lightMode} >
                <h1 className=' text-center'>Weather App</h1>
            <p className=' ml-5 h4'>{this.state.locationData.title}</p>
            <p className='ml-5 h4 '>{new Date(this.state.moreData.time).toDateString("en-us")}</p>
            <p className='ml-5'>Timezone: {this.state.moreData.timezone}</p>

            <ul className={style.weatherStatesList}>
                {this.state.weatherStates.map((val,id)=>{
                    return <li>
                        <div className='mt-1'>
                        {this.weatherIcons(val.weather_state_name)}
                        <h4 className='text-center mt-3'>{val.weather_state_name}</h4>
                        <p>Humidity: {val.humidity} g.kg-1</p>
                        <p>Temperature: {Math.round(val.the_temp)} °C</p>
                        <p>Wind Speed: {Math.round(val.wind_speed)} m/s</p>
                        </div>
                        </li>
                })}
            </ul>
            </div>
        </Fragment>
    }
}
export default Home;