import plugin, { Config } from 'tailwindcss/plugin';
import { kebabCase, merge } from 'lodash';
import { theme } from 'antd';

const COLORS = ['red', 'volcano', 'orange', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple', 'magenta', 'pink'];
const STATUS_COLORS = ['success', 'primary', 'warning', 'error', 'info', 'white', 'highlight'];

const COLOR_REGEXP = new RegExp(`^(${COLORS.join('|')})(-\\d+)?$`);
const STATUS_COLOR_REGEXP = new RegExp(`^color(${STATUS_COLORS.join('|')})(active|hover)?$`, 'i');
const BORDER_COLOR_REGEXP = /(?=.*color)(?=.*(border|split))/i;
const TEXT_COLOR_REGEXP = /^(?!.*bg)(?=.*color).*(text|link|icon)/i;
const BG_COLOR_REGEXP = /^(?!.*border).*(bg|fill)/i;
const OUTLINE_COLOR_REGEXP = /^(?!.*(width|tmp)).*outline/i;

const MARGIN_REGEXP = /margin/i;
const BORDER_RADIUS_REGEXP = /borderRadius/i;
const PADDING_REGEXP = /padding/i;
const HEIGHT_REGEXP = /controlHeight/i;

const BOX_SHADOW_REGEXP = /boxShadow/i;
const FONT_SIZE_REGEXP = /fontSize/i;
const FONT_WEIGHT_REGEXP = /fontWeight/i;
const FONT_FAMILY_REGEXP = /fontFamily/i;
const LINE_HEIGHT_REGEXP = /lineHeight/i;
const LINE_WIDTH_REGEXP = /lineWidth/i;
const LINE_TYPE_REGEXP = /lineType/i;
const TEXT_DECORATION_REGEXP = /link.*decoration/i;
const OPACITY_REGEXP = /opacity/i;
const Z_INDEX_REGEXP = /zIndex/i;
const TRANSITION_TIME_FUNCTION_REGEXP = /motionEase/i;
const TRANSITION_DURATION_REGEXP = /motionDuration/i;
const SCREEN_REGEXP = /screen/i;

interface TailwindCSSAntDesignPluginOptions {
  prefixCls?: string;
  screens?: Partial<Record<string, number>>;
}

interface TokenMappingRule {
  pattern: RegExp;
  properties: string[];
  transform: (options: Record<'classname' | 'value' | 'token', string>) => string;
}

const createTokenMappingRules = (options?: TailwindCSSAntDesignPluginOptions): TokenMappingRule[] => {
  const { screens } = options ?? {};

  return [
    {
      pattern: COLOR_REGEXP,
      properties: ['colors'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: STATUS_COLOR_REGEXP,
      properties: ['colors'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: BORDER_COLOR_REGEXP,
      properties: ['borderColor'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: TEXT_COLOR_REGEXP,
      properties: ['textColor'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: BG_COLOR_REGEXP,
      properties: ['backgroundColor'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: OUTLINE_COLOR_REGEXP,
      properties: ['outlineColor'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: MARGIN_REGEXP,
      properties: ['margin'],
      transform: ({ classname, value }) => `var(--${classname}, ${value}px)`,
    },
    {
      pattern: BORDER_RADIUS_REGEXP,
      properties: ['borderRadius'],
      transform: ({ classname, value }) => `var(--${classname}, ${value}px)`,
    },
    {
      pattern: PADDING_REGEXP,
      properties: ['padding'],
      transform: ({ classname, value }) => `var(--${classname}, ${value}px)`,
    },
    {
      pattern: HEIGHT_REGEXP,
      properties: ['height'],
      transform: ({ classname, value }) => `var(--${classname}, ${value}px)`,
    },
    {
      pattern: BOX_SHADOW_REGEXP,
      properties: ['boxShadow'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: FONT_SIZE_REGEXP,
      properties: ['fontSize'],
      transform: ({ classname, value }) => `var(--${classname}, ${value}px)`,
    },
    {
      pattern: FONT_WEIGHT_REGEXP,
      properties: ['fontWeight'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: FONT_FAMILY_REGEXP,
      properties: ['fontFamily'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: LINE_HEIGHT_REGEXP,
      properties: ['lineHeight'],
      transform: ({ classname, value }) => `var(--${classname}, ${value}px)`,
    },
    {
      pattern: LINE_WIDTH_REGEXP,
      properties: ['borderWidth', 'outlineWidth'],
      transform: ({ classname, value }) => `var(--${classname}, ${value}px)`,
    },
    {
      pattern: LINE_TYPE_REGEXP,
      properties: ['borderStyle', 'outlineStyle'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: TEXT_DECORATION_REGEXP,
      properties: ['textDecoration'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: OPACITY_REGEXP,
      properties: ['opacity'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: Z_INDEX_REGEXP,
      properties: ['zIndex'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: TRANSITION_TIME_FUNCTION_REGEXP,
      properties: ['transitionTimeFunction'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: TRANSITION_DURATION_REGEXP,
      properties: ['transitionDuration'],
      transform: ({ classname, value }) => `var(--${classname}, ${value})`,
    },
    {
      pattern: SCREEN_REGEXP,
      properties: ['screens'],
      transform: ({ value, token }) => `${screens?.[token] ?? value}px`,
    },
  ];
};

export default plugin.withOptions<TailwindCSSAntDesignPluginOptions>(
  () => () => void 0,
  (options) => {
    const { prefixCls = 'ant' } = options ?? {};

    const globalToken = theme.getDesignToken();
    const tokenMappingRules = createTokenMappingRules(options);

    const config = {
      theme: {
        extend: {
          colors: {},
          borderColor: {},
          textColor: {},
          backgroundColor: {},
          outlineColor: {},
          outlineWidth: {},
          outlineStyle: {},
          margin: {},
          borderWidth: {},
          borderStyle: {},
          borderRadius: {},
          padding: {},
          height: {},
          fontSize: {},
          fontWeight: {},
          lineHeight: {},
          fontFamily: {},
          boxShadow: {},
          textDecoration: {},
          opacity: {},
          zIndex: {},
          transitionTimeFunction: {},
          transitionDuration: {},
          screens: {},
        },
      },
    } satisfies Config;

    for (const [token, value] of Object.entries(globalToken)) {
      const classname = `${prefixCls}-${kebabCase(token)}`;

      for (const rule of tokenMappingRules) {
        if (!rule.pattern.test(token)) {
          continue;
        }

        for (const property of rule.properties) {
          merge((config.theme.extend as any)[property], { [classname]: rule.transform({ classname, value, token }) });
        }
      }
    }

    return config;
  }
);
