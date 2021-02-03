import{Pragma as e,_e as t,util as n,_p as r,tpl as i}from"pragmajs";import o from"animejs";import"jquery";import s from"compromise";function a(n){return n instanceof e&&(n=n.element),n.isPragmaElement||(n=t(n)),n}function h(e,t=.7){if(!e)throw n.throwSoft(`couldnt not evaluate if [${e}] is on screen`);return c(e=a(e),t*e.rect().height)}function c(e,t=100){if(!e)throw n.throwSoft(`couldnt not evaluate if [${e}] is on screen`);e=a(e);let r=window.scrollY;return function(e,t={}){let n=e.offset(),r=n.top,i=n.top+e.rect().height;return r<=t.bot&&i>=t.top||r<=t.top&&i>=t.bot}(e,{top:r+t,bot:r+window.innerHeight-t})}function l(e,t=200,n=200){return e=a(e),new Promise(((r,i)=>{const s=window.document.scrollingElement||window.document.body||window.document.documentElement,a=e.offset().top-n;o({targets:s,scrollTop:a,duration:t,easing:"easeInOutSine"}).finished.then((()=>{setTimeout(r,20)}))}))}function u(e=(e=>{})){let t=0,n=!1;document.addEventListener("scroll",(function(r){let i=t;t=window.scrollY,n||(window.requestAnimationFrame((function(){e(t,t-i),n=!1})),n=!0)}))}const p=["an","an","ap","di","dy","ec","eg","en","em","eo","ep","eu","id","is","my","ne","od","oo","ot","sy","ur","ur","zo","pto","pyl","acr","aer","agr","ana","ant","apo","aut","bar","bio","cac","cat","cen","cen","con","cub","cyn","dec","dek","dem","dia","dox","eco","ego","eme","eos","epi","erg","eso","eth","eur","exo","geo","gen","hem","hal","hen","hex","hod","hol","hor","hor","hyo","hyp","ide","idi","iso","kil","lei","lep","lip","log","meg","mei","men","mer","mes","mim","mis","mit","mne","mon","myx","nes","nom","oct","oed","oen","omm","ont","opt","pan","pam","par","ped","pin","pis","pol","por","pro","rhe","sei","sit","syn","syl","sym","tax","the","the","tom","ton","top","tox","tri","ulo","uro","uro","xen","xer","zon","zyg","psil","prot","pros","amph","anem","anti","anth","arct","astr","athl","auto","basi","bibl","briz","brom","brom","call","carp","carp","cata","chir","cine","cirr","clad","clav","coel","copr","cosm","crep","cris","crit","cten","cyan","cycl","cyst","deca","deka","delt","derm","dexi","dino","dipl","ecto","endo","engy","eoso","etho","ethi","ethm","ethn","etym","fant","glia","gram","gymn","haem","hapl","heli","hemi","hept","herp","heur","hipp","home","horm","hyal","hydr","hygr","hypn","icos","kine","lamp","leps","leuc","leuk","lith","metr","meta","micr","myri","myth","narc","naut","necr","nect","nema","neur","noth","noto","oeco","ogdo","olig","onom","ophi","orch","orth","pach","paed","pale","path","patr","pect","pent","pept","peri","petr","phae","phag","pher","phil","phob","phon","phor","phos","phot","phyl","phys","plac","plas","plec","plut","pneu","poie","pole","poli","poli","poly","raph","rhag","rhig","rhin","rhiz","rhod","sarc","scel","scop","sema","siph","soma","soph","stea","steg","sten","stig","stom","styl","tach","tars","taur","tele","tele","temn","tetr","than","thus","ther","thym","thyr","trag","trit","trop","xiph","proct","ptych","amphi","arche","archi","arche","arist","arthr","bathy","batho","blenn","blast","botan","brady","bront","calli","calyp","cardi","centr","ceram","cerat","chlor","chore","chrom","chron","chrys","clast","clist","cochl","corac","cotyl","crani","cross","crypt","dendr","dodec","dynam","ennea","gastr","graph","heter","homal","hyper","klept","lekan","macro","melan","meter","morph","nephr","nomad","odont","organ","osteo","palae","palin","peran","phleg","phloe","phren","phryn","phyll","plagi","platy","plesi","pleth","pleur","pogon","polem","potam","rhabd","rhomb","scaph","schem","schis","scler","scoli","scept","scyph","selen","solen","sperm","sphen","spher","stern","stich","stoch","taeni","techn","therm","thyre","traum","trema","trich","troch","troph","xanth","psych","archae","brachi","brachy","bronch","cathar","cephal","chelon","cleist","cosmet","cylind","dactyl","deuter","dogmat","erythr","galact","hendec","ichthy","mening","myrmec","omphal","opisth","opoter","ornith","ostrac","persic","phalar","phaner","phragm","plinth","prasin","presby","rhynch","scalen","strept","stroph","thalam","theori","trachy","trapez","tympan","aesthet","anthrop","branchi","cleithr","epistem","parthen","phalang","pharmac","porphyr","sacchar","sphinct","stalact","stalagm","thalass","oesophag","ophthalm","physalid","pentecost","treiskaidek"];function m(e){return e<=1?4:e<=7?2/6*(e-1)+4:e<=8?1*(e-7)+6:3/8*(e-8)+7}function d(e){let t=0,n=s(e.text);n.has("#Verb")&&(t+=.5),n.has("#Acronym")&&(t+=.8);let r=function(e){let t=e.length;if(t<5)return 0;for(let n of p){if(n.length>=t-3)return 0;if(n==e.substring(0,n.length))return n.length}return 0}(e.text);return r>1&&(t+=r/10),Math.min(1,Math.min(t,1))}function g(e,t){return m(e.text.length)*(t+1)}function f(e){return 1e3/(e/60*4.7)}const w=["#a8f19a","#eddd6e","#edd1b0","#96adfc"],y=["Helvetica","Open Sans","Space Mono"],v=e=>{let t=r("markerfovea").from(i.slider()).setRange(1,10).addClass("slider"),n=r("markercolor").from(i.select({options:w})),o=r("readerfont").from(i.select({options:y})),s=r("wpm").html("<>"),a=r("popupsettings").contain(n,o,t),h=r("settingsWrapper").contain(a,s).addClass("items-center");return h.get=e=>h.bridge?h.bridge.value[e]:null,h.pragmatize()};class k{constructor(e){let t=null,n=null;const r=new Promise(((r,i)=>(t=i,n=r,e(r,i))));return r.cancel=t,r.resolve=n,r}}class b{constructor(e){this.afkChain=new Map,this.activeChain=new Map,this.idleTime=e,this.isIdle=!1,window.onload=window.onmousedown=window.onmousemove=window.onscroll=()=>{this.reset()}}generateActionKey(e){return null==e&&(e=this.afkChain.size),e}onAfk(e,t){return this.afkChain.set(this.generateActionKey(t),e),this}onActive(e,t){return this.activeChain.set(this.generateActionKey(t),e),this}reset(){return clearTimeout(this.t),this.t=setTimeout((()=>this.idle()),this.idleTime),this.active(),this}idle(){return!this.isIdle&&(this.isIdle=!0,P(this.afkChain),this)}active(){return!!this.isIdle&&(this.isIdle=!1,P(this.activeChain),this)}}function P(e){for(const[t,n]of e.entries())n()}function x(e){if(!e)return!1;(e=t(e)).textContent;let n="";for(let t of e.textContent.split(" ")){console.log(typeof t),n+=0!=t.replace(/\s/g,"").length?"<w>"+t.split(" ").join("</w> <w>")+"</w> ":t}e.html(n)}function A(e){let n=(e=t(e)).findAll("*");if(0==n.length)return x(x(e));n.forEach((e=>A(e)))}function T(e){let n=(e=t(e)).findAll("p, div, h1, h2, h3, h3, h4, h5, article, text");return 0==n.length?A(e):(n.forEach((e=>T(e))),!0)}const I=8,C=8;function S(e=0,t=0){return t>I?e:e*(I-t)/C+e}function _(e,t,n){for(var r=[e],i=e;i<t;)r.push(i+=n||1);return r}var E=Object.freeze({__proto__:null,PinkyPromise:k,Idle:b,range:_,isOnScreen:c,isMostlyInScreen:h,scrollTo:l,onScroll:u,crush:m,generateDifficultyIndex:d,wordValue:g,charsMsAt:f,LectorSettings:v,wfy:T,airway:S});class F extends e{constructor(){super(arguments)}get lector(){return this}get mark(){return this.markPragma}set mark(e){this.markPragma=e}get isReading(){return this.w.isReading}get currentWord(){return this.w.currentWord}get currentParent(){return this.currentWord.parent}connectTo(e){return this.w=e,this.add(e),this}addWord(e){return this.w.add(e),this}toggle(){return this.isReading?this.pause():this.read()}read(){n.log("::LECTOR reading",this),this.w.read()}summonTo(e){this.currentParent.value+=e,this.currentWord.summon()}goToNext(){this.summonTo(1)}goToPre(){this.summonTo(-1)}pause(){this.w.pause()}}class M extends e{constructor(e){super(e),this.do((function(){this.hasKids&&this.parent&&(this.parent.value=this.key)}))}get lector(){if(this.parent)return this.parent.lector;n.throwSoft("could not find lector for")}get txt(){return this.text}get index(){return parseInt(this.key)}get mark(){return this.parent?this.parent.mark:null}set mark(e){return this.parent&&(this.parent.mark=e),null}get isReading(){return null!=this.currentPromise}get currentWord(){if(!this.hasKids)return this;let e=this.get(this.value);return e?e.currentWord:n.throwSoft(`Could not find current Word of ${this.key}`)}getFromBottom(e){return this.get(this.kidsum-e)}sibling(e){if(!this.parent)return null;let t=this.parent.get(this.index+e);return t||(console.log(this.parent),e<0?this.parent.sibling(-1).getFromBottom(e):this.parent.sibling(1).get(e))}get next(){return this.sibling(1)}get pre(){return this.sibling(-1)}isInTheSameLine(e){return null!=this.sibling(e)&&(this.sibling(e).top-this.top)**2<10}get isFirstInLine(){return!this.isInTheSameLine(-1)}get isLastInLine(){return!this.isInTheSameLine(1)}time(e=250){return f(e)*g(this,d(this))}pause(){return new k((e=>{this.currentPromise?(this.currentPromise.catch((t=>{this.mark.pause().catch((e=>{console.warn("prevent pause event from bubbling. Chill on the keyboard bro",e)})).then((()=>{this.currentPromise=null,e("done pausing"),console.log("- - - - - PAUSED - - - - - - - -")}))})),this.currentPromise.cancel("pause")):e("already paused")}))}set currentPromise(e){if(this.parent)return this.parent.currentPromise=e;this.currentPromiseVal=new k(((t,n)=>{e.catch((e=>{console.warn(e)})).then((()=>{t(),this.currentPromiseVal=null}))}))}get currentPromise(){return this.parent?this.parent.currentPromise:this.currentPromiseVal}promiseRead(){return this.currentPromise=new k(((e,t)=>{console.time(this.text),this.mark.guide(this).then((()=>{console.timeEnd(this.text),this.parent.value=this.index+1,e(` read [ ${this.text} ] `)})).catch((e=>{console.warn("rejected promise read",e),t(e)}))})),this.currentPromise}read(){return this.currentPromise?new Promise(((e,t)=>{e("already reading")})):this.hasKids?this.currentWord?this.currentWord.read():(this.next.value=0,this.next.read()):(this.promiseRead(),new k((e=>{this.currentPromise.then((()=>(e(),this.currentPromise=null,this.parent.read()))).catch((t=>e("pause")))})))}summon(e=!1){return!this.hasKids&&(console.log("SUMMONING",this),this.parent.pause().catch((()=>console.log("no need to pause"))).then((()=>{this.mark.mark(this,50,!0),e||(this.parent.value=this.index)})))}}class z extends e{constructor(e){super("marker"),this.parent=e,this.element=t("marker"),document.body.appendChild(this.element),this.css("\n  position absolute\n  outline solid 0px red\n  background-color #ffdf6c\n  width 10px\n  height 20px\n  z-index 10\n  opacity 1\n  mix-blend-mode darken\n  border-radius 3px\n"),this.currentlyMarking=null,this.colors=["tomato","#FFDFD6","teal"],window.addEventListener("resize",(()=>{this.mark(this.last_marked,0)})),this.runningFor=0,this.pausing=!1,this.idle=new b(8e3).onAfk((()=>{console.log("user is afk"),this.shout()})).onActive((()=>{console.log("user is back"),this.shutUp()}))}shout(){return console.log("AAAAAAAAAA")}shutUp(){return console.log("SHUTTING UP")}set last_marked(e){this.value=e}get last_marked(){return this.value}setWidth(e){return this.element.width(e),this}get settings(){return{get:function(){return null}}}set color(e){}get cw(){return 30*this.fovea}get fovea(){return this.settings.get("markerfovea")||4}set fovea(e){console.table(["writing fovea",this.settings.find("fovea")]),this.settings.set({fovea:e}),this.element.css({width:30*this.settings.find("fovea")})}get wpm(){return this.settings.get("wpm")||260}set wpm(e){this.settings.set({wpm:e})}pause(){return new Promise(((e,t)=>{if(this.pausing)return t("already pausing");if(this.pausing=!0,this.currentlyMarking&&this.current_anime&&this.last_marked){let n=this.last_marked;console.log("mark was running for",this.runningFor),this.runningFor=0,this.current_anime.complete(),this.current_anime.remove("marker"),this.mark(n,80,!0).then((()=>{e("paused")})).catch((e=>{t("could not mark")})).then((e=>{this.pausing=!1}))}}))}moveTo(e,t,n=(()=>{})){return this.currentlyMarking?new Promise(((e,t)=>e())):new Promise(((r,i)=>{this.currentlyMarking=e,this.current_anime=o({targets:this.element,left:e.left,top:e.top,height:e.height,width:e.width,easing:e.ease||"easeInOutExpo",duration:t,complete:e=>{this.currentlyMarking=null,n(),r()}})}))}mark(t,n=200,r=!1,i="easeInOutExpo"){if(!(t instanceof e))return new Promise((e=>{console.warn("cannot mark"),e("error")}));let o=r?t.width+5:this.cw;return this.moveTo({top:t.top,left:t.x(o),height:t.height,width:o,ease:i},n,(()=>{this.last_marked=t}))}guide(t){return t instanceof e?new k(((e,n)=>{let r=t.isFirstInLine?"easeInOutExpo":"linear";return this.moveTo({top:t.top,left:t.x(this.width)-t.width/2,height:t.height,width:this.cw,ease:r},this.calcDuration(t,1)).then((()=>{this.last_marked=t,this.runningFor+=1,this.mark(t,this.calcDuration(t,2),!1,"linear").then((()=>{e()}))}))})):new Promise(((e,t)=>{console.warn("cannot guide thru"),t("error")}))}calcDuration(t,n=1){if(!t instanceof e)return this.throw(`Could not calculate marking duration for [${t}] since it does not appear to be a Pragma Object`);if(1!=n&&2!=n)return this.throw(`Could not calculate duration for ${t.text} since dw was not 1 or 2`);if(t.isFirstInLine)return 500;if(!this.last_marked)return 0;const r=1==n?.4:.6;let i=(1==n?this.last_marked:t).time(this.wpm);return[e=>e*r,S].forEach((e=>{i=e(i,this.runningFor)})),i}}function D(o,s,a={}){return r("infinity paginator").from(function(r,o={}){return(new e).from(i.create.template.config({name:"paginator",defaultSet:r,fetch:"function"==typeof o.fetch?o.fetch:e=>{n.throwSoft("no fetch source specified")},onCreate:"function"==typeof o.onCreate?o.onCreate:e=>n.log("created",e),onFetch:o.onFetch,onPageAdd:"function"==typeof o.onPageAdd?o.onPageAdd:function(e,t){n.log("added",e)},onPageRender:"function"==typeof o.onPageRender?o.onPageRender:function(e,t){n.log("rendered",e,"active?",e.active)},onPageActive:"function"==typeof o.onPageActive?o.onPageActive:function(e,t){n.log("active",e)},onPageInactive:"function"==typeof o.onPageInactive?o.onPageInactive:function(e,t){n.log("inactive",e)}})).run((function(){this.pageTemplate=t(this._paginatorTemplate),this._clonePage=function(){let e=t(this.pageTemplate.cloneNode(!1));return this.adopt(e),e.lec=this.parent,n.createEventChains(e,"fetch"),e},this.create=function(e=this.value,t="append"){let n=this._clonePage();new Promise((t=>{this.onCreate(n);let r=this.fetch(e),i=o.onFetch||function(e,n){e.html(n),t(e)};r instanceof Promise?r.then((e=>i(n,e))):(i(n,r),t(page))})).then((t=>{t.fetchChain.exec(),this.onPageRender(t,e)})),n[`${t}To`](this.parent.element),this.addPage(n,e)},this.pages=new Map,this.destroy=function(e){this.pages.get(e).destroy(),this.delPage(e)},this.addPage=function(e,t){return this.onPageAdd(e),t=t||this.pages.size,this.pages.set(t,e)},this.delPage=function(e){return this.pages.delete(e)},this.activate=function(e){let t=this.pages.get(e);t.active=!0,this.onPageActive(t,e)},this.inactivate=function(e){let t=this.pages.get(e);t.active=!1,this.onPageInactive(t,e)},this.export("pageTemplate","_clonePage","create","destroy","pages","addPage","delPage","activate","inactivate")}))}(s).config(n.objDiff({streamer:o,fetch:o.fetch},a))).setValue(0).run((function(){const e=4,t=10;this.fill=function(){this.fetching=!0;let r=_(this.value>=e?this.value-e:0,this.value+e),i=Array.from(this.pages.keys()),o=n.aryDiff(r,i),s=n.aryDiff(i,r);console.log(">> DEL",s),console.log(">> ADD",o);for(let e of o)this.create(e);for(let e of s);setTimeout((e=>{this.fetching=!1}),t)}})).run((function(){u(((e,t)=>{if(this.fetching)return;let n=this.value;if(!h(this.pages.get(n))){let e=1,r=t>0?1:-1;for(;;){if(!this.pages.has(n+1)){console.log("no active page!"),this.value=0;break}if(h(this.pages.get(n+e),.5)){this.value=n+e;break}e+=r}}}))})).do((function(){this.activate(this.value),this.inactivate(this.value-this.dv),this.fill()}))}const L={wfy:!0,pragmatizeOnCreate:!0,experimental:!1},R=e=>{let t=new z(e);let n=!1,r=0;function i(){return r-Date.now()>-10}let o=0;return u((t=>{if(r=n?r:Date.now(),console.log("user is scrolling",i()),i()&&e.isReading){let n=Math.abs(o-t);o=t,n>40&&(console.log("ds=",n),e.pause())}})),t.on("mouseover",(function(){console.log(this,"hover")})),t.do((function(e){}),(function(r){if(i()||c(t.element)||n)return!1;n=!0;let o=[];e.isReading&&(e.pause(),o.push((()=>{e.read()}))),o.push((()=>{})),l(t).then((()=>{o.forEach((e=>e())),n=!1}))})),t},O=(e,t)=>{let n=new M(t).as(e).setValue(0),r=n.element.deepFindAll("w");return console.log(r.length),t&&0===r.length&&n.addListeners({click:function(e,t){this.summon()}}),r.forEach(((e,t)=>{let r=O(e,t);n.add(r)})),n},W=(e,n=L)=>{e=t(e),n.wfy&&T(e);let r=O(e),i=new F("lector").as(e).setValue(0).connectTo(r);return i.settings=v().css("position fixed\n                        bottom 10px\n                        left 10px\n                        background #303030\n                        padding 10px"),i.mark=R(i),i.contain(i.settings),n.pragmatizeOnCreate&&i.pragmatize(),n.experimental&&globalThis.pragmaSpace.mousetrapIntegration&&(i.bind("right",(e=>i.goToNext())),i.bind("left",(e=>i.goToPre())),i.bind("space",(e=>!1),"keydown"),i.bind("space",(function(){return this.toggle(),!1}),"keyup")),i};const j=(e,i=L)=>{if(!(o=i).stream&&!o.paginate)return W(e,i);var o,s;if(n.log("configuration appears to be a bit more complicated"),i.experimental&&i.stream&&i.paginate&&"stream"===i.paginate.from&&"infiniteScroll"===i.paginate.as){n.log("setting up streamer service");let o=(s=i.stream,r("streamer").setValue(0).run((function(){this.fetch=s,this.getContent=function(){return this.fetch(this.value)}}))),a=D(o,e).config(i.paginate.config||{});W(t(e).parentElement,i).adopt(a,o);a.fill()}};function V(){const e={Lector:j,Word:O};for(let[t,n]of Object.entries(e))globalThis[t]=n}export{j as Lector,O as Word,V as globalify,E as helpers};