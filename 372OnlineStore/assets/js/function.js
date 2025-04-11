function initMap() {
    console.log("Initializing Google Maps...");
  
    const storeLocation = { lat: 40.7128, lng: -74.0060 };
  
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: storeLocation,
    });
  
    const marker = new google.maps.Marker({
      position: storeLocation,
      map: map,
      title: "Our Store Location",
      animation: google.maps.Animation.DROP,
    });
  
    const infoWindow = new google.maps.InfoWindow({
      content: "<h4>Douillet Lounge Wear</h4><p>Visit our store in NYC!</p>",
    });
  
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  
    console.log("Google Map Loaded Successfully.");
  }
  
  window.initMap = initMap; // Make it globally accessible
  