function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';

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

// Toggle case details
window.toggleCase = function(caseId) {
  const details = document.getElementById('case-' + caseId);
  if (details) {
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
  }
};

// Send normal alert for a specific case
window.sendNormalCaseAlert = function(caseName) {
  addAlert('normal');
  alerts[0].message = `Normal Help Request: ${caseName}`;
  renderAlerts();
  renderUserAlerts();
  alert(`Normal alert for "${caseName}" sent!`);
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
let map, userMarker;
const volunteerList = document.getElementById('volunteer-list');
const volunteerData = [
  { name: 'Aisha', lat: 24.7136, lng: 46.6753, phone: '+966500000001' },
  { name: 'Omar', lat: 24.7150, lng: 46.6800, phone: '+966500000002' },
  { name: 'Sara', lat: 24.7100, lng: 46.6700, phone: '+966500000003' },
];

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
      L.marker([v.lat, v.lng], {icon: L.icon({iconUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png', iconSize: [28,28]})})
        .addTo(map)
        .bindPopup(`<strong>${v.name}</strong><br>Phone: <a href='tel:${v.phone}'>${v.phone}</a>`);
    });
    // Volunteer list
    if (volunteerList) {
      volunteerList.innerHTML = '';
      volunteerData.forEach(v => {
        const li = document.createElement('li');
        li.innerHTML = `<span><strong>${v.name}</strong> (Phone: <a href='tel:${v.phone}'>${v.phone}</a>)</span> <button class='volunteer-contact-btn' onclick="window.location='tel:${v.phone}'">Call</button>`;
        volunteerList.appendChild(li);
      });
    }
  }, 200);
}

// Show map when Community page is shown
const oldShowPage = showPage;
showPage = function(pageId) {
  oldShowPage(pageId);
  if (pageId === 'community') showCommunityMap();
}; 