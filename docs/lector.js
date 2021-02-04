// import { Lector } from '../src'
// import { Word } from "../src/lector"

lector.globalify()

function fetchContent(index){
  // return content[index]

  return new Promise(resolve => {
    setTimeout(_ => {
      let txt = ""

      let abc = "abcdefghijklmnopqrstuvwrxyz "
      let len = abc.length
      let words = 100

      while (words > 0){
        txt += abc.charAt(Math.floor(Math.random()*len))
        if (Math.floor(Math.random()*6) == 3){
          txt += " "
          words --
        }
      }
      resolve(`<h1> Page ${index} </h1> <p>${txt}</p>`)
    }, Math.random()*1900)
  })
}

function onFetch(p, index){
  console.log("P >>>>>>>>", p)
  return new Promise(resolve => {
    setTimeout(_ => {
      p.css('background lime')
      resolve()
    }, Math.random()*1000)
  })
}

let lectorSettings = {
  // these are the default values
  "toolbar": false,
  "wfy": true,
  "topbar": false,
  "loop": false,
  "autostart": false,
  // "interactive": true,
  pragmatizeOnCreate: true,
  experimental: true,

 stream: fetchContent,// function with index as param that
                      // returns the content for the page
                      // can return a promise

 paginate: {
   from: 'stream',
   as: 'infiniteScroll',
   config: {
    onPageActive: (p, index) => {
      p.css('background green')
      p.onFetch(function(){
        // return onFetch(p)
        if (p.active) {
          if (!p.word){
            //console.log('this.lec', p.lec)
            console.log('>>', 'fetched', p, 'wfying')
            lector.helpers.wfy(p)
            p.word = Word(p).setKey(index)
            
            p.lec.addWord(p.word)
            console.log("appended new page with key", p.word.key)
          }
          console.log(p.word)
          p.css('background whitesmoke')
          // p.lec.connectTo(p.word)
        }
      })
    },

    onPageInactive: p => {
      p.css('background gray')
      //if (p.word){ 
        //p.lec.removeWord(p.word.key)
        //p.word = p.word.destroy()
      //}
    },
    onPageAdd: (p, index) => {
      p.css("background lightgray")
      p.setData({ index: index })
    },
    onCreate: p => p.html("..."),
    onPageDestroy: p => {
      if (p.word){
        console.log('destroy', p.word.key)
        p.lec.removeWord(p.word.key)
        p.word = p.word.destroy()
        console.log(p.lec)
      }
    }
  }
 }
}

pragmaSpace.dev = true
pragmaSpace.integrateMousetrap(Mousetrap)

let lec = Lector(".article", lectorSettings)

let test = _e("div.")
fetchContent(1).then(content => test.html(content))

//setInterval(_ => {
  //console.log(window.scrollY)
  ////_e("#main").prepend(test.cloneNode(true))
  ////_e(".article").destroy()
  //console.log(window.scrollY)
  ////window.scroll(0, test.height)
  ////console.log(test)
  ////console.log(test.height)
//}, 3000)


