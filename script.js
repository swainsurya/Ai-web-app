// Scripting overhere

// responsive sidebar

let sideIcon = document.querySelector(".sidebar-img") ;
let sidebar = document.querySelector(".sidebar") ;
let closeBtn = document.querySelector(".closeSidebar") ;

// opening and closing sidebar

closeBtn.addEventListener("click",() => {
    console.log("close clicked");
    sidebar.classList.add("hidden")
}) ;
sideIcon.addEventListener("click",() => {
    sidebar.classList.remove("hidden")
}) ;