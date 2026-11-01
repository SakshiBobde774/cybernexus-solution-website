//---------------------------------------- founder section---------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const founderSection = document.querySelector('.founder-section');

  if (founderSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add custom classes or trigger animations here
          const img = entry.target.querySelector('.founder-img');
          const badge = entry.target.querySelector('.experience-badge');

          if (img) img.style.opacity = '1';
          if (badge) badge.classList.add('animate__animated', 'animate__backInUp'); // If using Animate.css

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(founderSection);
  }
});


// Internship application form
(() => {
  const modal = document.getElementById("formModal");
  const form = document.getElementById("internshipForm");

  // script.js is shared with Aboutpage.html, which does not include this form.
  if (!modal || !form) return;

  const enrollButtons = Array.from(document.querySelectorAll(".enroll-btn"));
  const closeBtn = document.getElementById("closeFormModal");
  const successDoneBtn = document.getElementById("successDoneBtn");
  const fileChooser = document.getElementById("fileChooser");
  const customFileBtn = document.getElementById("customFileBtn");
  const fileName = document.getElementById("fileName");
  const courseSelect = document.getElementById("courseSelect");
  const selectedCourseHint = document.getElementById("selectedCourseHint");
  const submitBtn = document.getElementById("submitBtn");
  const submitBtnText = submitBtn.querySelector(".submit-btn__text");
  const successMessage = document.getElementById("successMessage");
  const successMessageText = document.getElementById("successMessageText");
  const formError = document.getElementById("formError");
  const formErrorText = document.getElementById("formErrorText");
  const formToast = document.getElementById("formToast");
  const formToastTitle = document.getElementById("formToastTitle");
  const formToastMessage = document.getElementById("formToastMessage");
  const formToastClose = document.getElementById("formToastClose");
  const applicantName = document.getElementById("applicantName");

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED_RESUME_EXTENSION = /\.(pdf|doc|docx)$/i;
  let lastTrigger = null;
  let isSubmitting = false;
  let toastTimer = null;

  function isModalOpen() {
    return modal.classList.contains("is-open");
  }

  function setCourse(course) {
    const selectedCourse = course && course.trim();

    if (!selectedCourse) return;

    const courseAlreadyExists = Array.from(courseSelect.options).some(
      option => option.value === selectedCourse
    );

    if (!courseAlreadyExists) {
      courseSelect.add(new Option(selectedCourse, selectedCourse));
    }

    courseSelect.value = selectedCourse;
    selectedCourseHint.textContent = `You're applying for ${selectedCourse}. Complete your details to continue.`;
  }

  function getSelectedCourse() {
    return courseSelect.value || "your selected course";
  }

  function hideFeedback() {
    successMessage.hidden = true;
    formError.hidden = true;
  }

  function showError(message, shouldFocus = false) {
    successMessage.hidden = true;
    formErrorText.textContent = message;
    formError.hidden = false;

    if (shouldFocus) {
      window.requestAnimationFrame(() => formError.focus());
    }
  }

  function showToast(type, title, message) {
    window.clearTimeout(toastTimer);
    formToast.classList.toggle("form-toast--error", type === "error");
    formToastTitle.textContent = title;
    formToastMessage.textContent = message;
    formToast.hidden = false;

    toastTimer = window.setTimeout(() => {
      formToast.hidden = true;
    }, 8000);
  }

  function dismissToast() {
    window.clearTimeout(toastTimer);
    formToast.hidden = true;
  }

  function openModal(event) {
    event.preventDefault();
    lastTrigger = event.currentTarget;
    const course = lastTrigger.dataset.heading;

    form.hidden = false;
    hideFeedback();
    setCourse(course);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("form-modal-open");
    enrollButtons.forEach(button => button.setAttribute("aria-expanded", String(button === lastTrigger)));

    window.setTimeout(() => applicantName.focus(), 0);
  }

  function closeModal() {
    if (isSubmitting) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("form-modal-open");
    enrollButtons.forEach(button => button.setAttribute("aria-expanded", "false"));

    if (lastTrigger) {
      lastTrigger.focus();
    }
  }

  function getFocusableElements() {
    const selector = [
      "button:not([disabled])",
      "[href]",
      "input:not([type='hidden']):not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    return Array.from(modal.querySelectorAll(selector)).filter(
      element => !element.hidden && !element.closest("[hidden]")
    );
  }

  function trapFocus(event) {
    const focusableElements = getFocusableElements();
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  function clearFileSelection() {
    fileChooser.value = "";
    fileName.textContent = "No file chosen";
  }

  function validateResume(showMessage = true) {
    const resume = fileChooser.files[0];

    if (!resume) {
      if (showMessage) {
        showError("Please choose your resume before submitting the application.");
        customFileBtn.focus();
      }
      return false;
    }

    if (!ALLOWED_RESUME_EXTENSION.test(resume.name)) {
      clearFileSelection();
      if (showMessage) {
        showError("Please upload your resume as a PDF, DOC, or DOCX file.");
        customFileBtn.focus();
      }
      return false;
    }

    if (resume.size > MAX_FILE_SIZE) {
      clearFileSelection();
      if (showMessage) {
        showError("Your resume is larger than 10 MB. Please choose a smaller file.");
        customFileBtn.focus();
      }
      return false;
    }

    fileName.textContent = resume.name;
    return true;
  }

  function setSubmitting(submitting) {
    isSubmitting = submitting;
    form.setAttribute("aria-busy", String(submitting));
    form.querySelectorAll("input, select, textarea, button").forEach(control => {
      control.disabled = submitting;
    });
    closeBtn.disabled = submitting;
    submitBtn.classList.toggle("is-loading", submitting);
    submitBtnText.textContent = submitting ? "Submitting application..." : "Submit application";
  }

  enrollButtons.forEach(button => {
    button.setAttribute("role", "button");
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-controls", "formModal");
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", openModal);
    button.addEventListener("keydown", event => {
      if (event.key === " ") {
        openModal(event);
      }
    });
  });

  closeBtn.addEventListener("click", closeModal);
  successDoneBtn.addEventListener("click", closeModal);
  formToastClose.addEventListener("click", dismissToast);

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (!isModalOpen()) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
    }

    if (event.key === "Tab") {
      trapFocus(event);
    }
  });

  customFileBtn.addEventListener("click", () => fileChooser.click());
  fileChooser.addEventListener("change", () => validateResume(true));

  courseSelect.addEventListener("change", () => setCourse(courseSelect.value));
  form.addEventListener("input", () => {
    formError.hidden = true;
  });
  form.addEventListener("change", () => {
    formError.hidden = true;
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (isSubmitting || !validateResume(true)) return;

    const course = getSelectedCourse();
    const formData = new FormData(form);
    const controller = typeof AbortController === "undefined" ? null : new AbortController();
    const timeoutId = controller
      ? window.setTimeout(() => controller.abort(), 20000)
      : null;

    setSubmitting(true);
    formError.hidden = true;

    try {
      const response = await fetch(form.action, {
        method: form.method || "POST",
        body: formData,
        headers: { Accept: "application/json" },
        ...(controller ? { signal: controller.signal } : {})
      });

      let responseBody = null;
      try {
        responseBody = await response.json();
      } catch (_) {
        // A successful submission can still have an empty response body.
      }

      if (!response.ok || responseBody?.success === false) {
        throw new Error("The application service could not accept the request.");
      }

      form.reset();
      clearFileSelection();
      setCourse(course);
      form.hidden = true;
      successMessageText.textContent = `Your ${course} application has been submitted. We will contact you soon.`;
      successMessage.hidden = false;
      showToast("success", "Application submitted", `Your ${course} application has been submitted successfully.`);
      window.requestAnimationFrame(() => successMessage.focus());
    } catch (error) {
      const message = error && error.name === "AbortError"
        ? "The request took too long. Please check your connection and try again."
        : "We could not submit your application right now. Please check your connection and try again.";
      showError(message, true);
      showToast("error", "Application not submitted", "Your details are still in the form. Please try again.");
    } finally {
      if (timeoutId) window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  });
})();

