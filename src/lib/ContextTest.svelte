<!--
 Copyright (c) 2022 KrestUI
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
<script lang="ts" context="module">
  export type KeyValue = {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    key: any;
    value: any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  };
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import type { SvelteComponent } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let component: Writable<typeof SvelteComponent>;
  export let keyValues: KeyValue[] = [];

  keyValues.forEach((keyvalue: KeyValue) => {
    setContext(keyvalue.key, keyvalue.value);
  });
</script>

<svelte:component this={component} />
