import Index from './pages/Index.svelte'
import Costs from './pages/Costs.svelte'
import _404 from './pages/404.svelte'

export default {
  '/': Index,
  '/costs': Costs,
  '*': _404,
}
