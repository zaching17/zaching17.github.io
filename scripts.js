function openTab(event, tabName) {
    // Hide all tab contents
    var i, tabcontent, tablink;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove 'active' class from all tablinks
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }

    // Show the selected tab content and add an 'active' class to the clicked tab
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}