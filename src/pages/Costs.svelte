<script>
  import { link } from 'svelte-spa-router'
  import { costList, shoppingList } from '../store'
  import naturalOrder from 'natural-order'
  import uuid from 'uuid/v4'

  let itemName = ''
  let itemCost = 0

  $: localStorage.setItem('costList', JSON.stringify($costList))

  const addItemToList = () => {
    costList.update(list => [
      ...list,
      { id: uuid(), name: itemName, cost: itemCost },
    ])
    itemName = ''
    itemCost = 0
  }

  const removeItemFromList = id => {
    if ($shoppingList.find(item => item.item === id)) {
      alert(
        'This item was in your current shopping list. The shopping list has been updated accordingly.'
      )
      shoppingList.update(list => list.filter(item => item.item !== id))
    }
    costList.update(list => list.filter(item => item.id !== id))
  }

  const resetList = () => {
    costList.set([])
  }
</script>

<style>
  input {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 5px;
  }
  #cost-list {
    border: 1px solid #eee;
    border-radius: 20px;

    height: 65vh;
    overflow: hidden;
  }
  #cost-list-items {
    overflow: auto;
    height: 65vh;
    padding-left: 10px;
  }
  #no-cost-list {
    color: #999;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65vh;
  }
</style>

<h1>Costs</h1>
<div class="container m-auto">
  <div class="flex justify-center">
    <div class="flex-1 m-2">
      <input bind:value={itemName} type="text" placeholder="Item Name" />
    </div>
    <div class="flex-1 m-2">
      <input bind:value={itemCost} type="number" placeholder="Item Cost" />
    </div>
  </div>
  <div class="flex justify-center">
    <button
      class="px-3 py-1 bg-green-200 hover:bg-green-300 rounded"
      on:click={addItemToList}>
      Add
    </button>
    {#if process.env.NODE_ENV === 'development'}
      <button class="px-3 py-1 ml-2 bg-gray-200 rounded" on:click={resetList}>
        Reset
      </button>
    {/if}
  </div>
  <div id="cost-list">
    <div id="cost-list-items">
      {#if $costList.length <= 0}
        <div id="no-cost-list">
          No costs have been added. Enter a name and cost to get started!
        </div>
      {:else}
        {#each naturalOrder($costList, ['name']) as item}
          <div>
            <button
              class="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full h-6
              w-6 mr-5"
              style="position: relative; top: 6px;"
              on:click={() => removeItemFromList(item.id)}>
              <span style="position: relative; top: -6px; left: -0.5px">
                &times
              </span>
            </button>
            <span>{item.name} - ${item.cost}</span>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
