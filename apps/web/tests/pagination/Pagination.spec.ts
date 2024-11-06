import { fireEvent, render, screen } from '@testing-library/svelte';

import { describe, expect, it, vi } from 'vitest';

import Pagination from '$lib/common/components/pagination/Pagination.svelte'; // Adjust the path to your component

describe('Pagination Component', () => {
  it('renders the correct number of page options', () => {
    render(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        limit: 10,
        maxVisiblePages: 5,
        goToPage: vi.fn(),
      },
    });

    const pageOptions = screen.getAllByRole('option');
    expect(pageOptions).toHaveLength(5); // Assuming totalPages is 5
  });

  it('calls goToPage with the correct page number when a page is selected', async () => {
    const goToPage = vi.fn();
    render(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        limit: 10,
        maxVisiblePages: 5,
        goToPage,
      },
    });

    const pageSelect = screen.getByRole('combobox');
    await fireEvent.change(pageSelect, { target: { value: '3' } });

    expect(goToPage).toHaveBeenCalledWith(3);
  });

  it('disables the Prev button on the first page', () => {
    render(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        limit: 10,
        maxVisiblePages: 5,
        goToPage: vi.fn(),
      },
    });

    const prevButton = screen.getByText('Prev');
    expect(prevButton.hasAttribute('disabled')).toBe(true);
  });

  it('disables the Next button on the last page', () => {
    render(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
        limit: 10,
        maxVisiblePages: 5,
        goToPage: vi.fn(),
      },
    });

    const nextButton = screen.getByText('Next');
    expect(nextButton.hasAttribute('disabled')).toBe(true);
  });

  it('highlights the current page button', () => {
    render(Pagination, {
      props: {
        currentPage: 3,
        totalPages: 5,
        limit: 10,
        maxVisiblePages: 5,
        goToPage: vi.fn(),
      },
    });

    // Use a more specific query if needed
    const currentPageButton = screen.getByRole('button', { name: '3' });
    expect(currentPageButton.classList.contains('bg-ng-blue-400')).toBe(true);
  });
});
