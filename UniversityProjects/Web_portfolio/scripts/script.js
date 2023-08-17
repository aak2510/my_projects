/* 
 * When the window is scrolled, we want to toggle the scrolled class when we are past 
 * a certain number of pixels.
 */
const home = document.getElementById("homepage");

$(window).scroll(function () {
    $('.navbar').toggleClass('show-nav', $(this).scrollTop() > 50);
    $('.scroll-top').toggleClass('show', $(this).scrollTop() > 50);

});



document.getElementById("scroll-top").addEventListener("click", function scrollHome () {
    home.scrollIntoView();

})



// Modern browsers will trigger click on tap

// When the user presses the hamburger menu
// change to event lister onclick
$('.hamburger-menu').click(function () {
    // The nav-options will have the show class toggled, allows the menu option to appear
    $('.navbar .nav-options').toggleClass('shown');
    // add a red cross instead of the hamburger
    $('.hamburger-menu i').toggleClass('fa-solid fa-bars fa-solid fa-xmark active');
});

currentClass = 0;
$('.music-button i').click(function () {
    if (currentClass === 0) {
        $('.music-button i').removeClass('fa-solid fa-volume-xmark').addClass('fa-solid fa-volume-high');
        toggleAudio(currentClass);
        currentClass = 1;
    } else {
        $('.music-button i').removeClass('fa-solid fa-volume-high').addClass('fa-solid fa-volume-xmark');
        toggleAudio(currentClass);
        currentClass = 0;
    }
});

/**
 * 
 * Music provided by Ross Bugden: https://youtu.be/_rbVt0z6NLM
 * 
 */
const audio = new Audio("../resources/INTERSTELLAR.wav");
audio.volume = 0.5;
audio.loop = true;
function toggleAudio(currentClass) {
    if (currentClass === 0) {
        audio.play();
    } else {
        audio.pause();
    }

}




// Filtering through languages


/**
 * 
 * W3Schools (n.d.). How To Filter Elements. 
 * [online] www.w3schools.com. 
 * Available at: https://www.w3schools.com/howto/howto_js_filter_elements.asp 
 * [Accessed 26 Jan. 2023].
 *  
 */

// We start off by displaying all the elements
filterSelection("show-all");

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("language-icon");
    if (c == "show-all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "showLanguage");
        if (x[i].className.indexOf(c) > -1) {
            w3AddClass(x[i], "showLanguage");
        }
    }
}


// Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// ========================================================================================

// Select all the filter buttons
const items = document.querySelectorAll(".filter-button");
// For each one of those buttons
items.forEach((item) => {
    // Add an event listner on to it, so that whenever we click on it...
    item.addEventListener("click", () => {
        // we remove the active-filter class, which is used to show the underline, on the current filter
        document.querySelector(".filter-button.active-filter").classList.remove("active-filter");

        // Add the active filter class on the current active filter that was clicked
        item.classList.add("active-filter");
    });
});



$(".skillsPage .material-icons").click(function () {
    $('.filter-buttons-container').toggleClass("active-filter-drop-down");
});




form = document.getElementById("contact-form");

function formValidation(e) {
    alert("Thank you. Please keep an eye out on your email for a response.");
    // Clear the form after submission
    form.reset();


}
