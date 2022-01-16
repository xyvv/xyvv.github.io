/*COUNTER -----------------------------------------------*/
function plus (element){
  let parent = element.parentNode;
  let id = parent.id + "_n";
  let index = parseInt(parent.id.substring(4, id.length));

  let x = parseInt(document.getElementById(id).innerHTML);
  document.getElementById(id).innerHTML = x+1;

  store("num", index);
}

function minus (element){
  let parent = element.parentNode;
  let id = parent.id + "_n";
  let index = parseInt(parent.id.substring(4, id.length));

  let x = parseInt(document.getElementById(id).innerHTML);
  document.getElementById(id).innerHTML = x-1;

  store("num", index);
}

/*CUSTOMIZE BAR ------------------------------------------*/
function showBar(){
  document.getElementById("toggleLeft").style.display = "none";
  document.getElementById("toggleRight").style.display = "inline";

 let toShow = document.getElementsByClassName("showCustomize");
 for (let x = 0; x<toShow.length; x++){
   toShow[x].style.display="inline";
 }

}

function hideBar(){
  document.getElementById("toggleLeft").style.display = "inline-block";
  document.getElementById("toggleRight").style.display = "none";

  let toHide = document.getElementsByClassName("showCustomize");
  for (let x = 0; x<toHide.length; x++){
   toHide[x].style.display="none";
  }

}

 function edit(){
  let titles = document.getElementsByClassName ("itemTitle");
  let counts = document.getElementsByClassName ("itemCount");
  let deleteButtons = document.getElementsByClassName ("delete");

  for (let n = 0; n<titles.length; n++){
    titles[n].setAttribute("contenteditable", true);
    counts[n].setAttribute("contenteditable", true);
    deleteButtons[n].style.display = "inline";
  }

 }

 function save(){
  let titles = document.getElementsByClassName ("itemTitle");
  let counts = document.getElementsByClassName ("itemCount");
  let deleteButtons = document.getElementsByClassName ("delete");

  for (let n = 0; n < titles.length; n++){
    titles[n].setAttribute("contenteditable", false);
    counts[n].setAttribute("contenteditable", false);
    deleteButtons[n].style.display = "none";

    store("text", (n+1));
 }

}

/*ID FORMATS: itemx_n for number count, itemx_t for title */
let temp = localStorage.getItem("num");
let x, y = "";
let itemNumber = 1;

if (temp != null){
 for (let a = 1; a<temp; a++){ //bc one is alr created <= temp creates one extra empty count
  addItem();
  document.getElementById("item" + a + "_n").innerHTML = localStorage.getItem("store_n" + a);
  document.getElementById("item" + a + "_t").innerHTML = localStorage.getItem("store_t" + a);
 }
 document.getElementById("item" + itemNumber + "_n").innerHTML = localStorage.getItem("store_n" + itemNumber);
 document.getElementById("item" + itemNumber + "_t").innerHTML = localStorage.getItem("store_t" + itemNumber);
} else{
  localStorage.setItem("store_n1", "0");
  localStorage.setItem("store_t1", "items");
}


/*Adding and deleting items */
function addItem(){
  lastId = "item" + itemNumber;
  itemNumber = parseInt(itemNumber) + 1;
  localStorage.setItem("num", itemNumber);
  newId = "item" + itemNumber;

  let template = document.getElementById('template');
  let copied = template.cloneNode (true);
  copied.setAttribute('id', newId);

  copied.classList.add("item");

  //inserts new item in DOM ****POSITIONING OF THIS IS VERY IMPORTANT
  let last = document.getElementById(lastId);
  insertAfter (copied, last); 

  //gets all items in classes itemcount and itemtitle
  let titles = document.getElementsByClassName ("itemTitle");
  let counts = document.getElementsByClassName("itemCount");

  //sets unqiue id for count of newest item
  counts[counts.length-1].setAttribute("id", newId + "_n");
  //sets unqiue id for title of newest item
  titles[titles.length-1].setAttribute("id", newId  + "_t");

  //opens storage locations
  let check =   localStorage.getItem("store_n" + itemNumber);
  if (check == null){
  localStorage.setItem("store_n" + itemNumber, "0");
  localStorage.setItem("store_t" + itemNumber, "items");
  }
}

function insertAfter(newNode, referenceNode) {
    if (referenceNode != null){
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
}

function deleteItem(element){
  let parent = element.parentNode;
  let id = parent.id;

  //get all items
  let items = document.getElementsByClassName("item");

  //gets the number of the deleted item
  let deleted = parseInt(id.substring(4, id.length)); 
  
  //deleting the div
  document.getElementById(id).remove();

  //re-number ids
  for (let n = deleted; n < itemNumber; n++){
    document.getElementById("item" + (n+1) + "_n").setAttribute("id", "item" + n + "_n");
    document.getElementById("item" + (n+1) + "_t").setAttribute("id", "item" + n + "_t");

    items[n-1].setAttribute("id", "item" + n);
    //updating local storage (pushes up each value)

    localStorage.setItem("store_t" + n, localStorage.getItem("store_t" + (n+1)));
    localStorage.setItem("store_n" + n, localStorage.getItem("store_n" + (n+1)));
  }
  //removes the last in line bc storage keys cannot change
  localStorage.removeItem("store_t" + itemNumber);
  localStorage.removeItem("store_n" + itemNumber);
  
  //updates number of items 
  itemNumber = parseInt(itemNumber) - 1;
  localStorage.setItem("num", itemNumber);
}


/*LOCAL STORAGE---------------------- */
function store(type, index){
//type -> text or number, index -> item number 
let storeId = "";
let toStoreId = "";

if(index <= itemNumber){ /*prevents the null get id error bc it would count 1 more than # of notes*/
  if (type == "text"){ //storing name
    toStoreId = "item" + index + "_t"; //itemx_t
    storeId = "store_t" + index; //store_tx

    localStorage.setItem(storeId, document.getElementById(toStoreId).innerHTML);

  } else if (type =="num"){ //storing counter

    toStoreId = "item" + index + "_n"; //itemx_t
    storeId = "store_n" + index; //storetx

    localStorage.setItem(storeId, parseInt(document.getElementById(toStoreId).innerHTML));
  }
}
}

function clearData(){
  localStorage.clear();
  location.reload();
}

/*DARK MODE */
let displayMode = "light";
function toggleDark(){

  let r = document.querySelector(':root');

  if (displayMode == "light"){
    displayMode = "dark";

    r.style.setProperty('--almostblack', '#d2d4d6');
    r.style.setProperty('--bg', '#1b2129');
    r.style.setProperty('--customBar', '#415956');
    r.style.setProperty('--linkHover', '#9d9fa1');
    r.style.setProperty('--gray', '#9d9fa1');

  } else if (displayMode == "dark"){
    displayMode = "light";

    r.style.setProperty('--almostblack', '#061b29');
    r.style.setProperty('--bg', 'white');
    r.style.setProperty('--customBar', '#fae5d9');
    r.style.setProperty('--linkHover', '#5f666b');
    r.style.setProperty('--gray', '#5f666b');

  }
}

