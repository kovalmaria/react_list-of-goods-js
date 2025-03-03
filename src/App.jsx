import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABET_REVERSE = 'alphabetically_reverse';
const SORT_FIELD_LENGTH_REVERSE = 'length_reverse';
const SORT_FIELD_REVERSE = 'reverse';

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goodsFromServer];

  switch (sortField) {
    case SORT_FIELD_ALPHABET:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_FIELD_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    case SORT_FIELD_ALPHABET_REVERSE:
      preparedGoods.sort((good1, good2) => good2.localeCompare(good1));
      break;
    case SORT_FIELD_LENGTH_REVERSE:
      preparedGoods
        .sort((good1, good2) => good1.length - good2.length)
        .reverse();
      break;
    case SORT_FIELD_REVERSE:
      preparedGoods.reverse();
      break;
    default:
      break;
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            if (sortField === SORT_FIELD_REVERSE) {
              setSortField(SORT_FIELD_ALPHABET_REVERSE);
            } else {
              setSortField(SORT_FIELD_ALPHABET);
            }
          }}
          className={cn('button', 'is-info', {
            'is-light':
              sortField !== SORT_FIELD_ALPHABET &&
              sortField !== SORT_FIELD_ALPHABET_REVERSE,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            if (sortField === SORT_FIELD_REVERSE) {
              setSortField(SORT_FIELD_LENGTH_REVERSE);
            } else {
              setSortField(SORT_FIELD_LENGTH);
            }
          }}
          className={cn('button', 'is-success', {
            'is-light':
              sortField !== SORT_FIELD_LENGTH &&
              sortField !== SORT_FIELD_LENGTH_REVERSE,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            if (sortField === '') {
              setSortField(SORT_FIELD_REVERSE);
            } else if (sortField === SORT_FIELD_ALPHABET) {
              setSortField(SORT_FIELD_ALPHABET_REVERSE);
            } else if (sortField === SORT_FIELD_LENGTH) {
              setSortField(SORT_FIELD_LENGTH_REVERSE);
            } else if (sortField === SORT_FIELD_ALPHABET_REVERSE) {
              setSortField(SORT_FIELD_ALPHABET);
            } else if (sortField === SORT_FIELD_LENGTH_REVERSE) {
              setSortField(SORT_FIELD_LENGTH);
            } else if (sortField === SORT_FIELD_REVERSE) {
              setSortField('');
            }
          }}
          className={cn('button', 'is-warning', {
            'is-light':
              sortField !== SORT_FIELD_ALPHABET_REVERSE &&
              sortField !== SORT_FIELD_LENGTH_REVERSE &&
              sortField !== SORT_FIELD_REVERSE,
          })}
        >
          Reverse
        </button>

        {sortField && (
          <button
            onClick={() => setSortField('')}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
