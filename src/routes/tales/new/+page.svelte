<script lang="ts">
  export let data: { userEmail: string | null };
</script>

<main class="new-tale">
  <h1>Start a new tale</h1>
  <p>Signed in as {data.userEmail}</p>

  <section class="card">
    <p>This page is protected. We’ll add the form to create a new tale here.</p>
    <ol>
      <li>Enter title, author, and excerpt</li>
      <li>Upload a cover image</li>
      <li>Write your tale content</li>
    </ol>
  </section>
</main>

<style>
  .new-tale {
    max-width: 720px;
    margin: 2rem auto;
    padding: 1rem;
  }
  .card {
    padding: 1rem;
    border: 1px solid rgba(189, 150, 72, 0.3);
    border-radius: 8px;
  }
</style>
