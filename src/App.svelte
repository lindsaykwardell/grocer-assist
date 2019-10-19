<script>
  import routes from './routes'
  import Router from 'svelte-spa-router'
  import Nav from './components/Nav/Nav.svelte'
</script>

<style>
  header {
    border-bottom: 1px solid #ddd;
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background: #bbb;
    min-height: 20px;
  }
</style>

<div>
  <header>
    <Nav />
  </header>
  <main>
    <Router {routes} />
  </main>
  <footer />
</div>
