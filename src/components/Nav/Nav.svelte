<script>
  import { link } from 'svelte-spa-router'
</script>

<style>
  .nav-item {
    min-width: 140px;
  }
</style>

<nav>
  <div class="flex">
    <div class="nav-item flex-shrink">
      <a href="/" use:link>Shopping List</a>
    </div>
    <div class="nav-item flex-shrink">
      <a href="/costs" use:link>Costs</a>
    </div>
  </div>
</nav>
