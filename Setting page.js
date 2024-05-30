document.getElementById("share-button").addEventListener("click", function() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: "Check out this website!",
            url: window.location.href
        }).then(() => {
            console.log('Shared successfully.');
        }).catch((error) => {
            console.error('Error sharing:', error);
        });
    } else {
        alert("Web Share API is not supported in this browser.");
    }
});

document.getElementById("profile").addEventListener("click", function() {
    window.location.href = "Profile.html";
});

document.getElementById("logout").addEventListener("click", function() {
    alert("You have been logged out.");
    window.location.href = "index.html";
});

document.getElementById("settings-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Settings saved successfully!");
});

document.getElementById("get-location").addEventListener("click", function() {
    getLocation();
});

document.getElementById("terms").addEventListener("click", function() {
    window.location.href = "terms_and_condition.html";
});

document.getElementById("goals").addEventListener("click", function() {
    window.location.href = "Task page.html";
});

document.getElementById("storage").addEventListener("click", function() {
    window.location.href = "Storage.html";
});

function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var api_url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
            
            fetch(api_url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("location").value = data.display_name;
                })
                .catch(error => {
                    console.error("Error fetching location:", error);
                });
        }, function(error) {
            console.error("Geolocation error:", error);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
