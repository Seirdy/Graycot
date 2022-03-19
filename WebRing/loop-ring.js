const styles = `
#LoopRing{
  display: flex;
  justify-content: center;
}

.loop-ring * {
  margin:           unset;
  box-sizing:       border-box;
  padding:          unset;
  color:            unset;
  text-decoration:  unset;
}
.loop-ring{
  width:max-content;
  height:max-content;
  display: flex;
}
.loop-ring:hover, .loop-ring:focus { box-shadow: none;  }

.loop-ring a {
  font: 700 1.3rem "Poppins"; color: #f5f5f5;
  font-family: sans-serif;
  
  border: 1px solid #b3b6b3;
  margin: 0.1rem;
  padding: 0.2rem 0.5rem;
  display: inline;
  white-space: nowrap ;

  margin: auto;
  padding: auto;
  line-height: unset;
  box-shadow: none;
  display: flex;
  justify-content: center;
  width: 100%;
}

.loop-ring a:first-child {
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
}

.loop-ring a:last-child {
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
}

.loop-ring a:hover, .loop-ring a:focus {  
  box-shadow:
  0 0 1px 1px #fff7f7,   
  0 0 2px 2px #c4bdbd, 
  0 0 3px 3px #4e4d4d,

  inset 0 0 1px  #4e4d4d,
  inset 0 0 2px  #c4bdbd,
  inset 0 0 2px  #fff7f7;
}

`
// Applies the CSS above to the HTML page
const styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

// Imports the list of member sites from sites.js:
import { sites } from "./sites.js";

// Sets thisSite to the adress of the site the user is currently on:
let thisSite = window.location.href;
// Finds the index of thisSite on the site list
let thisIndex;
let i;
for (i = 0; i < sites.length; i++) {
  if (thisSite.startsWith(sites[i])) {
    thisIndex = i;
    break;
  }
}

//Calculate Random site:
let otherSites;
otherSites = sites.slice();
otherSites.splice(thisIndex, 1);
let randomIndex = Math.floor(Math.random() * otherSites.length);

//Calculate Previous and Next sites
let previousIndex = (thisIndex-1 < 0) ? sites.length-1 : thisIndex-1;
let nextIndex = (thisIndex+1 >= sites.length) ? 0 : thisIndex+1;

// If the site that the user is currently on is not part of the webring, set the Previous and Next links to be Random.
if (thisIndex == null) {
  previousIndex = randomIndex;
  nextIndex = randomIndex;
}

// Insert HTML next to id="LoopRingJS":
let tag = document.getElementById('LoopRing');
tag.insertAdjacentHTML('afterbegin', ` 

  <div class="loop-ring">
      <a href='${sites[previousIndex]}'> < </a>
      <a href="./index.html#list"> ... </a>
      <a href="./index.html">Loop Ring</a>
      <a href='${sites[randomIndex]}'> ? </a>
      <a href='${sites[nextIndex]}'> > </a>
  </div>
   
`);