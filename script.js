// Script har bearbetats, men hämtades ursprungligen från:
// https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp 
//Dessa två funktioner öppnar respektive stänger sidebar:en.


function openNav() {
    document.getElementById("mySidebar").style.width = "220px";
    document.getElementById("mySidebar").style.marginLeft = "0%";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.marginLeft = "0%";} 

// Delvis hämtad från 
// https://stackoverflow.com/questions/52049021/if-statement-to-check-css-property-not-working
// Bestämmer ifall sidebar:en ska öppnas eller stängas, och gör detta genom att kolla ifall den är stor eller liten.

function deciderFunction() {
    var sidebar = document.getElementById("mySidebar");

    // Get the computed style, that is the combination of styles 
    // resulting from your CSS classlist, etc
    var computedStyle = window.getComputedStyle(sidebar, null); 

    // Get visibility value from computed styles
    var widthValue = computedStyle.getPropertyValue("width")

    if (widthValue == "220px" ) {
        closeNav()
    } 
    else {
        openNav()
    }

}
