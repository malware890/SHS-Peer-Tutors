// Peer Tutors site — shared interactivity (mobile nav, dropdowns, accordion, tabs, reveal)
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var navMain = document.querySelector(".nav-main");
  if (toggle && navMain) {
    toggle.addEventListener("click", function () {
      navMain.classList.toggle("open");
      toggle.setAttribute("aria-expanded", navMain.classList.contains("open"));
    });
  }

  // Dropdown menus (click-toggle, works for touch + mouse)
  document.querySelectorAll(".dropdown > button").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var parent = btn.closest(".dropdown");
      document.querySelectorAll(".dropdown.open").forEach(function (d) {
        if (d !== parent) d.classList.remove("open");
      });
      parent.classList.toggle("open");
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown.open").forEach(function (d) {
      d.classList.remove("open");
    });
  });

  // Accordion (FAQ page)
  document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var item = trigger.closest(".accordion-item");
      var panel = item.querySelector(".accordion-panel");
      var isOpen = item.classList.contains("open");

      item.parentElement.querySelectorAll(".accordion-item.open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".accordion-panel").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Tabs (Requirements / Content Database / Committees pages)
  document.querySelectorAll(".tabs-bar").forEach(function (bar) {
    var group = bar.dataset.tabGroup;
    var panels = document.querySelectorAll('.tab-panel[data-tab-group="' + group + '"]');
    bar.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        bar.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
        panels.forEach(function (p) { p.classList.remove("active"); });
        btn.classList.add("active");
        var target = document.querySelector('.tab-panel[data-tab-group="' + group + '"][data-tab="' + btn.dataset.tab + '"]');
        if (target) target.classList.add("active");
      });
    });
  });

  // Schedule page: claim an open shift (prototype — stored in localStorage
  // on this device only, pending a real shared backend)
  var scheduleGrid = document.querySelector(".schedule-grid");
  if (scheduleGrid) {
    var STORAGE_KEY = "pt_shift_claims";
    var claimPanel = document.querySelector(".claim-panel");
    var claimForm = document.querySelector(".claim-form");
    var claimShiftLabel = document.querySelector(".claim-shift-label");
    var claimConfirm = document.querySelector(".claim-confirm");
    var activeCell = null;

    function getClaims() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveClaims(claims) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
    }
    function renderCell(cell, claim) {
      var shiftId = cell.dataset.shift;
      var label = cell.dataset.label;
      cell.innerHTML = '<span class="day">' + label + '</span>';
      if (claim) {
        cell.classList.remove("open");
        cell.classList.add("pending");
        var name = document.createElement("span");
        name.className = "name";
        name.textContent = claim.name;
        var tag = document.createElement("span");
        tag.className = "hourglass";
        tag.textContent = "⏳ pending Eboard OK";
        var cancel = document.createElement("button");
        cancel.type = "button";
        cancel.className = "claim-btn";
        cancel.textContent = "Cancel request";
        cancel.addEventListener("click", function () {
          var claims = getClaims();
          delete claims[shiftId];
          saveClaims(claims);
          renderCell(cell, null);
        });
        cell.appendChild(name);
        cell.appendChild(tag);
        cell.appendChild(cancel);
      } else {
        cell.classList.remove("pending");
        cell.classList.add("open");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "claim-btn";
        btn.textContent = "Grab this shift";
        btn.addEventListener("click", function () { openClaimPanel(cell); });
        cell.appendChild(btn);
      }
    }

    function openClaimPanel(cell) {
      activeCell = cell;
      if (claimShiftLabel) claimShiftLabel.textContent = cell.dataset.subject + " — " + cell.dataset.label;
      if (claimPanel) {
        claimPanel.classList.remove("is-hidden");
        claimPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (claimConfirm) claimConfirm.textContent = "";
    }

    // Re-render every cell marked "open" or "pending" from saved state on load
    var claims = getClaims();
    scheduleGrid.querySelectorAll(".shift-cell.open, .shift-cell.pending").forEach(function (cell) {
      var shiftId = cell.dataset.shift;
      renderCell(cell, claims[shiftId] || null);
    });

    if (claimForm) {
      claimForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!activeCell) return;
        var name = claimForm.querySelector('[name="name"]').value.trim();
        var email = claimForm.querySelector('[name="email"]').value.trim();
        if (!name || !email) return;
        var shiftId = activeCell.dataset.shift;
        var claims2 = getClaims();
        claims2[shiftId] = { name: name, email: email };
        saveClaims(claims2);
        renderCell(activeCell, claims2[shiftId]);
        claimForm.reset();
        if (claimConfirm) claimConfirm.textContent = "Request saved on this device — the Eboard will confirm it on the master sheet.";
        if (claimPanel) claimPanel.classList.add("is-hidden");
        activeCell = null;
      });
    }
  }

  // Makeup-request form (prototype — no backend yet, just confirms inline)
  var makeupForm = document.querySelector(".makeup-form");
  if (makeupForm) {
    makeupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = makeupForm.querySelector(".makeup-confirm");
      if (note) note.textContent = "Thanks! This is a working prototype, so nothing was sent yet — once this is wired up, your Content Director will be notified automatically.";
      makeupForm.reset();
    });
  }

  // Deep-link a tab via URL hash, e.g. database.html#study-guides
  if (window.location.hash) {
    var hashTab = window.location.hash.slice(1);
    var hashBtn = document.querySelector('.tab-btn[data-tab="' + hashTab + '"]');
    if (hashBtn) hashBtn.click();
  }

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
