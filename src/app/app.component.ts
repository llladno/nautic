import {Component, OnInit} from '@angular/core';
import axios from "axios";
import data from './../assets/data.json'
import {last} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-task';
  photos: any
  slide:number = 1
  state = {
    slidePlus: true,
    slideCons: false,
    sliderPlus: false,
    sliderCons: true
  }

  ngOnInit() {
    this.getData()
  }

  async getData () {
    this.photos = data.photos
  }

  check(){
    console.log('log')
  }

  rightSlide(event:any) {
    let slider:any = document.getElementsByClassName('moveSlider')[0]
    let photo:any = document.getElementsByClassName('photo')[0]
    this.state.sliderCons = false
    if (this.slide <= this.photos.length) {
      photo.style.opacity = '0'
      setTimeout(()=>{
        this.slide ++
        photo.style.opacity = '1'

      },300)
      let last = +slider.style.left.slice(0, -2) * -1
      if (!(last+ 5*120 >= 840)) {
        slider.style.left = `${-120*this.slide}px`
      } else {
        this.state.sliderPlus = true
      }
    }
  }

  leftSlide(event:any) {
    let slider:any = document.getElementsByClassName('moveSlider')[0]
    let photo:any = document.getElementsByClassName('photo')[0]
      photo.style.opacity = '0'
      setTimeout(() => {
        let last = +slider.style.left.slice(0, -2)
        this.slide--
        photo.style.opacity = '1'
          slider.style.left = `${last + 120}px`
        if (last+120 > 0) {
          slider.style.left = 0
          this.slide = 1
        }
      }, 300)

    this.state.sliderPlus = false
  }

  leftSlider(event:any){
    this.state.sliderPlus = false

    let slider:any = document.getElementsByClassName('moveSlider')[0]
    let last = +slider.style.left.slice(0, -2)
    slider.style.left = `${last + 120}px`
    if (last+120 > 0) {
      slider.style.left = 0
    } else if(last +120*2 > 0 )this.state.sliderCons = true
    else this.state.slideCons = false
  }

  rightSlider(event:any){
    let slider:any = document.getElementsByClassName('moveSlider')[0]
    let last = +slider.style.left.slice(0, -2)
    this.state.sliderCons = false
    if (!(last * -1 + 5*120 >= 840)) {
      slider.style.left = `${-120+last}px`
      if (last * -1 + 5*120 >= 720){
        this.state.sliderPlus = true
      }
    }
  }


}

