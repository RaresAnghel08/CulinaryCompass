function initMap() {
    // Obține elementul HTML pentru hartă
    const mapElement = document.getElementById("map");
    // Verifică dacă browser-ul suportă geolocația
    if (navigator.geolocation) {
        // Opțiuni pentru obținerea poziției curente
        const options = {
            enableHighAccuracy: true, // Activează precizia mare
            timeout: 5000, // Limită de timp pentru a obține poziția (în milisecunde)
            maximumAge: 0 // Timp maxim pentru care poziția curentă poate fi considerată validă (0 pentru a forța actualizarea poziției)
        };
        // Obține poziția curentă a utilizatorului cu opțiunile specificate
        navigator.geolocation.getCurrentPosition(function(position) {
            // Obține coordonatele latitudine și longitudine ale poziției curente
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // Creează obiectul pentru coordonatele locației curente
            const myLocation = { lat: lat, lng: lng };
            // Creează o hartă și afișează locația curentă
            createMap(mapElement, myLocation);
        }, function(error) {
            console.error("Error getting user location:", error);
            // În caz de eroare, afișează harta cu centrul în centrul orașului
            const cityCenter = { lat: 44.4268, lng: 26.1025 }; // Coordonatele centrului orașului București
            createMap(mapElement, cityCenter);
        }, options); // Specifică opțiunile pentru obținerea poziției curente
    } else {
        // Mesaj de eroare în cazul în care geolocația nu este suportată
        mapElement.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function createMap(mapElement, centerLocation) {
    // create map
    const map = new google.maps.Map(mapElement, {
        center: centerLocation,
        zoom: 15 // zoom
    });

    // locations
    const locations = [
        { position: { lat: 44.43206439630374, lng: 26.098167635738772}, title: "Caru' cu bere",  logo: "imagini/carulogo.png", website: "https://www.carucubere.ro/", hasMenu: true, menuItem1: "Cartofi prajiti", menuItem2: "Ceafa de porc la gratar" },
        { position: { lat: 44.452466271001846,lng: 26.082299718777183}, title: "McDonald's Piața Victoriei", logo: "imagini/mcdonalds.jpg", website: "https://www.mcdonalds.ro/", hasMenu: true, menuItem1: "Cartofi prajiti", menuItem2: "McChicken" },
        { position: { lat: 44.45133281701744, lng: 26.087072169320965}, title: "Ted's Coffee Victoriei",  logo: "imagini/tedlogo.jpg", website: "https://tedscoffeecompany.com/", hasMenu: true, menuItem1: "Caffe-au-lait", menuItem2: "Double espresso" },
        { position: { lat: 44.42861309068323, lng: 26.104427984074206}, title: "McDonald's Unirea", logo: "imagini/mcdonalds.jpg", website: "https://www.mcdonalds.ro/" },
        { position: { lat: 44.44458750097154, lng: 26.0982826519624  }, title: "McDonald's Piața Romană", logo: "imagini/mcdonalds.jpg", website: "https://www.mcdonalds.ro/" },
        { position: { lat: 44.46396744460815, lng: 26.108480711339002}, title: "McDonald's Barbu Vacarescu", logo: "imagini/mcdonalds.jpg", website: "https://www.mcdonalds.ro/" },
        { position: { lat: 44.44679282206822, lng: 26.074158286462225}, title: "McDonald's Gara de Nord", logo: "imagini/mcdonalds.jpg", website: "https://www.mcdonalds.ro/" },
        { position: { lat: 44.44566985017156, lng: 26.062725738681337}, title: "McDonald's Orhideea", logo: "imagini/mcdonalds.jpg", website: "https://www.mcdonalds.ro/" },
        // other locations
    ];

    const infowindow = new google.maps.InfoWindow();

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title,
            icon: {
                url: "imagini/placeholder.png", //logo as marker
                scaledSize: new google.maps.Size(50, 50), // logo size
                origin: new google.maps.Point(0, 0), // O(0,0) - origin
                anchor: new google.maps.Point(25, 25) // cout logo on marker's center
            }
        });
        // click
        marker.addListener("click", () => {
            // cout info
            infowindow.setContent(`<div><strong>${location.title}</strong></div><div><img src="${location.logo}" style="max-width: 200px; max-height: 200px;"></div><div><a href="${location.website}" target="_blank">Website</a></div>`);
            // ope info
            infowindow.open(map, marker);
            // Afisam meniul daca este disponibil
            showMenu(location);
        });
    });
}

function showMenu(location) {
    const menuElement = document.getElementById("menu");
    // Verificăm dacă locația are meniu și afișăm meniul în partea dreaptă a ecranului
    if (location.hasMenu) {
        // Generăm HTML-ul pentru meniu
        const menuHTML = `
            <br>
            <h2 style="text-align: center;">${location.title} - Meniu</h2>
            <ul>
                <li>${location.menuItem1}</li>
                <li>${location.menuItem2}</li>
                <!-- Adăugați aici mai multe elemente de meniu dacă este nevoie -->
            </ul>
        `;

        // Afișăm meniul în partea dreaptă a ecranului
        menuElement.innerHTML = menuHTML;
    } else {
        // Dacă locația nu are meniu, afișăm un mesaj corespunzător
        menuElement.innerHTML = "<br><p>Această locație nu are meniu disponibil.</p>";
    }
}
