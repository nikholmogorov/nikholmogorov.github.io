import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Rates from './Rates'
import type { CalcProps, Rate } from '../App'

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

describe('Rates Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    test('renders rates list excluding base currency and calculates inverse rates', () => {
        render(
            <MemoryRouter>
                <Rates {...mockProps} />
            </MemoryRouter>
        )
        expect(screen.getByText('1 USD = 100.0000 RUB')).toBeInTheDocument()
        expect(screen.getByText('1 EUR = 111.1111 RUB')).toBeInTheDocument()
    })

    test('triggers setCurrency on select change in MUI Select', () => {
        render(
            <MemoryRouter>
                <Rates {...mockProps} />
            </MemoryRouter>
        )
        const selectButton = screen.getByRole('combobox')
        fireEvent.mouseDown(selectButton)

        const option = screen.getByRole('option', { name: 'USD' })
        fireEvent.click(option)

        expect(mockSetCurrency).toHaveBeenCalledWith('USD')
    })

    test('triggers navigation on calc button click', () => {
        render(
            <MemoryRouter>
                <Rates {...mockProps} />
            </MemoryRouter>
        )
        const button = screen.getByRole('button', { name: /calc/i })
        fireEvent.click(button)
    })

    test('renders loading indicator when isLoading is true', () => {
        render(
            <MemoryRouter>
                <Rates {...mockProps} isLoading={true} />
            </MemoryRouter>
        )
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    test('renders error message when error exists', () => {
        render(
            <MemoryRouter>
                <Rates {...mockProps} error="Failed to fetch" />
            </MemoryRouter>
        )
        expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument()
    })

    test('renders no data status when rates array is empty', () => {
        render(
            <MemoryRouter>
                <Rates {...mockProps} rates={[]} />
            </MemoryRouter>
        )
        expect(screen.getByText('No data')).toBeInTheDocument()
    })
})