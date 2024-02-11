import {Component, OnInit} from '@angular/core';
import data from './../assets/data.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-task';
  photos: any;
  slide:number = 1
  state = {
    slidePlus: true,
    slideCons: false,
    sliderPlus: false,
    sliderCons: true
  }
  popup: boolean = false

  ngOnInit() {
    this.getData()
    addEventListener('keydown' , (e)=>{
      if (e.keyCode == 27) this.popup = false
    })
  }

  onChangeData(event:number){
    this.slide = event
  }

  onChangePopup(event:boolean){
    this.popup = event
  }

  async getData () {
    this.photos = data.photos
  }

  rightSlide(event:MouseEvent) {
    let slider: HTMLElement | null = document.querySelector('.moveSlider');
    let photo: HTMLElement | null = document.querySelector('.photo');
    if (slider && photo) {
      this.state.sliderCons = false;
      if (this.slide <= this.photos.length) {
        photo.style.opacity = '0';
        setTimeout(() => {
          this.slide++;
          photo ? photo.style.opacity = '1' : null;
        }, 300);
        let last = -(parseInt(slider.style.left) || 0);
        if (!(last + 5 * 120 >= 840)) {
          slider.style.left = `${-120 * this.slide}px`;
          if (this.slide * -120 <= -240) {
            slider.style.left = `${-120 * (this.photos.length - 5)}px`;
            this.state.sliderPlus = true;
          }
        } else {
          this.state.sliderPlus = true;
        }
      }
    }
  }

  leftSlide() {
    let slider:HTMLElement| null = document.querySelector('moveSlider')
    let photo:HTMLElement| null = document.querySelector('photo')
    if (photo){
      photo.style.opacity = '0'
      setTimeout(() => {
        if (photo && slider){
          let last = +slider.style.left.slice(0, -2)
          this.slide--
          photo.style.opacity = '1'
          slider.style.left = `${last + 120}px`
          if (last+120 > 0) {
            slider.style.left = '0'
            this.slide = 1
          }
        }
      }, 300)
      this.state.sliderPlus = false
    }

  }
}

