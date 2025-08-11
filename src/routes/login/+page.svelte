<script lang="ts">
  import { supabase } from '$lib/supabaseClient';

  let email = '';
  let loading = false;
  let message = '';
  let errorMsg = '';

  async function signInWithMagicLink() {
    if (!supabase) {
      errorMsg = 'Supabase is not configured.';
      return;
    }

    loading = true;
    errorMsg = '';
    message = '';
    try {
      const redirectTo = `${window.location.origin}/tales/new`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo }
      });
      if (error) throw error;
      message = 'Check your email for a login link.';
    } catch (err: any) {
      errorMsg = err?.message || 'Login failed';
    } finally {
      loading = false;
    }
  }
</script>

<main class="login-page">
  <h1>Sign in</h1>
  <p>Use your email to receive a magic link.</p>

  <form on:submit|preventDefault={signInWithMagicLink}>
    <input type="email" placeholder="you@example.com" bind:value={email} required class="input" />
    <button class="btn" disabled={loading}>{loading ? 'Sending…' : 'Send magic link'}</button>
  </form>

  {#if message}
    <p class="msg success">{message}</p>
  {/if}
  {#if errorMsg}
    <p class="msg error">{errorMsg}</p>
  {/if}
</main>

<style>
  .login-page {
    max-width: 420px;
    margin: 2rem auto;
    padding: 1rem;
  }
  .input {
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
  }
  .btn {
    padding: 0.6rem 1rem;
  }
  .msg.success {
    color: #22c55e;
  }
  .msg.error {
    color: #ef4444;
  }
</style>
