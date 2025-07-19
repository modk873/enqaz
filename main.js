function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  
  // Show selected page
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.style.display = 'block';
    
    // Initialize maps when showing specific pages
    if (pageId === 'community') {
      initCommunityMap();
    } else if (pageId === 'dashboard') {
      initDashboardMap();
    } else if (pageId === 'map') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        initEmergencyMap();
      }, 300);
    }
  }

  // Highlight active nav button
  const navButtons = [
    'home', 'login', 'signup', 'dashboard', 'community'
  ];
  navButtons.forEach(id => {
    const btn = document.getElementById('nav-' + id);
    if (btn) btn.classList.remove('active');
  });
  const activeBtn = document.getElementById('nav-' + pageId);
  if (activeBtn) activeBtn.classList.add('active');
}

// Show home page by default
showPage('home');

// Mock user state
let currentUser = null;

// Login form logic
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (username && password) {
      currentUser = { username };
      document.getElementById('login-message').textContent = 'Login successful!';
      setTimeout(() => {
        document.getElementById('login-message').textContent = '';
        showPage('dashboard');
        updateDashboardWelcome();
      }, 800);
    } else {
      document.getElementById('login-message').textContent = 'Please enter username and password.';
    }
  });
}

// Signup form logic
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    if (username && email && password) {
      currentUser = { username };
      document.getElementById('signup-message').textContent = 'Signup successful!';
      setTimeout(() => {
        document.getElementById('signup-message').textContent = '';
        showPage('dashboard');
        updateDashboardWelcome();
      }, 800);
    } else {
      document.getElementById('signup-message').textContent = 'Please fill all fields.';
    }
  });
}

function updateDashboardWelcome() {
  const welcome = document.getElementById('dashboard-welcome');
  if (currentUser && welcome) {
    welcome.textContent = `Welcome, ${currentUser.username}!`;
  } else if (welcome) {
    welcome.textContent = '';
  }
}

// Profile/Registration logic
const profileForm = document.getElementById('profile-form');
const profilePhoto = document.getElementById('profile-photo');
const photoPreview = document.getElementById('profile-photo-preview');
const addContactBtn = document.getElementById('add-contact-btn');
const contactsList = document.getElementById('contacts-list');
const getLocationBtn = document.getElementById('get-location-btn');
const profileLocation = document.getElementById('profile-location');
const profileMessage = document.getElementById('profile-message');

// Load profile from localStorage
function loadProfile() {
  const data = JSON.parse(localStorage.getItem('sosProfile') || '{}');
  if (data.name) document.getElementById('profile-name').value = data.name;
  if (data.photo) {
    photoPreview.src = data.photo;
    photoPreview.style.display = 'block';
  }
  if (data.contacts) {
    contactsList.innerHTML = '';
    data.contacts.forEach(c => {
      const row = document.createElement('div');
      row.className = 'contact-row';
      row.innerHTML = `<input type="text" class="contact-name" placeholder="Contact Name" value="${c.name}" /> <input type="tel" class="contact-phone" placeholder="Phone Number" value="${c.phone}" />`;
      contactsList.appendChild(row);
    });
  }
  if (data.location) profileLocation.value = data.location;
}

// Photo preview
if (profilePhoto) {
  profilePhoto.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        photoPreview.src = evt.target.result;
        photoPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  };
}

// Add contact logic
if (addContactBtn) {
  addContactBtn.onclick = function() {
    const rows = contactsList.querySelectorAll('.contact-row');
    if (rows.length >= 3) return;
    const row = document.createElement('div');
    row.className = 'contact-row';
    row.innerHTML = `<input type="text" class="contact-name" placeholder="Contact Name" /> <input type="tel" class="contact-phone" placeholder="Phone Number" />`;
    contactsList.appendChild(row);
  };
}

// Get current location
if (getLocationBtn) {
  getLocationBtn.onclick = function() {
    if (!navigator.geolocation) {
      profileLocation.value = 'Geolocation not supported';
      return;
    }
    getLocationBtn.disabled = true;
    getLocationBtn.textContent = 'Locating...';
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        profileLocation.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        getLocationBtn.disabled = false;
        getLocationBtn.textContent = 'Get Current Location';
      },
      err => {
        profileLocation.value = 'Location unavailable';
        getLocationBtn.disabled = false;
        getLocationBtn.textContent = 'Get Current Location';
      }
    );
  };
}

// Save profile
if (profileForm) {
  profileForm.onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('profile-name').value;
    let photo = photoPreview.src || '';
    if (photoPreview.style.display === 'none') photo = '';
    const contacts = [];
    contactsList.querySelectorAll('.contact-row').forEach(row => {
      const cname = row.querySelector('.contact-name').value;
      const cphone = row.querySelector('.contact-phone').value;
      if (cname && cphone) contacts.push({ name: cname, phone: cphone });
    });
    const location = profileLocation.value;
    const data = { name, photo, contacts, location };
    localStorage.setItem('sosProfile', JSON.stringify(data));
    profileMessage.textContent = 'Profile saved!';
    setTimeout(() => { profileMessage.textContent = ''; }, 2000);
  };
}

// Use profile info in alerts
function getProfile() {
  return JSON.parse(localStorage.getItem('sosProfile') || '{}');
}

// SOS alert logic
const emergencyBtn = document.getElementById('emergency-sos-btn');
const normalBtn = document.getElementById('normal-sos-btn');
const sosMessage = document.getElementById('sos-message');
const userAlerts = document.getElementById('user-alerts');
let alerts = [];

// Update addAlert to include profile info
function addAlert(type) {
  const profile = getProfile();
  const author = profile.name || (currentUser ? currentUser.username : 'Anonymous');
  const time = new Date().toLocaleString();
  let details = '';
  if (type === 'emergency') {
    details = `<br><strong>Location:</strong> ${profile.location || 'N/A'}<br>`;
    if (profile.contacts && profile.contacts.length) {
      details += `<strong>Contacts:</strong> ${profile.contacts.map(c => `${c.name} (${c.phone})`).join(', ')}`;
    }
    if (profile.photo) {
      details += `<br><img src="${profile.photo}" alt="User Photo" style="max-width:60px;border-radius:6px;vertical-align:middle;" />`;
    }
  }
  const alert = {
    type,
    author,
    time,
    message: type === 'emergency' ? '🚨 Emergency SOS Alert!' : 'Normal Help Request',
    details
  };
  alerts.unshift(alert);
  renderAlerts();
  renderPosts();
  if (userAlerts) renderUserAlerts();
}

if (emergencyBtn) {
  emergencyBtn.onclick = function() {
    sosMessage.textContent = 'Emergency SOS sent!';
    addAlert('emergency');
    setTimeout(() => { sosMessage.textContent = ''; }, 2000);
  };
}
if (normalBtn) {
  normalBtn.onclick = function() {
    showPage('normal-cases');
  };
}

// Accordion logic: أغلق الباقي ودوّر السهم
window.toggleCase = function(caseId) {
  document.querySelectorAll('.case-details').forEach(d => d.style.display = 'none');
  document.querySelectorAll('.accordion-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
  const details = document.getElementById('case-' + caseId);
  const header = details?.previousElementSibling || document.querySelector(`[onclick*="${caseId}"] .accordion-arrow`);
  if (details && details.style.display === 'none') {
    details.style.display = 'block';
    if (header && header.querySelector('.accordion-arrow')) header.querySelector('.accordion-arrow').style.transform = 'rotate(180deg)';
  } else if (details) {
    details.style.display = 'none';
    if (header && header.querySelector('.accordion-arrow')) header.querySelector('.accordion-arrow').style.transform = 'rotate(0deg)';
  }
};

// رسالة تأكيد بعد إرسال طلب المساعدة
window.sendNormalCaseAlert = function(caseName) {
  addAlert('normal');
  alerts[0].message = `Help Request: ${caseName}`;
  renderAlerts();
  renderUserAlerts();
  document.getElementById('normal-confirm-message').textContent = `Help request for: ${caseName} has been sent.`;
  document.getElementById('normal-confirm-message').style.display = 'block';
  setTimeout(() => {
    document.getElementById('normal-confirm-message').style.display = 'none';
  }, 2500);
};

function renderAlerts() {
  // Community page
  if (!postList) return;
  postList.innerHTML = '';
  if (alerts.length === 0) {
    postList.innerHTML = '<li>No alerts yet. Be the first to send an SOS!</li>';
    return;
  }
  alerts.forEach(alert => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${alert.author}</strong> <span style="color:${alert.type==='emergency'?'#dc3545':'#ffc107'}">[${alert.type==='emergency'?'EMERGENCY':'Normal'}]</span> <br>${alert.message}<br><small>${alert.time}</small>${alert.details || ''}`;
    postList.appendChild(li);
  });
}

function renderUserAlerts() {
  if (!userAlerts) return;
  userAlerts.innerHTML = '';
  const author = currentUser ? currentUser.username : 'Anonymous';
  const userOwnAlerts = alerts.filter(a => a.author === author);
  if (userOwnAlerts.length === 0) {
    userAlerts.innerHTML = '<li>No alerts sent yet.</li>';
    return;
  }
  userOwnAlerts.forEach(alert => {
    const li = document.createElement('li');
    li.innerHTML = `<span style="color:${alert.type==='emergency'?'#dc3545':'#ffc107'}">[${alert.type==='emergency'?'EMERGENCY':'Normal'}]</span> ${alert.message} <br><small>${alert.time}</small>`;
    userAlerts.appendChild(li);
  });
}

// Remove old community post logic, use alerts for posts
function renderPosts() {
  renderAlerts();
}
renderPosts();

// Load profile on page load
loadProfile();

// Community map and volunteers
let map, userMarker, volunteerMarkers = [];
const volunteerList = document.getElementById('volunteer-list');
const volunteerData = [
  { name: 'Aisha', lat: 24.7136, lng: 46.6753, phone: '+966500000001', avatar: '', online: true },
  { name: 'Omar', lat: 24.7150, lng: 46.6800, phone: '+966500000002', avatar: '', online: true },
  { name: 'Sara', lat: 24.7100, lng: 46.6700, phone: '+966500000003', avatar: '', online: false },
];

function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2-lat1)*Math.PI/180;
  const dLng = (lng2-lng1)*Math.PI/180;
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)*Math.sin(dLng/2);
  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R*c).toFixed(2);
}

function showCommunityMap() {
  setTimeout(() => {
    if (!map) {
      map = L.map('community-map').setView([24.7136, 46.6753], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
    }
    // Remove old markers
    if (userMarker) { map.removeLayer(userMarker); }
    volunteerMarkers.forEach(m => map.removeLayer(m));
    volunteerMarkers = [];
    // Try to get user location
    const profile = getProfile();
    let userLatLng = [24.7136, 46.6753];
    if (profile.location && profile.location.includes(',')) {
      const [lat, lng] = profile.location.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lng)) userLatLng = [lat, lng];
    }
    userMarker = L.marker(userLatLng, {icon: L.icon({iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', iconSize: [32,32]})}).addTo(map).bindPopup('You are here');
    map.setView(userLatLng, 14);
    // Add volunteer markers
    volunteerData.forEach(v => {
      const marker = L.marker([v.lat, v.lng], {icon: L.icon({iconUrl: v.avatar || 'https://cdn-icons-png.flaticon.com/512/190/190411.png', iconSize: [28,28]})})
        .addTo(map)
        .bindPopup(`<strong>${v.name}</strong><br>Phone: <a href='tel:${v.phone}'>${v.phone}</a>`);
      volunteerMarkers.push(marker);
    });
    // Volunteer list
    if (volunteerList) {
      volunteerList.innerHTML = '';
      volunteerData.forEach(v => {
        let distance = '';
        if (userLatLng) distance = ` (${getDistanceKm(userLatLng[0], userLatLng[1], v.lat, v.lng)} km)`;
        const initials = v.name.split(' ').map(x=>x[0]).join('').toUpperCase();
        const avatar = `<span class="volunteer-avatar" style="background:${v.online?'#007bff':'#aaa'};">${initials}</span>`;
        const li = document.createElement('li');
        li.innerHTML = `${avatar}<span><strong>${v.name}</strong>${distance}<br>Phone: <a href='tel:${v.phone}'>${v.phone}</a></span> <span><button class='volunteer-contact-btn' onclick="window.location='tel:${v.phone}'">Call</button> <button class='volunteer-message-btn' onclick="alert('Messaging not implemented yet')">Message</button></span>`;
        volunteerList.appendChild(li);
      });
    }
  }, 200);
}

const refreshBtn = document.getElementById('refresh-community-map');
if (refreshBtn) refreshBtn.onclick = showCommunityMap;

// Dashboard map and alert history
let dashboardMap, dashboardUserMarker, dashboardAlertMarkers = [];
function showDashboardMap() {
  setTimeout(() => {
    if (!dashboardMap) {
      dashboardMap = L.map('dashboard-map').setView([24.7136, 46.6753], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(dashboardMap);
    }
    // Remove old markers
    if (dashboardUserMarker) { dashboardMap.removeLayer(dashboardUserMarker); }
    dashboardAlertMarkers.forEach(m => dashboardMap.removeLayer(m));
    dashboardAlertMarkers = [];
    // User location
    const profile = getProfile();
    let userLatLng = [24.7136, 46.6753];
    if (profile.location && profile.location.includes(',')) {
      const [lat, lng] = profile.location.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lng)) userLatLng = [lat, lng];
    }
    dashboardUserMarker = L.marker(userLatLng, {icon: L.icon({iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', iconSize: [32,32]})}).addTo(dashboardMap).bindPopup('You are here');
    dashboardMap.setView(userLatLng, 13);
    // Alert history markers
    const author = profile.name || (currentUser ? currentUser.username : 'Anonymous');
    const userOwnAlerts = alerts.filter(a => a.author === author);
    userOwnAlerts.forEach((alert, idx) => {
      if (alert.details && alert.details.includes('Location:')) {
        const match = alert.details.match(/Location:\s*([\d.\-]+),\s*([\d.\-]+)/);
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          const marker = L.marker([lat, lng], {icon: L.icon({iconUrl: alert.type==='emergency'?'https://cdn-icons-png.flaticon.com/512/565/565547.png':'https://cdn-icons-png.flaticon.com/512/190/190411.png', iconSize: [28,28]})})
            .addTo(dashboardMap)
            .bindPopup(`<strong>${alert.type==='emergency'?'🚨 Emergency':'Normal'}</strong><br>${alert.message}<br><small>${alert.time}</small>`);
          dashboardAlertMarkers.push(marker);
        }
      }
    });
  }, 200);
}

// Make alert list clickable to focus on map
function renderUserAlerts() {
  if (!userAlerts) return;
  userAlerts.innerHTML = '';
  const profile = getProfile();
  const author = profile.name || (currentUser ? currentUser.username : 'Anonymous');
  const userOwnAlerts = alerts.filter(a => a.author === author);
  if (userOwnAlerts.length === 0) {
    userAlerts.innerHTML = '<li>No alerts sent yet.</li>';
    return;
  }
  userOwnAlerts.forEach((alert, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span style="color:${alert.type==='emergency'?'#dc3545':'#ffc107'};cursor:pointer;">[${alert.type==='emergency'?'EMERGENCY':'Normal'}]</span> ${alert.message} <br><small>${alert.time}</small>`;
    li.onclick = () => {
      showPage('dashboard');
      showDashboardMap();
      // Focus on marker if possible
      if (dashboardAlertMarkers[idx]) {
        dashboardAlertMarkers[idx].openPopup();
        dashboardMap.setView(dashboardAlertMarkers[idx].getLatLng(), 15);
      }
    };
    userAlerts.appendChild(li);
  });
}

// Show map when Community or Dashboard page is shown
// Note: This is now handled in the main showPage function

// Side nav menu logic
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const menuClose = document.getElementById('menu-close');
const menuBackdrop = document.getElementById('menu-backdrop');
function isMobile() {
  return window.innerWidth <= 700;
}
if (mainNav) {
  mainNav.style.display = 'flex';
  mainNav.classList.remove('side-nav', 'open');
}
if (menuToggle) menuToggle.style.display = 'none';
if (menuBackdrop) menuBackdrop.style.display = 'none';
if (menuClose) menuClose.style.display = 'none';

// Initialize Emergency Map
let emergencyMap = null;

function initEmergencyMap() {
  console.log('Initializing emergency map...');
  
  // Show loading message
  const loadingDiv = document.getElementById('map-loading');
  if (loadingDiv) {
    loadingDiv.style.display = 'block';
  }
  
  // Hide placeholder text
  const placeholderDiv = document.getElementById('map-placeholder');
  if (placeholderDiv) {
    placeholderDiv.style.display = 'none';
  }
  
  // Check if map container exists
  const mapContainer = document.getElementById('emergency-map');
  if (!mapContainer) {
    console.error('Map container not found!');
    return;
  }
  
  // Remove existing map if any
  if (emergencyMap) {
    emergencyMap.remove();
    emergencyMap = null;
  }
  
  try {
    // Check if Leaflet is available
    if (typeof L === 'undefined') {
      throw new Error('Leaflet library not loaded');
    }
    
    // Create map centered on a default location (Riyadh coordinates)
    emergencyMap = L.map('emergency-map').setView([24.7136, 46.6753], 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(emergencyMap);
    
    console.log('Map created successfully');
    
    // Hide loading message
    if (loadingDiv) {
      loadingDiv.style.display = 'none';
    }
    
    // Ensure map is visible
    if (mapContainer) {
      mapContainer.style.background = 'transparent';
      mapContainer.style.border = 'none';
    }
    
    // Add user location marker (if available)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        console.log('User location:', userLat, userLng);
        
        // Add user marker
        const userMarker = L.marker([userLat, userLng])
          .addTo(emergencyMap)
          .bindPopup('Your Location')
          .openPopup();
        
        // Center map on user location
        emergencyMap.setView([userLat, userLng], 15);
        
        // Add nearby emergency facilities (example locations)
        const facilities = [
          { name: 'Police Station', lat: userLat + 0.01, lng: userLng + 0.01, type: 'police' },
          { name: 'Hospital', lat: userLat - 0.01, lng: userLng - 0.01, type: 'hospital' },
          { name: 'Fire Station', lat: userLat + 0.005, lng: userLng - 0.005, type: 'fire' }
        ];
        
        facilities.forEach(facility => {
          const icon = L.divIcon({
            className: 'facility-marker',
            html: getFacilityIcon(facility.type),
            iconSize: [30, 30]
          });
          
          L.marker([facility.lat, facility.lng], { icon: icon })
            .addTo(emergencyMap)
            .bindPopup(`
              <strong>${facility.name}</strong><br>
              <button onclick="callFacility('${facility.name}')" class="map-btn">Call</button>
              <button onclick="getDirections(${facility.lat}, ${facility.lng})" class="map-btn">Directions</button>
            `);
        });
      }, function(error) {
        console.log('Error getting location:', error);
        // If location not available, show default map with sample facilities
        addSampleFacilities();
      });
    } else {
      console.log('Geolocation not supported, showing default map');
      addSampleFacilities();
    }
  } catch (error) {
    console.error('Error creating map:', error);
    // Hide loading message on error
    if (loadingDiv) {
      loadingDiv.style.display = 'none';
    }
    // Show placeholder text again
    if (placeholderDiv) {
      placeholderDiv.style.display = 'block';
    }
  }
}

function addSampleFacilities() {
  if (!emergencyMap) return;
  
  // Add sample facilities around Riyadh
  const facilities = [
    { name: 'Police Station', lat: 24.7136 + 0.01, lng: 46.6753 + 0.01, type: 'police' },
    { name: 'Hospital', lat: 24.7136 - 0.01, lng: 46.6753 - 0.01, type: 'hospital' },
    { name: 'Fire Station', lat: 24.7136 + 0.005, lng: 46.6753 - 0.005, type: 'fire' }
  ];
  
  facilities.forEach(facility => {
    const icon = L.divIcon({
      className: 'facility-marker',
      html: getFacilityIcon(facility.type),
      iconSize: [30, 30]
    });
    
    L.marker([facility.lat, facility.lng], { icon: icon })
      .addTo(emergencyMap)
      .bindPopup(`
        <strong>${facility.name}</strong><br>
        <button onclick="callFacility('${facility.name}')" class="map-btn">Call</button>
        <button onclick="getDirections(${facility.lat}, ${facility.lng})" class="map-btn">Directions</button>
      `);
  });
}

function getFacilityIcon(type) {
  const icons = {
    police: '🚔',
    hospital: '🏥',
    fire: '🚒'
  };
  return icons[type] || '📍';
}

function callFacility(facilityName) {
  alert(`Calling ${facilityName}...`);
  // You can integrate with phone dialer here
}

function getDirections(lat, lng) {
  // Open directions in Google Maps
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}

function testMap() {
  console.log('Testing map functionality...');
  console.log('Leaflet available:', typeof L !== 'undefined');
  console.log('Map container:', document.getElementById('emergency-map'));
  console.log('Loading div:', document.getElementById('map-loading'));
  console.log('Placeholder div:', document.getElementById('map-placeholder'));
  
  // Try to create a simple map
  try {
    const testMap = L.map('emergency-map').setView([24.7136, 46.6753], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(testMap);
    
    alert('Map test successful! Leaflet is working correctly.');
    testMap.remove();
  } catch (error) {
    alert('Map test failed: ' + error.message);
    console.error('Map test error:', error);
  }
} 