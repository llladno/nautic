import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Photo} from "../../assets/types/types";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent{
  @Input() slide: number | undefined
  @Input() state: {
    slidePlus: boolean
    slideCons: boolean
    sliderPlus: boolean
    sliderCons: boolean
  } | undefined
  @Input() photos: any
  @Output() ChangeSlide = new EventEmitter<number>();


  leftSlider(){
    this.state ? this.state.sliderPlus = false : null
    let slider:HTMLElement|null = document.querySelector('moveSlider')
    if (slider) {
      let last = +slider.style.left.slice(0, -2)
      slider.style.left = `${last + 120}px`
      if (last+120 > 0) {
        slider.style.left = `0`
      } else if(last +120*2 > 0 ) this.state ?
        this.state.sliderCons = true : null
      else this.state ? this.state.slideCons = false : null
    }
  }

  rightSlider(){
    let slider:HTMLElement | null = document.querySelector('moveSlider')
    if (slider) {
      let last = +slider.style.left.slice(0, -2)
      this.state ? this.state.sliderCons = false : null
      if (!(last * -1 + 5*120 >= 840)) {
        slider.style.left = `${-120+last}px`
        if (last * -1 + 5*120 >= 720){
          this.state ? this.state.sliderPlus = true : null
        }
      }
    }
  }
}
