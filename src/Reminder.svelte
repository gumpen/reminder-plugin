<script lang="ts">
  import type { Vault } from "obsidian";
  import { onMount, onDestroy } from "svelte";

  export let vault: Vault;

  let rawReminderFile: string;

  onMount(async () => {
    await readFile();
  });

  async function readFile() {
    const read = await vault.adapter.read("./_reminder.md");
    rawReminderFile = read;
  }
</script>

<style>
  .container {
    overflow-y: auto;
    padding: 0 10px;
  }
</style>

<div id="reminder-container" class="container">{rawReminderFile}</div>
