import { render, screen } from '@testing-library/svelte';
import Button from './Button.svelte';

test('should render', () => {
	const results = render(Button, { props: { label: 'bbb' } });

	// expect(() => results.getByDisplayValue('bbb')).not.toThrow();
	const button = screen.getByLabelText('bbb');

	expect(button).toBeInTheDocument();
});
