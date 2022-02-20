import React from 'react'
import UseAnimations from 'react-useanimations'
import loading2 from 'react-useanimations/lib/loading2'
import style from '../LoadingScreen/LoadingScreen.module.css'
import style2 from '../Home/Home.module.css'
export default function LoadingScreen() {
  let date = new Date()
  console.log("the date is", date)
  return (
    <div className={style.loadingScreen}>
       <UseAnimations
        animation = {loading2}
        size={100}
        style={{ padding: 200 }}
        autoplay = {true}
        fillColor = 'white'
      />
    </div>
  )
}

