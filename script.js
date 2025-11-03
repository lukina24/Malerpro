// ==================== LOGIN ====================
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if(users[user] && users[user] === pass) {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("register-box").style.display = "none";
    document.getElementById("content-box").style.display = "block";
    document.getElementById("welcome-text").textContent = `Hallo ${user} 👋`;
    showTopic('dashboard');
  } else {
    error.textContent = "❌ Falscher Benutzername oder Passwort!";
  }
}

// ==================== REGISTRIERUNG ====================
function register() {
  const user = document.getElementById("reg-username").value.trim();
  const pass = document.getElementById("reg-password").value.trim();
  const error = document.getElementById("reg-error");

  if(!user || !pass){
    error.textContent = "❌ Bitte Benutzername und Passwort eingeben!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if(users[user]){
    error.textContent = "❌ Benutzername existiert bereits!";
    return;
  }

  users[user] = pass;
  localStorage.setItem("users", JSON.stringify(users));
  error.style.color = "green";
  error.textContent = "✅ Registrierung erfolgreich! Du kannst dich nun einloggen.";
}

// ==================== TOGGLE LOGIN / REG ====================
function toggleRegister() {
  const loginBox = document.getElementById("login-box");
  const regBox = document.getElementById("register-box");
  loginBox.style.display = loginBox.style.display === "none" ? "block" : "none";
  regBox.style.display = regBox.style.display === "none" ? "block" : "none";
  document.getElementById("error").textContent = "";
  document.getElementById("reg-error").textContent = "";
}

// ==================== LOGOUT ====================
function logout() {
  document.getElementById("content-box").style.display = "none";
  document.getElementById("login-box").style.display = "block";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("error").textContent = "";
}

// ==================== DARK/LIGHT MODE ====================
function toggleMode() {
  document.body.classList.toggle('dark');
  const modeBtn = document.getElementById("mode-btn");
  modeBtn.textContent = document.body.classList.contains('dark') ? "☀️" : "🌙";
}

// ==================== TOPIC NAV ====================
function showTopic(topic) {
  const section = document.getElementById("topic-content");
  let html = "";

  switch (topic) {
    case "dashboard":
      html = `
        <h3>Willkommen bei Malerwissen 🎨</h3>
        <p>Hier findest du Anleitungen, Tipps und Werkzeuge rund ums Streichen.</p>
        <p>Wähle oben ein Thema oder notiere eigene Ideen im Bereich 📝 <b>Notizen</b>.</p>
      `;
      break;

    case "fassade":
      html = `
        <h3>Fassade streichen 🏡</h3>
        <ol>
          <li>Fassade gründlich reinigen.</li>
          <li>Risse reparieren und lose Farbe entfernen.</li>
          <li>Grundierung auftragen.</li>
          <li>Fassadenfarbe in zwei Schichten auftragen.</li>
        </ol>
      `;
      break;

    case "wand":
      html = `
        <h3>Innenwand streichen 🖌️</h3>
        <ul>
          <li>Abkleben & Möbel abdecken.</li>
          <li>Ecken mit Pinsel, Flächen mit Rolle streichen.</li>
          <li>Erste Schicht trocknen lassen, dann zweite auftragen.</li>
        </ul>
      `;
      break;

    case "werkzeug":
      html = `
        <h3>Wichtige Werkzeuge 🧰</h3>
        <ul>
          <li>Pinsel & Farbrollen</li>
          <li>Abdeckfolie & Klebeband</li>
          <li>Spachtel, Leiter, Eimer</li>
          <li>Schutzbrille & Handschuhe</li>
        </ul>
      `;
      break;

    case "notizen":
      html = `
        <h3>Meine Notizen 📝</h3>
        <div class="note">
          <input id="note-input" type="text" placeholder="Schreibe eine Notiz...">
          <button onclick="addNote()">➕</button>
        </div>
        <ul id="note-list" class="note-list"></ul>
      `;
      break;
  }

  section.innerHTML = html;
  if (topic === "notizen") renderNotes();
}

// ==================== NOTIZEN ====================
function addNote() {
  const input = document.getElementById("note-input");
  if (input.value.trim() === "") return;
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push(input.value.trim());
  localStorage.setItem("notes", JSON.stringify(notes));
  input.value = "";
  renderNotes();
}

function renderNotes() {
  const list = document.getElementById("note-list");
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  list.innerHTML = notes.map(n => `<li>${n}</li>`).join("");
}
