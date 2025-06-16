<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';

  // Interface for form data
  interface ContactForm {
    name: string;
    email: string;
    message: string;
    captchaAnswer: string;
  }

  // Initialize form data
  let formData: ContactForm = {
    name: '',
    email: '',
    message: '',
    captchaAnswer: ''
  };

  let isSubmitting = false;
  let formError = '';
  let formSuccess = false;
  let isReady = false;

  // Generate random math problem
  let captchaProblem = '';
  let captchaSolution = 0;

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaSolution = num1 + num2;
    captchaProblem = `What is ${num1} + ${num2}?`;
  }

  // Error states
  let errors = {
    name: '',
    email: '',
    message: '',
    captcha: ''
  };

  // Client-side validation
  function validateForm(): boolean {
    let isValid = true;

    // Reset errors
    errors = {
      name: '',
      email: '',
      message: '',
      captcha: ''
    };

    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = 'Please enter your message';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    // Validate captcha
    if (!formData.captchaAnswer.trim()) {
      errors.captcha = 'Please solve the math problem';
      isValid = false;
    } else {
      const answer = parseInt(formData.captchaAnswer);
      if (isNaN(answer)) {
        errors.captcha = 'Please enter a valid number';
        isValid = false;
      } else if (answer !== captchaSolution) {
        errors.captcha = 'Incorrect answer. Please try again.';
        isValid = false;
        generateCaptcha(); // Generate new problem on wrong answer
      }
    }

    return isValid;
  }

  function resetForm() {
    formData = {
      name: '',
      email: '',
      message: '',
      captchaAnswer: ''
    };
    formError = '';
    errors = {
      name: '',
      email: '',
      message: '',
      captcha: ''
    };
    generateCaptcha();
  }

  // Create enhance submission function
  const handleSubmit = () => {
    // Client-side validation before submission
    if (!validateForm()) {
      return { cancel: true };
    }

    isSubmitting = true;
    formError = '';

    return async ({ result }: { result: { type: 'success' | 'error'; error?: string } }) => {
      isSubmitting = false;

      if (result.type === 'success') {
        formSuccess = true;
        resetForm();
      } else {
        formError =
          result.error || 'There was an error sending your message. Please try again later.';
        // Generate new captcha on error
        generateCaptcha();
      }
    };
  };

  onMount(() => {
    // Simulate loading
    setTimeout(() => {
      isReady = true;
    }, 300);
    generateCaptcha();
  });
</script>

<svelte:head>
  <title>Contact Us - Treasure Tavern</title>
  <meta
    name="description"
    content="Get in touch with the Treasure Tavern team for questions, feedback, or collaboration opportunities."
  />
</svelte:head>

<div class="page-container">
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content" class:visible={isReady}>
      <h1 class="hero-title">Contact Us</h1>
      <p class="hero-subtitle">
        Have questions, feedback, or simply want to share a tale? Reach out, and we'll respond
        faster than a messenger raven!
      </p>
    </div>
  </section>

  <div class="main-content">
    <div class="contact-container">
      <div class="contact-form">
        <h2 class="section-title">Send A Message</h2>

        {#if formSuccess}
          <div class="success-message">
            <h3 class="success-title">Message Sent!</h3>
            <p class="success-text">
              Thank you for reaching out. A member of our tavern staff will respond to your inquiry
              shortly.
            </p>
            <button
              class="submit-button"
              on:click={() => {
                formSuccess = false;
                resetForm();
              }}>Send Another Message</button
            >
          </div>
        {:else}
          <form method="POST" use:enhance={handleSubmit}>
            <div class="form-group">
              <label for="name" class="form-label">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-input"
                bind:value={formData.name}
                required
              />
              {#if errors.name}
                <p class="error-text">{errors.name}</p>
              {/if}
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-input"
                bind:value={formData.email}
                required
              />
              {#if errors.email}
                <p class="error-text">{errors.email}</p>
              {/if}
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Your Message</label>
              <textarea
                id="message"
                name="message"
                class="form-textarea"
                bind:value={formData.message}
                required
              ></textarea>
              {#if errors.message}
                <p class="error-text">{errors.message}</p>
              {/if}
            </div>

            <div class="form-group">
              <label for="captcha" class="form-label">Anti-Spam Check</label>
              <div class="captcha-container">
                <span class="captcha-problem">{captchaProblem}</span>
                <input
                  type="number"
                  id="captcha"
                  name="captcha"
                  class="form-input captcha-input"
                  bind:value={formData.captchaAnswer}
                  required
                  placeholder="Enter your answer"
                />
              </div>
              {#if errors.captcha}
                <p class="error-text">{errors.captcha}</p>
              {/if}
            </div>

            {#if formError}
              <p class="error-text">{formError}</p>
            {/if}

            <button type="submit" class="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(145deg, #13111c 0%, #1f1b2d 60%, #2b1d34 100%);
    color: #f7e8d4;
  }

  .hero {
    position: relative;
    min-height: 25vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem max(1rem, 3vw);
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(19, 17, 28, 0.7), rgba(19, 17, 28, 0.8)),
      url('/images/tavern-tales-bg.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
  }

  .hero-content {
    max-width: 900px;
    width: 100%;
    z-index: 1;
    transition: all 0.5s ease;
    opacity: 0;
    transform: translateY(20px);
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-title {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(2.5rem, 8vw, 4rem);
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: #f7e8d4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
    line-height: 1.2;
  }

  .hero-subtitle {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    margin-bottom: 1rem;
    color: rgba(247, 232, 212, 0.9);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-style: italic;
    line-height: 1.5;
  }

  .main-content {
    flex: 1;
    padding: clamp(1rem, 2vw, 1.5rem) max(1rem, 3vw);
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .contact-container {
    display: flex;
    justify-content: center;
    margin-top: 0;
  }

  .contact-form {
    padding: clamp(1rem, 3vw, 2rem);
    background: rgba(31, 27, 45, 0.4);
    border-radius: 10px;
    border: 1px solid rgba(189, 150, 72, 0.2);
    max-width: 600px;
    width: 100%;
  }

  .section-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: clamp(1rem, 3vw, 1.5rem);
    color: #bd9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-label {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #bd9648;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    background: rgba(19, 17, 28, 0.6);
    border: 1px solid rgba(189, 150, 72, 0.3);
    border-radius: 6px;
    color: #f7e8d4;
    font-family: 'Spectral', serif;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: rgba(189, 150, 72, 0.6);
    box-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .form-textarea {
    min-height: 150px;
    resize: vertical;
  }

  .error-text {
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-top: 0.3rem;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .submit-button {
    padding: 0.8rem 2rem;
    background: linear-gradient(135deg, #9e61e3 0%, #7a3ca3 100%);
    border: none;
    border-radius: 6px;
    color: #f7e8d4;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: block;
    width: fit-content;
    margin: 0 auto;
  }

  .submit-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(158, 97, 227, 0.3);
  }

  .submit-button:disabled {
    background: linear-gradient(135deg, #7a5da3 0%, #5a3c7a 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.7;
  }

  .success-message {
    padding: 1.5rem;
    background: rgba(31, 27, 45, 0.6);
    border: 1px solid rgba(189, 150, 72, 0.4);
    border-radius: 10px;
    margin-top: 1rem;
    text-align: center;
  }

  .success-title {
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #bd9648;
  }

  .success-text {
    font-family: 'Spectral', serif;
    font-size: 1.1rem;
    color: rgba(247, 232, 212, 0.92);
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    .contact-container {
      grid-template-columns: 1fr;
    }
  }

  .captcha-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .captcha-problem {
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    color: #bd9648;
    white-space: normal;
    min-width: 150px;
  }

  .captcha-input {
    flex: 1;
    min-width: 200px;
    width: auto;
  }

  @media (max-width: 480px) {
    .captcha-container {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .captcha-input {
      width: 100%;
    }

    .captcha-problem {
      font-size: 1.1rem;
    }
  }
</style>
