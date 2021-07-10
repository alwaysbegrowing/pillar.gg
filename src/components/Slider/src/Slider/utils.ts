import React from 'react';
import warning from 'warning';

import { DiscreteScale } from '../scales/DiscreteScale';
import { HandleItem } from '../types';

export const prfx = 'react-compound-slider:';

export function getSortByVal(reversed: boolean = false) {
  return function sortByVal(a: HandleItem, b: HandleItem) {
    if (a.val > b.val) {
      return reversed ? -1 : 1;
    }

    if (b.val > a.val) {
      return reversed ? 1 : -1;
    }

    return 0;
  };
}

export function getUpdatedHandles(
  handles: HandleItem[],
  updateKey: string,
  updateValue: number,
  reversed: boolean = false
) {
  const index = handles.findIndex(v => v.key === updateKey);

  if (index !== -1) {
    const { key, val } = handles[index];

    if (val === updateValue) {
      return handles;
    }

    return [
      ...handles.slice(0, index),
      { key, val: updateValue , metadata: {num: 1}},
      ...handles.slice(index + 1),
    ].sort(getSortByVal(reversed));
  }

  return handles;
}

export function getSliderDomain(slider: Element | null, vertical: boolean) {
  if (!slider) {
    return [0, 0];
  }

  const s = slider.getBoundingClientRect();

  const d0 = vertical ? s.top : s.left;
  const d1 = vertical ? s.bottom : s.right;

  return [d0, d1];
}

export function isNotValidTouch({
  type = '',
  touches,
}: {
  type: string;
  touches: TouchEvent['touches'];
}) {
  return (
    !touches ||
    touches.length > 1 ||
    (type.toLowerCase() === 'touchend' && touches.length > 0)
  );
}

export function getTouchPosition(
  vertical: boolean,
  e: React.TouchEvent | TouchEvent
) {
  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
}

export function getHandles(
  values: ReadonlyArray<any> = [],
  reversed: boolean,
  valueToStep: DiscreteScale,
  warn: boolean
) {
  let changes = 0;

  const handles = values
    .map(item => {
      const x = (typeof item === 'object') ? item.value : item
      const metadata = (typeof item === 'object') ? item : {}
      const val = valueToStep.getValue(x);

      if (x !== val) {
        changes += 1;
        warning(
          !warn,
          `${prfx} Invalid value encountered. Changing ${x} to ${val}.`
        );
      }
      return { val, metadata };
    })
    .map(({ val, metadata }, i) => ({ key: `$$-${i}`, val, metadata }))
    .sort(getSortByVal(reversed));

  return { handles, changes };
}
