// ✅ CORRECT
mapboxgl.accessToken = mapToken; // This part is good

const map = new mapboxgl.Map({
    container: 'map', 
    center: listing.geometry.coordinates, // <-- Use the variable here
    style: "mapbox://styles/mapbox/streets-v12",
    zoom: 9 
});

// 1. Create and configure the popup first
const popup = new mapboxgl.Popup({ offset: 25 })
    // ✅ Use listing.location instead
    .setHTML(`<h3>${listing.location}</h3><p>Exact location provided after booking</p>`);

// 2. Create the marker
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);