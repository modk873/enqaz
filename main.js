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
      showCommunityPage();
    
    } else if (pageId === 'map') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        initEmergencyMap();
      }, 300);
    }
  }

  // Highlight active nav button
  const navButtons = [
    'home', 'login', 'signup', 'community'
  ];
  navButtons.forEach(id => {
    const btn = document.getElementById('nav-' + id);
    if (btn) btn.classList.remove('active');
  });
  const activeBtn = document.getElementById('nav-' + pageId);
  if (activeBtn) activeBtn.classList.add('active');
}

// Sample users for demonstration
const sampleUsers = [
  { id: 1, name: 'Ahmed Hassan', avatar: '👨‍⚕️', status: 'online', type: 'volunteer', location: 'Doha' },
  { id: 2, name: 'Sarah Johnson', avatar: '👩‍⚕️', status: 'online', type: 'volunteer', location: 'Al Wakrah' },
  { id: 3, name: 'Omar Khalil', avatar: '👨‍🚒', status: 'online', type: 'emergency', location: 'Al Khor' },
  { id: 4, name: 'Layla Ahmed', avatar: '👩‍🚑', status: 'offline', type: 'volunteer', location: 'Lusail' },
  { id: 5, name: 'David Chen', avatar: '👨‍🔬', status: 'online', type: 'volunteer', location: 'Al Rayyan' },
  { id: 6, name: 'Aisha Mohammed', avatar: '👩‍⚕️', status: 'online', type: 'volunteer', location: 'Al Daayen' },
  { id: 7, name: 'Khalid Al-Rashid', avatar: '👨‍🚑', status: 'online', type: 'emergency', location: 'Umm Salal' },
  { id: 8, name: 'Noora Al-Zahra', avatar: '👩‍🚒', status: 'online', type: 'volunteer', location: 'Al Gharafa' },
  { id: 9, name: 'Abdullah Saleh', avatar: '👨‍⚕️', status: 'offline', type: 'volunteer', location: 'Al Aziziya' },
  { id: 10, name: 'Mariam Al-Otaibi', avatar: '👩‍🔬', status: 'online', type: 'volunteer', location: 'Al Hilal' },
  { id: 11, name: 'Hassan Al-Ghamdi', avatar: '👨‍🚒', status: 'online', type: 'emergency', location: 'Al Sadd' },
  { id: 12, name: 'Zahra Al-Shehri', avatar: '👩‍⚕️', status: 'online', type: 'volunteer', location: 'Al Waab' },
  { id: 13, name: 'Mohammed Al-Qahtani', avatar: '👨‍🚑', status: 'offline', type: 'volunteer', location: 'Al Mamoura' },
  { id: 14, name: 'Reem Al-Harbi', avatar: '👩‍🔬', status: 'online', type: 'volunteer', location: 'Al Kharaitiyat' },
  { id: 15, name: 'Faisal Al-Dossary', avatar: '👨‍⚕️', status: 'online', type: 'emergency', location: 'Al Shamal' },
  { id: 16, name: 'Dana Al-Mutairi', avatar: '👩‍🚒', status: 'online', type: 'volunteer', location: 'Al Wakra' },
  { id: 17, name: 'Sultan Al-Balawi', avatar: '👨‍🔬', status: 'offline', type: 'volunteer', location: 'Al Khor' },
  { id: 18, name: 'Huda Al-Shamrani', avatar: '👩‍⚕️', status: 'online', type: 'volunteer', location: 'Al Gharafa' },
  { id: 19, name: 'Rashid Al-Zahrani', avatar: '👨‍🚑', status: 'online', type: 'emergency', location: 'Al Rayyan' },
  { id: 20, name: 'Lina Al-Amri', avatar: '👩‍🚒', status: 'online', type: 'volunteer', location: 'Al Wakrah' },
  { id: 21, name: 'Tariq Al-Sulaiman', avatar: '👨‍⚕️', status: 'online', type: 'volunteer', location: 'Doha' },
  { id: 22, name: 'Yasmin Al-Rashid', avatar: '👩‍🔬', status: 'offline', type: 'volunteer', location: 'Lusail' },
  { id: 23, name: 'Adel Al-Mansouri', avatar: '👨‍🚒', status: 'online', type: 'emergency', location: 'Al Khor' },
  { id: 24, name: 'Samira Al-Hamdan', avatar: '👩‍⚕️', status: 'online', type: 'volunteer', location: 'Al Rayyan' },
  { id: 25, name: 'Waleed Al-Saadi', avatar: '👨‍🚑', status: 'online', type: 'volunteer', location: 'Al Wakrah' }
];

console.log('sampleUsers defined with', sampleUsers.length, 'users');

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
        showPage('home');
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
        showPage('home');
      }, 800);
    } else {
      document.getElementById('signup-message').textContent = 'Please fill all fields.';
    }
  });
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
      showPage('community');
    };
    userAlerts.appendChild(li);
  });
}

// Community Hub - User Management and Chat System
let onlineUsers = [];
let currentUserStatus = 'offline';
let userChats = {};
let currentChat = null;

// Initialize community when page loads
function initCommunity() {
  updateCurrentUserInfo();
  loadOnlineUsers();
  loadUserChats();
  loadRecentAlerts();
}

// Update current user information
function updateCurrentUserInfo() {
  const profile = getProfile();
  const userName = profile.name || (currentUser ? currentUser.username : 'Guest');
  const userAvatar = profile.photo ? '👤' : '👤';
  
  document.getElementById('current-user-name').textContent = userName;
  document.getElementById('current-user-avatar').textContent = userAvatar;
  document.getElementById('user-status').textContent = currentUserStatus === 'online' ? 'Online' : 'Offline';
  document.getElementById('user-status').className = `user-status ${currentUserStatus}`;
  
  const toggleBtn = document.getElementById('toggle-online-status');
  toggleBtn.textContent = currentUserStatus === 'online' ? 'Go Offline' : 'Go Online';
  toggleBtn.className = currentUserStatus === 'online' ? 'offline' : '';
}

// Toggle online status
function toggleOnlineStatus() {
  currentUserStatus = currentUserStatus === 'online' ? 'offline' : 'online';
  updateCurrentUserInfo();
  
  if (currentUserStatus === 'online') {
    // Add current user to online users if not already there
    const profile = getProfile();
    const currentUserData = {
      id: Date.now(),
      name: profile.name || (currentUser ? currentUser.username : 'Guest'),
      avatar: '👤',
      status: 'online',
      type: 'user',
      location: profile.location || 'Unknown'
    };
    
    if (!onlineUsers.find(u => u.name === currentUserData.name)) {
      onlineUsers.unshift(currentUserData);
    }
  } else {
    // Remove current user from online users
    const profile = getProfile();
    const userName = profile.name || (currentUser ? currentUser.username : 'Guest');
    onlineUsers = onlineUsers.filter(u => u.name !== userName);
  }
  
  renderUsersGrid();
  updateOnlineCount();
}

// Load online users
function loadOnlineUsers() {
  onlineUsers = [...sampleUsers];
  renderUsersGrid();
  updateOnlineCount();
}

// Render users grid
function renderUsersGrid() {
  const usersGrid = document.getElementById('users-grid');
  if (!usersGrid) return;
  
  usersGrid.innerHTML = '';
  
  onlineUsers.forEach(user => {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.innerHTML = `
      <div class="user-card-header">
        <div class="user-avatar">${user.avatar}</div>
        <div class="user-info">
          <h4>${user.name}</h4>
          <div class="status">${user.status === 'online' ? '🟢 Online' : '🔴 Offline'}</div>
        </div>
      </div>
      <div class="user-actions">
        <button class="user-action-btn" onclick="startChat('${user.name}')">💬 Chat</button>
        <button class="user-action-btn secondary" onclick="viewProfile('${user.name}')">👤 Profile</button>
      </div>
    `;
    usersGrid.appendChild(userCard);
  });
}

// Update online count
function updateOnlineCount() {
  const onlineCount = onlineUsers.filter(u => u.status === 'online').length;
  const countElement = document.getElementById('online-count');
  if (countElement) {
    countElement.textContent = onlineCount;
  }
}

// Switch between tabs
function switchTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab content
  const selectedTab = document.getElementById(`${tabName}-tab`);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to selected tab button
  const selectedBtn = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
  if (selectedBtn) {
    selectedBtn.classList.add('active');
  }
}

// Refresh users list
function refreshUsersList() {
  loadOnlineUsers();
}

// Load user chats
function loadUserChats() {
  // Initialize with sample chats
  userChats = {
    'Ahmed Hassan': [
      { sender: 'Ahmed Hassan', message: 'Hello! How can I help you today?', time: '10:30 AM', type: 'received' },
      { sender: 'You', message: 'Hi Ahmed, I need some assistance with first aid.', time: '10:32 AM', type: 'sent' },
      { sender: 'Ahmed Hassan', message: 'Of course! I\'m a trained medical volunteer. What happened?', time: '10:33 AM', type: 'received' }
    ],
    'Sarah Johnson': [
      { sender: 'Sarah Johnson', message: 'Hello there! I\'m available for emergency assistance.', time: '09:15 AM', type: 'received' },
      { sender: 'You', message: 'Thank you Sarah! Good to know you\'re available.', time: '09:20 AM', type: 'sent' }
    ],
    'Omar Khalil': [
      { sender: 'Omar Khalil', message: 'Fire emergency response team ready!', time: '11:45 AM', type: 'received' },
      { sender: 'You', message: 'Great to have you on the team Omar!', time: '11:47 AM', type: 'sent' }
    ],
    'Aisha Mohammed': [
      { sender: 'Aisha Mohammed', message: 'Medical volunteer available in Al Daayen area.', time: '08:20 AM', type: 'received' },
      { sender: 'You', message: 'Welcome Aisha! Your help is much appreciated.', time: '08:25 AM', type: 'sent' },
      { sender: 'Aisha Mohammed', message: 'Always ready to help the community!', time: '08:26 AM', type: 'received' }
    ],
    'Khalid Al-Rashid': [
      { sender: 'Khalid Al-Rashid', message: 'Emergency response team in Umm Salal reporting in.', time: '12:15 PM', type: 'received' }
    ],
    'Noora Al-Zahra': [
      { sender: 'Noora Al-Zahra', message: 'Fire safety specialist available for consultation.', time: '09:30 AM', type: 'received' },
      { sender: 'You', message: 'Thank you Noora! Your expertise is valuable.', time: '09:35 AM', type: 'sent' }
    ],
    'Mariam Al-Otaibi': [
      { sender: 'Mariam Al-Otaibi', message: 'Research volunteer in Al Hilal area.', time: '10:00 AM', type: 'received' },
      { sender: 'You', message: 'Welcome Mariam! What type of research do you do?', time: '10:05 AM', type: 'sent' },
      { sender: 'Mariam Al-Otaibi', message: 'Emergency response optimization and community safety.', time: '10:06 AM', type: 'received' }
    ],
    'Hassan Al-Ghamdi': [
      { sender: 'Hassan Al-Ghamdi', message: 'Fire department volunteer in Al Sadd.', time: '11:00 AM', type: 'received' }
    ],
    'Zahra Al-Shehri': [
      { sender: 'Zahra Al-Shehri', message: 'Medical volunteer in Al Waab. Ready to assist!', time: '08:45 AM', type: 'received' },
      { sender: 'You', message: 'Thank you Zahra! Your dedication is inspiring.', time: '08:50 AM', type: 'sent' }
    ],
    'Reem Al-Harbi': [
      { sender: 'Reem Al-Harbi', message: 'Research specialist in Al Kharaitiyat. Available for technical support.', time: '09:15 AM', type: 'received' }
    ],
    'Faisal Al-Dossary': [
      { sender: 'Faisal Al-Dossary', message: 'Emergency response coordinator in Al Shamal.', time: '10:30 AM', type: 'received' },
      { sender: 'You', message: 'Great to have a coordinator on board!', time: '10:35 AM', type: 'sent' }
    ],
    'Dana Al-Mutairi': [
      { sender: 'Dana Al-Mutairi', message: 'Fire safety volunteer in Al Wakra region.', time: '11:20 AM', type: 'received' }
    ],
    'Huda Al-Shamrani': [
      { sender: 'Huda Al-Shamrani', message: 'Medical volunteer in Al Gharafa. Ready for emergencies!', time: '09:00 AM', type: 'received' },
      { sender: 'You', message: 'Welcome Huda! Your help is much needed.', time: '09:05 AM', type: 'sent' }
    ],
    'Rashid Al-Zahrani': [
      { sender: 'Rashid Al-Zahrani', message: 'Emergency response team in Al Rayyan.', time: '12:00 PM', type: 'received' }
    ],
    'Lina Al-Amri': [
      { sender: 'Lina Al-Amri', message: 'Fire department volunteer in Al Wakrah area.', time: '10:15 AM', type: 'received' }
    ],
    'Tariq Al-Sulaiman': [
      { sender: 'Tariq Al-Sulaiman', message: 'Medical volunteer in Doha. Available 24/7.', time: '08:30 AM', type: 'received' },
      { sender: 'You', message: 'Thank you Tariq! Your availability is crucial.', time: '08:35 AM', type: 'sent' }
    ],
    'Adel Al-Mansouri': [
      { sender: 'Adel Al-Mansouri', message: 'Fire emergency response in Al Khor.', time: '11:30 AM', type: 'received' }
    ],
    'Samira Al-Hamdan': [
      { sender: 'Samira Al-Hamdan', message: 'Medical volunteer in Al Rayyan. Ready to help!', time: '09:45 AM', type: 'received' },
      { sender: 'You', message: 'Welcome Samira! Your dedication is appreciated.', time: '09:50 AM', type: 'sent' }
    ],
    'Waleed Al-Saadi': [
      { sender: 'Waleed Al-Saadi', message: 'Emergency response volunteer in Al Wakrah.', time: '10:45 AM', type: 'received' }
    ]
  };
  
  renderChatsList();
}

// Render chats list
function renderChatsList() {
  const chatsList = document.getElementById('chats-list');
  if (!chatsList) return;
  
  chatsList.innerHTML = '';
  
  Object.keys(userChats).forEach(userName => {
    const chat = userChats[userName];
    const lastMessage = chat[chat.length - 1];
    
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';
    chatItem.onclick = () => openChat(userName);
    chatItem.innerHTML = `
      <div class="chat-item-header">
        <div class="user-avatar">👤</div>
        <div class="user-info">
          <h4>${userName}</h4>
          <div class="status">🟢 Online</div>
        </div>
      </div>
      <div class="chat-preview">${lastMessage.message}</div>
    `;
    chatsList.appendChild(chatItem);
  });
}

// Refresh chats
function refreshChats() {
  loadUserChats();
}

// Load recent alerts
function loadRecentAlerts() {
  const alertsList = document.getElementById('alerts-list');
  if (!alertsList) return;
  
  alertsList.innerHTML = '';
  
  // Show recent alerts from the alerts array
  const recentAlerts = alerts.slice(0, 5); // Show last 5 alerts
  
  recentAlerts.forEach(alert => {
    const alertItem = document.createElement('div');
    alertItem.className = `alert-item ${alert.type === 'emergency' ? 'emergency' : ''}`;
    alertItem.innerHTML = `
      <div class="alert-header">
        <span class="alert-type">${alert.type === 'emergency' ? '🚨 Emergency' : '📋 Normal'}</span>
        <span class="alert-time">${alert.time}</span>
      </div>
      <div>${alert.message}</div>
      <div><strong>From:</strong> ${alert.author}</div>
    `;
    alertsList.appendChild(alertItem);
  });
}

// Start chat with user
function startChat(userName) {
  if (!userChats[userName]) {
    userChats[userName] = [];
  }
  openChat(userName);
}

// Open chat modal
function openChat(userName) {
  currentChat = userName;
  document.getElementById('chat-title').textContent = `Chat with ${userName}`;
  document.getElementById('chat-modal').style.display = 'block';
  renderChatMessages();
}

// Close chat modal
function closeChat() {
  document.getElementById('chat-modal').style.display = 'none';
  currentChat = null;
  document.getElementById('chat-input').value = '';
}

// Render chat messages
function renderChatMessages() {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages || !currentChat) return;
  
  chatMessages.innerHTML = '';
  
  const messages = userChats[currentChat] || [];
  
  messages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${msg.type}`;
    messageDiv.innerHTML = `
      <div>${msg.message}</div>
      <small style="opacity: 0.7; font-size: 0.8em;">${msg.time}</small>
    `;
    chatMessages.appendChild(messageDiv);
  });
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send chat message
function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message || !currentChat) return;
  
  const newMessage = {
    sender: 'You',
    message: message,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'sent'
  };
  
  if (!userChats[currentChat]) {
    userChats[currentChat] = [];
  }
  
  userChats[currentChat].push(newMessage);
  
  // Simulate response after 2 seconds
  setTimeout(() => {
    const response = {
      sender: currentChat,
      message: getRandomResponse(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'received'
    };
    userChats[currentChat].push(response);
    renderChatMessages();
  }, 2000);
  
  input.value = '';
  renderChatMessages();
  renderChatsList(); // Update chat preview
}

// Handle chat input key press
function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

// Get random response for demo
function getRandomResponse() {
  const responses = [
    'I understand. How can I help you further?',
    'That sounds serious. Are you in a safe location?',
    'I\'m here to help. What do you need assistance with?',
    'Thank you for reaching out. I\'ll do my best to help.',
    'Is there anything specific you\'d like me to know?',
    'I\'m a trained volunteer and ready to assist you.',
    'Please provide more details so I can help effectively.',
    'I\'m available 24/7 for emergency situations.',
    'Your safety is my priority. Let me know what you need.',
    'I have experience in emergency response. How can I assist?',
    'I\'m in your area and can respond quickly if needed.',
    'Please stay calm. I\'m here to help you.',
    'I have medical training and can provide first aid guidance.',
    'I\'m part of the emergency response network in your region.',
    'Let me know your exact location and I\'ll coordinate help.',
    'I\'m ready to dispatch emergency services if required.',
    'Your message has been received. I\'m on standby.',
    'I can provide immediate assistance or connect you with specialists.',
    'I\'m monitoring the situation. Please keep me updated.',
    'I have access to emergency resources in your area.'
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// View user profile (placeholder)
function viewProfile(userName) {
  alert(`Viewing profile of ${userName}\n\nThis feature will show detailed user information, skills, and availability.`);
}

// Test community function
function testCommunity() {
  console.log('=== COMMUNITY TEST ===');
  console.log('sampleUsers length:', sampleUsers.length);
  console.log('onlineUsers length:', onlineUsers.length);
  console.log('users-grid element:', document.getElementById('users-grid'));
  console.log('users-tab element:', document.getElementById('users-tab'));
  console.log('users-tab classList:', document.getElementById('users-tab')?.classList);
  
  // Force reload users
  loadOnlineUsers();
  
  alert('Check console for test results');
}

// Test users function
function testUsers() {
  console.log('=== USERS TEST ===');
  console.log('sampleUsers:', sampleUsers);
  console.log('onlineUsers:', onlineUsers);
  console.log('users-grid:', document.getElementById('users-grid'));
  
  // Force reload
  loadOnlineUsers();
  
  alert('Check console for users test');
}

// Close menu function (missing from navigation)
function closeMenu() {
  if (mainNav) {
    mainNav.classList.remove('open');
  }
  if (menuBackdrop) {
    menuBackdrop.style.display = 'none';
  }
}

// Initialize community when page is shown
function showCommunityPage() {
  initCommunity();
}

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
  console.log('Loading interactive map...');
  
  // Show loading message
  const loadingDiv = document.getElementById('map-loading');
  if (loadingDiv) {
    loadingDiv.style.display = 'block';
  }
  
  // Check if map container exists
  const mapContainer = document.getElementById('emergency-map');
  if (!mapContainer) {
    console.error('Map container not found!');
    return;
  }
  
  // Wait for Leaflet to be available
  let attempts = 0;
  const maxAttempts = 10;
  
  function tryInitMap() {
    attempts++;
    console.log(`Attempt ${attempts} to initialize map...`);
    
    if (typeof L === 'undefined') {
      if (attempts < maxAttempts) {
        console.log('Leaflet not ready, retrying in 500ms...');
        setTimeout(tryInitMap, 500);
        return;
      } else {
        console.error('Leaflet failed to load after multiple attempts');
        if (loadingDiv) loadingDiv.style.display = 'none';
        alert('Interactive map library failed to load. The photo map is still available.');
        return;
      }
    }
    
    // Continue with map initialization
    try {
      // Remove existing map if any
      if (emergencyMap) {
        emergencyMap.remove();
        emergencyMap = null;
      }
      
      // Clear the container and add interactive map
      mapContainer.innerHTML = '';
      
      // Create map centered on a default location (Doha coordinates)
      emergencyMap = L.map('emergency-map').setView([25.2854, 51.5310], 13);
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(emergencyMap);
      
      console.log('Interactive map created successfully');
      
      // Hide loading message
      if (loadingDiv) {
        loadingDiv.style.display = 'none';
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
      // Restore photo if interactive map fails
      restorePhotoMap();
    }
  }
  
  // Start the initialization process
  tryInitMap();
}

function addSampleFacilities() {
  if (!emergencyMap) return;
  
  // Add sample facilities around Doha
  const facilities = [
    { name: 'Police Station', lat: 25.2854 + 0.01, lng: 51.5310 + 0.01, type: 'police' },
    { name: 'Hospital', lat: 25.2854 - 0.01, lng: 51.5310 - 0.01, type: 'hospital' },
    { name: 'Fire Station', lat: 25.2854 + 0.005, lng: 51.5310 - 0.005, type: 'fire' }
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
  
  // Show detailed status
  let status = 'Map Test Results:\n';
  status += 'Leaflet loaded: ' + (typeof L !== 'undefined' ? 'YES' : 'NO') + '\n';
  status += 'Map container: ' + (document.getElementById('emergency-map') ? 'FOUND' : 'NOT FOUND') + '\n';
  status += 'Loading div: ' + (document.getElementById('map-loading') ? 'FOUND' : 'NOT FOUND') + '\n';
  status += 'Placeholder div: ' + (document.getElementById('map-placeholder') ? 'FOUND' : 'NOT FOUND') + '\n';
  
  // Try to create a simple map
  try {
    if (typeof L === 'undefined') {
      status += 'ERROR: Leaflet library not loaded!';
      alert(status);
      return;
    }
    
    const testMap = L.map('emergency-map').setView([25.2854, 51.5310], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(testMap);
    
    status += 'SUCCESS: Map created successfully!';
    alert(status);
    testMap.remove();
  } catch (error) {
    status += 'ERROR: ' + error.message;
    alert(status);
    console.error('Map test error:', error);
  }
}

function restorePhotoMap() {
  console.log('Restoring photo map...');
  
  // Hide loading message
  const loadingDiv = document.getElementById('map-loading');
  if (loadingDiv) {
    loadingDiv.style.display = 'none';
  }
  
  // Remove any existing Leaflet map
  if (emergencyMap) {
    emergencyMap.remove();
    emergencyMap = null;
  }
  
  // Restore the photo
  const mapContainer = document.getElementById('emergency-map');
  if (mapContainer) {
    mapContainer.innerHTML = `
      <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&h=400&fit=crop&crop=center" 
           alt="Emergency Map" 
           style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;" />
    `;
  }
}

function showFallbackMap() {
  console.log('Showing static emergency facilities...');
  
  // Hide loading message
  const loadingDiv = document.getElementById('map-loading');
  if (loadingDiv) loadingDiv.style.display = 'none';
  
  // Remove any existing Leaflet map
  if (emergencyMap) {
    emergencyMap.remove();
    emergencyMap = null;
  }
  
  // Show static emergency facilities
  const mapContainer = document.getElementById('emergency-map');
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div style="background: #e8f4f8; padding: 20px; text-align: center; border-radius: 8px; height: 100%; display: flex; flex-direction: column; justify-content: center;">
        <h3>Emergency Facilities</h3>
        <p>📍 Your Location: Riyadh, Saudi Arabia</p>
        <div style="margin: 20px 0;">
          <div style="background: #fff; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #007bff;">
            <strong>🚔 Police Station</strong><br>
            <small>2.3 km away</small><br>
            <button onclick="alert('Calling Police Station...')" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin-top: 5px;">Call</button>
          </div>
          <div style="background: #fff; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #28a745;">
            <strong>🏥 Hospital</strong><br>
            <small>1.8 km away</small><br>
            <button onclick="alert('Calling Hospital...')" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin-top: 5px;">Call</button>
          </div>
          <div style="background: #fff; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #ffc107;">
            <strong>🚒 Fire Station</strong><br>
            <small>3.1 km away</small><br>
            <button onclick="alert('Calling Fire Station...')" style="background: #ffc107; color: #333; border: none; padding: 5px 10px; border-radius: 4px; margin-top: 5px;">Call</button>
          </div>
        </div>
      </div>
    `;
  }
}

function showCaseDetail(caseId) {
  console.log('Showing case detail for:', caseId);
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  
  // Show the specific case detail page
  const caseDetailPage = document.getElementById('case-detail-' + caseId);
  if (caseDetailPage) {
    caseDetailPage.style.display = 'block';
  } else {
    console.error('Case detail page not found for:', caseId);
    // Fallback to normal cases page
    showPage('normal-cases');
  }
} 