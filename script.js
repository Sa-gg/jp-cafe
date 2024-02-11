window.onload = function () {

    // HAMBURGER NAV ANIMATION
    const menu_btn = document.querySelector('.hamburger');
    const nav_bar = document.querySelector('.mobile-nav')
    const anchors = document.querySelectorAll('.nav')
    const header = document.querySelector('.header')

    var lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY;
        
        if (!menu_btn.classList.contains('is-active')) {
            if (scrollPosition > lastScrollTop) {
                // Scrolling down
                header.style.top = '-90px'; 
            } else {
                // Scrolling up
                header.style.top = '0';
            }
        }
        lastScrollTop = scrollPosition;
    })
    
    

    anchors.forEach((anchors) => {
        anchors.addEventListener("click", function () {
            menu_btn.classList.toggle('is-active')
            nav_bar.classList.toggle("is-active")

            
        })
    })

    menu_btn.addEventListener("click", function () {
        menu_btn.classList.toggle('is-active')
        nav_bar.classList.toggle("is-active")
    })

    

    // BOOKING
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    form.addEventListener('submit', e => {
        e.preventDefault();
        msg.innerHTML = "Sending...";
        const scriptURL = form.action;
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "Reservation sent successfully!";
                setTimeout(function () {
                    msg.innerHTML = "";
                }, 5000);
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                msg.innerHTML = "Error sending reservation. Please try again.";
            });
    });
}




// GALLERY SCROLLBAR
const initSlider = () => {
    const imageList = document.querySelector(".gallery-list")
    const slideButtons = document.querySelectorAll(".slide-button")
    const sliderScrollBar = document.querySelector(".slider-scrollbar");
    const scrollbarThumb = document.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;


    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`
            imageList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("mousemove", handleMouseMove);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp)
    })

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"})
        })
    })

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    const updateScrollThumbPoisition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons()
        updateScrollThumbPoisition()
    })
}

window.addEventListener("load", initSlider)

