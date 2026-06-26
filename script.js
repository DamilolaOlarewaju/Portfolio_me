/* ============================================================
   Damilola Olarewaju — Portfolio & Academic Management
   Shared JavaScript
   ============================================================ */

// ─── Mobile Navigation ────────────────────────────────────
(function initNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  const overlay = document.getElementById('navOverlay');

  if (!hamburger || !nav) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
})();


// ─── Academic Planner ─────────────────────────────────────
(function initPlanner() {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const counterEl = document.getElementById('taskCounter');

  if (!taskInput || !addBtn || !taskList) return;

  var tasks = [];

  function renderTasks() {
    taskList.innerHTML = '';

    if (counterEl) {
      var total = tasks.length;
      var done = tasks.filter(function(t) { return t.completed; }).length;
      var pending = total - done;
      counterEl.innerHTML =
        '<span><strong>' + total + '</strong> total</span>' +
        '<span><strong>' + pending + '</strong> pending</span>' +
        '<span><strong>' + done + '</strong> completed</span>';
    }

    if (tasks.length === 0) {
      taskList.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-state-icon">📋</div>' +
          '<p>No tasks yet — add one to get started.</p>' +
        '</div>';
      return;
    }

    tasks.forEach(function(task, index) {
      var div = document.createElement('div');
      div.className = 'task-item' + (task.completed ? ' completed' : '');

      var checkBtn = document.createElement('button');
      checkBtn.className = 'task-checkbox' + (task.completed ? ' checked' : '');
      checkBtn.setAttribute('aria-label', task.completed ? 'Mark task as incomplete' : 'Mark task as complete');
      checkBtn.addEventListener('click', function() { toggleTask(index); });

      var textSpan = document.createElement('span');
      textSpan.className = 'task-text';
      textSpan.textContent = task.text;

      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'task-delete';
      deleteBtn.setAttribute('aria-label', 'Delete task: ' + task.text);
      deleteBtn.textContent = '✕';
      deleteBtn.addEventListener('click', function() { deleteTask(index); });

      div.appendChild(checkBtn);
      div.appendChild(textSpan);
      div.appendChild(deleteBtn);
      taskList.appendChild(div);
    });
  }

  function addTask() {
    var text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    taskInput.focus();
    renderTasks();
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  addBtn.addEventListener('click', addTask);

  taskInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });

  renderTasks();
})();


// ─── Contact Form Validation ──────────────────────────────
(function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var fields = {
    name:    { input: document.getElementById('contactName'),    error: document.getElementById('nameError') },
    email:   { input: document.getElementById('contactEmail'),   error: document.getElementById('emailError') },
    phone:   { input: document.getElementById('contactPhone'),   error: document.getElementById('phoneError') },
    message: { input: document.getElementById('contactMessage'), error: document.getElementById('messageError') }
  };

  var successEl = document.getElementById('formSuccess');
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRegex = /^[0-9]+$/;

  function showError(field, message) {
    field.input.classList.add('error');
    field.error.textContent = message;
    field.error.classList.add('visible');
  }

  function clearError(field) {
    field.input.classList.remove('error');
    field.error.classList.remove('visible');
    field.error.textContent = '';
  }

  function clearAllErrors() {
    Object.keys(fields).forEach(function(key) {
      clearError(fields[key]);
    });
    if (successEl) {
      successEl.classList.remove('visible');
    }
  }

  Object.keys(fields).forEach(function(key) {
    fields[key].input.addEventListener('input', function() {
      clearError(fields[key]);
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearAllErrors();

    var valid = true;

    if (!fields.name.input.value.trim()) {
      showError(fields.name, 'Please enter your name.');
      valid = false;
    }

    var emailVal = fields.email.input.value.trim();
    if (!emailVal) {
      showError(fields.email, 'Please enter your email address.');
      valid = false;
    } else if (!emailRegex.test(emailVal)) {
      showError(fields.email, 'Please enter a valid email address.');
      valid = false;
    }

    var phoneVal = fields.phone.input.value.trim();
    if (!phoneVal) {
      showError(fields.phone, 'Please enter your phone number.');
      valid = false;
    } else if (!phoneRegex.test(phoneVal)) {
      showError(fields.phone, 'Phone number must contain only digits — no letters or symbols.');
      valid = false;
    }

    if (!fields.message.input.value.trim()) {
      showError(fields.message, 'Please enter a message.');
      valid = false;
    }

    if (!valid) return;

    form.reset();
    if (successEl) {
      successEl.classList.add('visible');
    }

    setTimeout(function() {
      if (successEl) successEl.classList.remove('visible');
    }, 6000);
  });
})();
