let aboutToggle = false;
let expToggle = false;

function toggleAbout (hide, show){
  let toHide = "";
  let toShow = "";

  if (aboutToggle == false){
    toHide = hide;
    toShow = show;
    aboutToggle = true;
    document.getElementById("aboutP").style.display = "block";
  } else {
    toHide = show;
    toShow = hide;
    aboutToggle = false;
    document.getElementById("aboutP").style.display = "none";
  }

  document.getElementById(toHide).style.display = "none";
  document.getElementById(toShow).style.display = "inline-block";
}


function toggleExp (hide, show){
  let toHide = "";
  let toShow = "";

  if (expToggle == false){
    toHide = hide;
    toShow = show;
    expToggle = true;
    document.getElementById("exP").style.display = "block";
 
  } else {
    toHide = show;
    toShow = hide;
    expToggle = false;
    document.getElementById("exP").style.display = "none";
   
  }

  document.getElementById(toHide).style.display = "none";
  document.getElementById(toShow).style.display = "inline-block";
}