import { useState, useId } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './keyword-typeahead.module.css';

interface KeywordTypeaheadProps {
  suggestions: string[];
  value: string[];
  onChange: (value: string[]) => void;
  id?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

function KeywordTypeahead({
  suggestions,
  value,
  onChange,
  id,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: KeywordTypeaheadProps) {
  const [query, setQuery] = useState('');
  const datalistId = useId();

  const available = suggestions.filter((s) => !value.includes(s));

  function tryAdd(raw: string) {
    const match = available.find(
      (s) => s.toLowerCase() === raw.trim().toLowerCase()
    );
    if (match) {
      onChange([...value, match]);
      setQuery('');
    }
  }

  function remove(keyword: string) {
    onChange(value.filter((k) => k !== keyword));
  }

  return (
    <div className={styles.container}>
      <div
        className={[styles.inputArea, ariaInvalid ? styles.invalid : '']
          .filter(Boolean)
          .join(' ')}
      >
        {value.map((keyword) => (
          <span key={keyword} className={styles.chip}>
            {keyword}
            <button
              type='button'
              className={styles.chipRemove}
              onClick={() => remove(keyword)}
              aria-label={`Remove ${keyword}`}
            >
              <FiX size={12} aria-hidden='true' />
            </button>
          </span>
        ))}
        <input
          id={id}
          type='text'
          list={datalistId}
          className={styles.input}
          value={query}
          placeholder={value.length === 0 ? 'Type to search keywords…' : ''}
          aria-describedby={ariaDescribedBy}
          onChange={(e) => {
            setQuery(e.target.value);
            tryAdd(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && query === '' && value.length > 0) {
              onChange(value.slice(0, -1));
            }
          }}
        />
        <datalist id={datalistId}>
          {available.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </div>
    </div>
  );
}

export default KeywordTypeahead;
