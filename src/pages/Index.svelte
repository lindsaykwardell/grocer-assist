<script>
  import { link } from 'svelte-spa-router'
  import { costList, shoppingList } from '../store'
  import naturalOrder from 'natural-order'

  let selectedId = ''
  $: totalCost = $shoppingList.reduce((total, shoppingItem) => {
    const cost =
      $costList.find(item => item.id === shoppingItem.item).cost *
      shoppingItem.count
    return total + cost
  }, 0)

  const addToShoppingList = () => {
    if (!$shoppingList.find(shoppingItem => shoppingItem.item === selectedId)) {
      shoppingList.update(list => [...list, { item: selectedId, count: 1 }])
      selectedId = ''
    }
  }

  const alterItemCount = (id, val) => {
    const shoppingItem = $shoppingList.find(
      shoppingItem => (shoppingItem.item = id)
    )
    shoppingItem.count += val
    if (shoppingItem.count <= 0) {
      shoppingList.update(list => list.filter(item => item.item !== id))
    } else {
      shoppingList.update(list =>
        list.map(item => (item.item === id ? shoppingItem : item))
      )
    }
  }

  const resetList = () => {
    shoppingList.set([])
  }
</script>

<style>
  select {
    border: 1px solid #eee;
    border-radius: 5px;
    width: 100%;
  }
  #shopping-list {
    border: 1px solid #eee;
    border-radius: 20px;

    height: 65vh;
    overflow: hidden;
  }
  #shopping-list-items {
    overflow: auto;
    height: 65vh;
    padding-left: 10px;
  }
</style>

<button
  class="float-right px-4 py-2 m-2 bg-gray-200 hover:bg-gray-400 rounded"
  on:click={resetList}>
  New List
</button>
<h1>Shopping List</h1>
<div class="container m-auto">
  <select
    bind:value={selectedId}
    on:change={addToShoppingList}
    class="bg-white">
    <option value="" disabled>Select an item to add it to your list...</option>
    {#each naturalOrder($costList, [
      'name',
    ]).filter(item => !$shoppingList.find(shoppingItem => shoppingItem.item === item.id)) as item}
      <option value={item.id}>{item.name}</option>
    {/each}
  </select>
  <div id="shopping-list">
    <div id="shopping-list-items" class="pt-6">
      {#each $shoppingList as shoppingItem}
        <div class="flex">
          <div class="flex-1 py-1">
            {shoppingItem.count}x {$costList.find(item => item.id === shoppingItem.item).name}
          </div>
          <div class="flex-shrink px-2">
            ${$costList.find(item => item.id === shoppingItem.item).cost * shoppingItem.count}
          </div>
          <div class="flex-shrink">
            <button
              class="px-2 bg-green-200 hover:bg-green-400 rounded"
              on:click={() => alterItemCount(shoppingItem.item, 1)}>
              +
            </button>
            <button
              class="px-2 bg-red-200 hover:bg-red-400 rounded"
              on:click={() => alterItemCount(shoppingItem.item, -1)}>
              -
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="flex pt-4">
    <div class="flex-grow">Total:</div>
    <div class="flex-shrink justify-right">${totalCost}</div>
  </div>
</div>
