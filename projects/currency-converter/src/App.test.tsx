import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Calc from './pages/Calc'
import type { CalcProps, Rate } from './App'

const mockRates: Rate[] = [
    { date: '2026-01-01', base: 'RUB', quote: 'USD', rate: 0.01 },
    { date: '2026-01-01', base: 'RUB', quote: 'EUR', rate: 0.009 },
]

const mockSetCurrency = vi.fn()

const mockProps: CalcProps = {
    currency: 'RUB',
    setCurrency: mockSetCurrency,
    rates: mockRates,
    isLoading: false,
    error: null,
}

describe('Calc Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    test('renders initial state with calculated result', () => {
        render(
            <MemoryRouter>
                <Calc {...mockProps} />
            </MemoryRouter>
        )
        expect(screen.getByText('1.00')).toBeInTheDocument()
    })

    test('calculates output correctly when input changes', () => {
        render(
            <MemoryRouter>
                <Calc {...mockProps} />
            </MemoryRouter>
        )
        const input = screen.getByLabelText('Amount')
        fireEvent.change(input, { target: { value: '200' } })
        expect(screen.getByText('2.00')).toBeInTheDocument()
    })

    test('triggers setCurrency on base currency select change', () => {
        render(
            <MemoryRouter>
                <Calc {...mockProps} />
            </MemoryRouter>
        )
        const selects = screen.getAllByRole('combobox')
        fireEvent.mouseDown(selects[0])

        const option = screen.getByRole('option', { name: 'EUR' })
        fireEvent.click(option)

        expect(mockSetCurrency).toHaveBeenCalledWith('EUR')
    })

    test('changes target currency and recalculates output', () => {
        render(
            <MemoryRouter>
                <Calc {...mockProps} />
            </MemoryRouter>
        )
        const selects = screen.getAllByRole('combobox')
        fireEvent.mouseDown(selects[1])

        const option = screen.getByRole('option', { name: 'EUR' })
        fireEvent.click(option)

        expect(screen.getByText('0.90')).toBeInTheDocument()
    })

    test('triggers navigation on rates button click', () => {
        render(
            <MemoryRouter>
                <Calc {...mockProps} />
            </MemoryRouter>
        )
        const button = screen.getByRole('button', { name: /rates/i })
        fireEvent.click(button)
    })

    test('renders loading status when isLoading is true', () => {
        render(
            <MemoryRouter>
                <Calc {...mockProps} isLoading={true} />
            </MemoryRouter>
        )
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    test('renders error message when error exists', () => {
        render(
            <MemoryRouter>
                <Calc {...mockProps} error="Network failure" />
            </MemoryRouter>
        )
        expect(screen.getByText('Error: Network failure')).toBeInTheDocument()
    })

    test('renders no data status when rates array is empty', () => {
        render(
            <MemoryRouter>
                <Calc {...mockProps} rates={[]} />
            </MemoryRouter>
        )
        expect(screen.getByText('No data')).toBeInTheDocument()
    })
})