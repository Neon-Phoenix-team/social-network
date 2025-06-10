'use client'
import React, { useState } from 'react'
import * as Select from '@radix-ui/react-select'
import styles from './Pagination.module.scss'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'

type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

export const Pagination: React.FC<SuperPaginationPropsType> = ({
  id = 'hw15',
  page,
  itemsCountForPage,
  totalCount,
  onChange,
}) => {
  const lastPage = Math.max(1, Math.ceil(totalCount / itemsCountForPage))
  const options = [10, 20, 30, 50, 100]
  const [open, setOpen] = useState(false) // следим за состоянием селекта

  const handlePageClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      onChange(newPage, itemsCountForPage)
    }
  }

  const handleSelectChange = (value: string) => {
    const count = Number(value)
    onChange(1, count)
  }

  const generatePages = () => {
    const pages: (number | string)[] = []

    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 4) pages.push('...')
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(lastPage - 1, page + 1);
        i++
      ) {
        pages.push(i)
      }
      if (page < lastPage - 3) pages.push('...')
      pages.push(lastPage)
    }

    return pages
  }

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pageGroup}>
        <button
          className={styles.navButton}
          onClick={() => handlePageClick(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeftIcon />
        </button>

        {generatePages().map((p, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${p === page ? styles.active : ''} ${p === '...' ? styles.dots : ''}`}
            onClick={() => typeof p === 'number' && handlePageClick(p)}
            disabled={p === '...'}
          >
            {p}
          </button>
        ))}

        <button
          className={styles.navButton}
          onClick={() => handlePageClick(page + 1)}
          disabled={page >= lastPage}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <span className={styles.text}>Show</span>
      <div style={{ minWidth: '70px', position: 'relative' }}>
        <Select.Root
          open={open}
          onOpenChange={setOpen}
          value={itemsCountForPage.toString()}
          onValueChange={handleSelectChange}
        >
          <Select.Trigger className={styles.selectTrigger} id={id + '-select'}>
            <Select.Value />
            <Select.Icon>
              {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className={styles.selectContent}
              position="popper"
              // sideOffset={2}
              collisionPadding={10}
              align="start"
            >
              <Select.Viewport className={styles.viewport}>
                {options.map(opt => (
                  <Select.Item
                    key={opt}
                    value={opt.toString()}
                    className={styles.selectItem}
                  >
                    <Select.ItemText>{opt}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <span className={styles.text}>on page</span>
    </div>
  )
}
