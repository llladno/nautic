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

  ngOnInit() {
    this.getData()
  }

  async getData () {
    this.photos = data.photos
  }

  rightSlide(event:any) {
    let slider:any = document.getElementsByClassName('moveSlider')[0]
    let photo:any = document.getElementsByClassName('photo')[0]
    if (this.slide <= this.photos.length) {
      photo.style.opacity = '0'
      setTimeout(()=>{
        this.slide ++
        photo.style.opacity = '1'

        if (this.slide >= this.photos.length){
          this.slide = this.photos.length
          slider.style.left = `${-40*this.slide+40}px`
        }

      },300)
      slider.style.left = `${-40*this.slide}px`
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
        slider.style.left = `${last + 40}px`
        if (last+40 > 0) {
          slider.style.left = 0
          this.slide = 1
        }
        console.log(last)
      }, 300)
  }
}

