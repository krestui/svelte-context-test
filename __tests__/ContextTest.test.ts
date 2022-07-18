// Copyright (c) 2022 KrestUI
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render } from '@testing-library/svelte';
import SampleComponent from './SampleComponent.svelte';
import ContextTest from '$lib/ContextTest.svelte';

test('renders a SampleComponent using ContextTest', () => {
  const { getByText } = render(ContextTest, {
    props: { component: SampleComponent }
  });
  expect(getByText('sample')).toBeInTheDocument();
});
