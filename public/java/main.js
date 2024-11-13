//Counting numbers homepage
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".CountingNumbers h2");
    const speed = 75;

    const animateCount = (counter) => {
        const target = +counter.getAttribute("data-target");
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});


//Dropdown product pagina
function toggleContent(id) {
    var content = document.getElementById(id);
    var arrow = content.previousElementSibling.querySelector('.ArrowDropdown');

    if (content.style.display === "") {
        content.style.display = "none";
    }

    if (content.style.display === "none") {
        content.style.display = "block";
        arrow.style.transform = "rotate(0deg)";
    } else {
        content.style.display = "none";
        arrow.style.transform = "rotate(-90deg)";
    }
}







function toggleDropdown(clickedCheckbox) {
    // Haal alle checkboxes op
    const checkboxes = document.querySelectorAll('.faq-checkbox');

    // Doorloop elke checkbox
    checkboxes.forEach((checkbox) => {
        if (checkbox !== clickedCheckbox) {
            checkbox.checked = false; // Sluit alle andere dropdowns
        }
    });
}