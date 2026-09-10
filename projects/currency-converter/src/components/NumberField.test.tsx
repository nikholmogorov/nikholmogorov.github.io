import { render, screen, fireEvent } from '@testing-library/react'
import NumberField from './NumberField'

describe('NumberField Component', () => {
    test('handles undefined, empty string, null, and NaN values correctly', () => {
        const { rerender } = render(<NumberField value={undefined} label="Amount" />)
        expect(screen.getByLabelText('Amount')).toBeInTheDocument()

        rerender(<NumberField value="" label="Amount" />)
        rerender(<NumberField value={null as unknown as undefined} label="Amount" />)
        rerender(<NumberField value="invalid-number" label="Amount" />)
    })

    test('renders correctly without label and without onChange callback', () => {
        render(<NumberField value={10} />)
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument()

        const incButton = screen.getByLabelText('Increase')
        fireEvent.click(incButton)
    })

    test('invokes onChange callback when value changes', () => {
        const handleChange = vi.fn()
        render(<NumberField value={10} onChange={handleChange} label="Amount" />)

        const incButton = screen.getByLabelText('Increase')
        fireEvent.click(incButton)
        expect(handleChange).toHaveBeenCalled()
    })

    test('handles NaN conversion correctly when invalid string is passed', () => {
        render(<NumberField value="not-a-number" label="Amount" />)
        const input = screen.getByLabelText('Amount') as HTMLInputElement
        expect(input.value).toBe('')
    })
})