import { expect, test } from 'vitest';
import { theme } from 'antd';
import { kebabCase } from 'lodash';

import plugin from './index';

test('should generate expected class names', () => {
  const globalToken = theme.getDesignToken();
  const { config } = plugin();

  const ignore = [
    'motionUnit',
    'motionBase',
    'sizeUnit',
    'sizeStep',
    'sizePopupArrow',
    'wireframe',
    'motion',
    'fontHeight',
    'fontHeightLG',
    'fontHeightSM',
    'sizeXXL',
    'sizeXL',
    'sizeLG',
    'sizeMD',
    'sizeMS',
    'size',
    'sizeSM',
    'sizeXS',
    'sizeXXS',
    'controlInteractiveSize',
    'controlTmpOutline',
  ];

  const classnames = Object.values(config?.theme?.extend ?? {}).flatMap((o) => Object.keys(o ?? {}));
  const missing: string[] = [];

  Object.keys(globalToken).forEach((t) => {
    if (!classnames.includes(`ant-${kebabCase(t)}`) && !ignore.includes(t)) {
      missing.push(t);
    }
  });

  expect(missing).toEqual([]);
});

test('should generate expected prefix', () => {
  const { config } = plugin({ prefixCls: 'custom' });
  const classnames = Object.values(config?.theme?.extend ?? {}).flatMap((o) => Object.keys(o ?? {}));

  expect(classnames.every((c) => c.startsWith('custom-'))).toBe(true);
});

test('should generate expected screens', () => {
  const { config } = plugin({ screens: { screenXS: 100, screenLG: 200 } });
  const screens = config?.theme?.extend?.screens as Record<string, string>;

  expect(screens?.[`ant-${kebabCase('screenXS')}`]).toBe('100px');
  expect(screens?.[`ant-${kebabCase('screenLG')}`]).toBe('200px');
});
