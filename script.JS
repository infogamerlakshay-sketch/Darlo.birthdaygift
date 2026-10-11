
document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // All main sections
  const home = $("home");
  const countdownSection = $("countdownSection");
  const memories = $("memories");
  const birthdayLetter = $("birthdayLetter");

  const sections = [
    home,
    countdownSection,
    memories,
    birthdayLetter
  ].filter(Boolean);

  // Buttons and messages
  const surpriseBtn = $("surpriseBtn");
  const message = $("message");
  const countdownContinue = $("countdownContinue");
  const memoriesContinue = $("memoriesContinue");
  const letterBtn = $("letterBtn");
  const letterMessage = $("letterMessage");

  // Keep the page scrollable
  document.documentElement.style.overflowY = "auto";
  document.body.style.overflowY = "auto";
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";

  let currentLevel = 0;
  let unlockedLevel = 0;

  // Show the selected section without disabling scrolling
  function showLevel(level) {
    if (level < 0 || level >= sections.length) return;

    currentLevel = level;
    unlockedLevel = Math.max(unlockedLevel, level);

    sections.forEach((section, index) => {
      section.hidden = index !== level;
    });

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }

  // Start with the welcome page
  showLevel(0);

  // Birthday countdown: October 12, 2026, India time
  const birthdayDate = new Date(
    "2026-10-12T00:00:00+05:30"
  ).getTime();

  function updateCountdown() {
    const remaining = Math.max(
      0,
      birthdayDate - Date.now()
    );

    const days = $("days");
    const hours = $("hours");
    const minutes = $("minutes");
    const seconds = $("seconds");
    const status = $("birthdayStatus");

    if (days) {
      days.textContent = Math.floor(
        remaining / (1000 * 60 * 60 * 24)
      );
    }

    if (hours) {
      hours.textContent = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );
    }

    if (minutes) {
      minutes.textContent = Math.floor(
        (remaining % (1000 * 60 * 60)) /
        (1000 * 60)
      );
    }

    if (seconds) {
      seconds.textContent = Math.floor(
        (remaining % (1000 * 60)) / 1000
      );
    }

    if (status) {
      status.textContent = remaining === 0
        ? "IT'S DARLO'S BIRTHDAY! 🎂🎉💖"
        : "Counting every second until your special day ✨";
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Welcome button -> Countdown
  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {
      if (message) {
        message.textContent =
          "Happy Birthday Darlo! 🎂💖 You make life more magical! ✨";
        message.classList.add("active");
      }

      surpriseBtn.textContent = "Surprise Opened! 💝";
      showLevel(1);
    });
  }

  // Countdown -> Photo gallery
  if (countdownContinue) {
    countdownContinue.addEventListener("click", () => {
      if (unlockedLevel >= 1) {
        showLevel(2);
      }
    });
  }

  // Photo gallery -> Birthday letter
  if (memoriesContinue) {
    memoriesContinue.addEventListener("click", () => {
      if (unlockedLevel >= 2) {
        showLevel(3);
      }
    });
  }

  // Photo lightbox
  const lightbox = $("photoLightbox");
  const largePhoto = $("largePhoto");
  const closePhoto = $("closePhoto");

  const photoButtons = document.querySelectorAll(".polaroid");

  function openPhoto(path) {
    if (!lightbox || !largePhoto || !path) return;

    largePhoto.src = path;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";

    if (closePhoto) {
      closePhoto.focus();
    }
  }

  function closeLightbox() {
    if (!lightbox || !largePhoto) return;

    lightbox.hidden = true;
    largePhoto.removeAttribute("src");

    // Restore page scrolling after closing the photo
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
  }

  photoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const path = button.dataset.photo;

      if (path) {
        openPhoto(path);
      }
    });
  });

  if (closePhoto) {
    closePhoto.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  // Birthday letter button
  if (letterBtn) {
    letterBtn.addEventListener("click", () => {
      if (letterMessage) {
        letterMessage.textContent =
          "You deserve all the happiness in the universe, Darlo! 💖🎂✨";

        letterMessage.classList.add("active");
      }

      letterBtn.textContent = "Lots of Love! 💗";
    });
  }

  console.log("Darlo birthday website initialized successfully! 🎂");
});
