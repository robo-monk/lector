import { Pragma, util } from "pragmajs";
import { charsMsAt, crush, generateDifficultyIndex, wordValue, PinkyPromise } from "../helpers/index"


export default class PragmaWord extends Pragma {

  constructor(k){
      super(k)
      this.isPragmaWord = true
      this.do(function(){
        if (this.hasKids && this.parent){
          this.parent.value = this.key 
        }
      })
  }

  destroy(){
    //this.childMap = null
    return null
  }

  get lector(){
    if (this.parent) return this.parent.lector
    util.throwSoft('could not find lector for')
  }

  get txt(){
    return this.text
  }

  get index(){
    return parseInt(this.key)
  }

  get mark(){
    if (this.parent) return this.parent.mark
    return null
  }

  set mark(m){
    if (this.parent) this.parent.mark = m
    return null
  }

  get isReading(){
    return this.currentPromise != null
  }

  get currentWord(){
    if (!this.hasKids) return this
    let subW = this.get(this.value ?? this.childMap.keys().next().value) // get current value or first child
    //console.log('subw is', subW, 'map', this.childMap)
    if (!subW) return util.throwSoft(`Could not find current Word of ${this.key}`)
    return subW.currentWord
  }

  getFromBottom(n){
    // get items from last
    return this.get(this.kidsum-n)
  }
  sibling(n){
    if (!this.parent) return null
    let sib = this.parent.get(this.index+n)

    // [1, 2, 3, 4, 5]
    // [1, 2, 3, 4, 5]

    if (!sib){
      if (typeof this.parent.sibling !== 'function') return null

      if (n < 0) return this.parent.sibling(-1)?.getFromBottom(n)
      return this.parent.sibling(1)?.get(n)
    }

    return sib
  }

  get next() {
    return this.sibling(1)
  }
  
  get pre() {
    return this.sibling(-1)
  }

  isInTheSameLine(n) {
    return this.sibling(n) != null && ((this.sibling(n).top - this.top) ** 2 < 10)
  }
  get isFirstInLine() {
    return !this.isInTheSameLine(-1)
  }
  get isLastInLine() {
    return !this.isInTheSameLine(1)
  }
  time(wpm = 250) {
    return charsMsAt(wpm) * wordValue(this, generateDifficultyIndex(this))
  }
  pause(){
    return new PinkyPromise( resolve => {
      if (this.currentPromise){
        this.currentPromise.catch((e)=>{
          //console.log("broke read chain")
          this.mark.pause().catch(e => {
            // this will trigger if mark is already pausing and not done yet
            console.warn("prevent pause event from bubbling. Chill on the keyboard bro", e)
          }).then(() => {
            this.currentPromise = null
            resolve("done pausing")
            // console.log("- - - - - PAUSED - - - - - - - -")
          })
        })
        this.currentPromise.cancel("pause")
      } else { resolve("already paused") }
    })
  }

  set currentPromise(p){
    if (this.parent) return this.parent.currentPromise = p
    this.currentPromiseVal = new PinkyPromise((resolve, reject) => {
      p.catch((e) => {
        console.warn(e)
        // this.currentPromiseVal = null
        // reject(e)
      }).then(() => {
        // this.currentPromiseVal = null
        resolve()
        this.currentPromiseVal = null
      })
    })
  }

  get currentPromise() {
    return this.parent ? this.parent.currentPromise : this.currentPromiseVal
  }

  promiseRead(startingToRead){
    this.currentPromise = new PinkyPromise((resolve, reject) => {
          // this.mark = "MARK V5 " + this.text() + this.key
          // console.log(this.mark)
          // console.log(this.text())
          function launchMark(){
            let time = startingToRead ? 500 : null
            console.time(this.text)
            this.mark.guide(this, time).then(() => {
              console.timeEnd(this.text)
              this.parent.value = this.index + 1
              resolve(` read [ ${this.text} ] `)
            }).catch((e) => {
              console.warn('rejected promise read', e)
              reject(e)
            })
          }
      

          let self = this
          if (startingToRead){
            new Promise(resolve => {
              resolve()
            }).then(data => {
              launchMark.bind(self)()
            })
          } else {
            launchMark.bind(self)()
          }
      })
    // console.log(this.mark)
    return this.currentPromise
  }

  read(source=false){
    if (this.currentPromise) return new Promise((resolve, reject) => {
      resolve('already reading')
    })

    if (this.hasKids){
      // recursive reading 
      if (this.currentWord) return this.currentWord.read(source)
      this.next.value = 0
      return this.next.read()
    } 

    this.promiseRead(source)
    // console.log(this)
    return new PinkyPromise(resolve => {
      this.currentPromise.then(() => {
       resolve()
       this.currentPromise = null
       return this.parent.read()
      }).catch(e => resolve('pause'))
    })
  }

  summon(silent=false) {
    // if (this.hasKids) return false
    // if (this.hasKid)
    // if (this.hasKids){
      // console.log('thissummoning ', this)
      // recursive reading 
      // if (this.currentWord) return this.currentWord.summon()
      // console.error('couldnt summon word on', this)
    // } 
    // console.log("SUMMONING", this)
    return new PinkyPromise(resolve => {
      this.parent.pause().catch(() => console.log('no need to pause')).then(() => {
        this.mark.mark(this, 50, false).then(() => {
          resolve()
        })
        if (!silent) this.parent.value = this.index
      })
    })
  }
}
