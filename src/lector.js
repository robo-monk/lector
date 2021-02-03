import { _e, _p, Pragma, util } from "pragmajs"
import { range, wfy, isOnScreen, scrollTo, onScroll, LectorSettings } from "./helpers/index"
import { PragmaWord, PragmaLector, PragmaMark } from "./pragmas/index"
import * as _ext from "./extensions/index"


// TODO add more default options
const default_options = {
  wfy: true,
  pragmatizeOnCreate: true,
  experimental: false
}

const Mark = (lec) => {
  let mark = new PragmaMark(lec)

  function logger(w){
  }

  // auto scroll feature
  // TODO put somewhere else
  let scrollingIntoView = false
  let usersLastScroll = 0

  function userIsScrolling(){
    return usersLastScroll - Date.now() > -10
  }

  function autoScroll(w){
    //return
    if (userIsScrolling() || isOnScreen(mark.element) || scrollingIntoView) return false
    // else we're out of view

    scrollingIntoView = true

    let cbs = [] // these will be the callbacks that are gonna run when the scroll is done
    // TODO  make a class Chain that does this.
    // Chain.add(cb), Chain.do() to execute and shit
    if (lec.isReading){
      lec.pause()
      cbs.push(() => {
        lec.read()
      })
    }

    cbs.push(()=>{
      //console.warn("suck my diiiiiiiiiick")
    })

    //console.warn("mark is out of screen")
    //console.log('lec reading:', lec.isReading)

    scrollTo(mark).then(() => {
      cbs.forEach(cb => cb())
      scrollingIntoView = false
    })
  }

  const threshold = 40 // how fast should you scroll to pause the pointer
  let lastScroll = 0
  onScroll(s => {
    usersLastScroll = !scrollingIntoView ? Date.now() : usersLastScroll
    console.log('user is scrolling', userIsScrolling())

    if (userIsScrolling() && lec.isReading){
      let dscroll = Math.abs(lastScroll-s)
      lastScroll = s
      if (dscroll>threshold){
        console.log('ds=', dscroll)
        // TODO prevent from calling pause to many times
        // on too fast scroll, pause mark
        lec.pause()
      }
    }
  })

  mark.on('mouseover', function(){
    console.log(this, 'hover')
  })

  mark.do(logger, autoScroll)
  return mark
}

export const Word = (element, i) => {
  let w = new PragmaWord(i)
          .as(element)
          .setValue(0)

  console.time('deepQuery')
  let thisw = w.element.deepQueryAll('w')
  console.timeEnd('deepQuery')
  // console.timeLog('deepQuery')

  console.log(thisw.length)
  if (i && thisw.length === 0) {
    w.addListeners({
      "click": function(e, comp){
        this.summon()
      }
    })
  }

  thisw.forEach((el, i) => {
    let ww = Word(el, i)
    w.add(ww)
  })

  return w
}

export const Reader = (l, options=default_options) => {
  l = _e(l)
  if (options.wfy) wfy(l)
  let w = Word(l)

  let lec = new PragmaLector("lector")
              .as(l)
              .setValue(0)
              .connectTo(w)
  
  lec.settings = LectorSettings(lec)
                  .css(`position fixed
                        bottom 10px
                        left 10px
                        background #303030
                        padding 10px`)

  lec.mark = Mark(lec)
  lec.contain(lec.settings)

  function bindKeys(){
    lec.bind("right", _ => lec.goToNext())
    lec.bind("left", _ => lec.goToPre())

    lec.bind("space", _ => false, 'keydown') // dont trigger the dumb fucken scroll thing
    lec.bind("space", function(){
      this.toggle()
      return false
    }, 'keyup')

  }

  function experiment(){
    if (globalThis.pragmaSpace.mousetrapIntegration){
        bindKeys()
    }
  }

  if (options.pragmatizeOnCreate) lec.pragmatize()
  if (options.experimental) experiment()

  return lec
}

function _needWrapper(op){
    return op.stream || op.paginate
}


function _streamer(sf){
  return _p('streamer')
          .setValue(0)
          .run(function(){
            this.fetch = sf
            this.getContent = function(){
              return this.fetch(this.value)
            }
          })

}

export const Lector = (l, options=default_options) => {
  if (!_needWrapper(options)) return Reader(l, options)

  util.log("configuration appears to be a bit more complicated")

  if (options.experimental &&
      options.stream &&
      options.paginate &&
      options.paginate.from === 'stream' &&
      options.paginate.as === 'infiniteScroll'){

    util.log('setting up streamer service')

    let streamer = _streamer(options.stream)
    let paginator = _ext.infinityPaginator(streamer, l)
                    .config(options.paginate.config || {})

    // let reader = _p()
    //               .as(_e(l).parentElement)

    // console.log('creating new lector')
    // console.log(l)
    // console.log(_e(l).parentElement)
    // let options = util.objDiff({ skip: true })
    let reader = Reader(_e(l).parentElement, options)
                  .adopt(paginator, streamer)

    paginator.fill()

    //streamer.wireTo(paginator) // when paginator changes value, change value of streamer as well

    //streamer.do(function(){
      //console.log(`fetching page [${this.value}]`)
    //})

  }
}
