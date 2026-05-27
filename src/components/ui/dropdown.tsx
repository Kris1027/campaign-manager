import { useState, useRef, useEffect, useId } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from './dropdown.module.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  id,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const getOptionId = (index: number) => `${listId}-option-${index}`;

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          onChange(options[highlightedIndex].value);
          setIsOpen(false);
        } else {
          setIsOpen(true);
          setHighlightedIndex(0);
        }
        break;
      case 'Escape':
      case 'Tab':
        setIsOpen(false);
        break;
    }
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        type='button'
        id={id}
        role='combobox'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={
          isOpen && highlightedIndex >= 0
            ? getOptionId(highlightedIndex)
            : undefined
        }
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className={[
          styles.trigger,
          !selectedOption ? styles.placeholder : '',
        ].join(' ')}
        onClick={() => setIsOpen((o) => !o)}
        onKeyDown={handleKeyDown}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <FiChevronDown
          className={[styles.chevron, isOpen ? styles.chevronOpen : ''].join(
            ' '
          )}
          aria-hidden='true'
        />
      </button>

      {isOpen && (
        <ul id={listId} role='listbox' className={styles.list}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={getOptionId(index)}
              role='option'
              aria-selected={option.value === value}
              className={[
                styles.option,
                option.value === value ? styles.selected : '',
                index === highlightedIndex ? styles.highlighted : '',
              ].join(' ')}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
