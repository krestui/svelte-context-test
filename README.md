# Svelte Context Test

`@krestui/svelte-context-test` is a library to test components with svelte context, specifically `getContext()` API-s.

svelte framework provides and recommends `Context`s to share data between the parent and child components, .

This library helps to test Svelte Child Components that expect context values to be passed from a parent component.

## Installation

```sh
$ npm install -D @krestui/svelte-context-test
```

In case of yarn, do the following:

```sh
$ yarn add -D @krestui/svelte-context-test
```

## Example

Assume 2 components - Parent and Child, that share data between each other through `Context`s , as below.

`Child.svelte`

```svelte
<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  const groupStore: Writable<string> = getContext('ctx-key');
</script>

{$groupStore}
```

The Child component expects context data through a key - `ctx-key` as mentioned above.

`Parent.svelte`

```svelte
<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import Child from './Child.svelte';

  let groupStore = writable('');

  setContext('ctx-key', groupStore);
</script>

<Child />
```

The Parent component sets the `ctx-key` context key so the child component can pick it up.

To test the child component `Child.svelte` above (using jest or any other framework of your choice),we need to set the right context value for `ctx-key` .

Trying to instantiate the child component directly through the `render` from `testing-library/svelte` will work, but not very useful since we cannot set the value of the context key `ctx-key` expected in the `Child` component.

`Child-notuseful.test.ts`

```typescript
import { render, fireEvent } from '@testing-library/svelte';

import Child from './Child.svelte';

test('renders the Child component', () => {
  const { getByText } = render(Child);
  // This will programmatically compile but useless
  // since we cannot set the context key of 'ctx-key' to be tested better
});
```

To write better unit tests, we use this library `@krestui/svelte-context-test` as below.

## Usage

Create a mixin helper component of `Child.svelte` as below, say `MockChild.svelte` that helps us set the context key attribute values, as below.

Use the `ContextTest` component provided by this library to instantiate the `Child` component while setting the context key attribute values.

See below.

`MockChild.svelte`

```svelte
<script lang="ts">
  import Child from '$lib/Child.svelte';
  import { writable } from 'svelte/store';
  import ContextTest, { type KeyValue } from '@krestui/svelte-context-test/ContextTest.svelte';
  const keyValues: Array<KeyValue> = [{ key: 'ctx-key', value: writable('') } as KeyValue];
</script>

<ContextTest component={Child} {keyValues} />
```

`Child.test.ts`

```typescript
import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import MockChild from './MockChild.svelte';

test('renders Child Component', () => {
  const { getByText } = render(MockChild);
});
```

### jest

If you are using `jest` freel free to add the following to `jest.config.cjs` in your project

jest.config.cjs

```js
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@krestui)/(svelte-context-test))'
  ],
```

The above will ensure that the `jest` runner is able to read `svelte` files from this package so the unit tests continue to pass.

## License

The code is issued under MIT License.
