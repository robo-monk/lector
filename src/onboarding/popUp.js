import { _e, _p, Pragma, util, _thread, runAsync } from "pragmajs"
import icons from '../ui/icons.json'


export class popUp extends Pragma{ 

    constructor(){
        super()
        this.background 
        this.popUp
        this.popUpContent
        this.nextBtn
        this.backBtn
    }

    render(){
        this.background = _e('div.blurred-bg').appendTo('body')

        this.popUpContent = _e('div.popUpContent')

        this.popUp = _p('popUpPragma')
                    .as(_e('div.popUp'))
                    .appendTo(this.background)
                    .append(this.popUpContent)
                    


        this.nextBtn = _e('div.next-btn')
                      .html(`<div class="next-icon">${icons['back-icon']}</div>`) 
                      .appendTo(this.popUp)

        this.backBtn = _e('div.back-btn')
                      .html(`<div class="back-icon">${icons['back-icon']}</div>`) 
                      .appendTo(this.popUp)


    }



}