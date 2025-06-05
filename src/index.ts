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

export default plugin.withOptions<TailwindCSSAntDesignPluginOptions>(
  () => () => void 0,
  (options) => {
    const { prefixCls = 'ant', screens } = options ?? {};
    const globalToken = theme.getDesignToken();

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

      if (COLOR_REGEXP.test(token)) {
        merge(config.theme.extend.colors, { [classname]: `var(--${classname}, ${value})` });
      } else if (STATUS_COLOR_REGEXP.test(token)) {
        merge(config.theme.extend.colors, { [classname]: `var(--${classname}, ${value})` });
      } else if (BORDER_COLOR_REGEXP.test(token)) {
        merge(config.theme.extend.borderColor, { [classname]: `var(--${classname}, ${value})` });
      } else if (TEXT_COLOR_REGEXP.test(token)) {
        merge(config.theme.extend.textColor, { [classname]: `var(--${classname}, ${value})` });
      } else if (BG_COLOR_REGEXP.test(token)) {
        merge(config.theme.extend.backgroundColor, { [classname]: `var(--${classname}, ${value})` });
      } else if (OUTLINE_COLOR_REGEXP.test(token)) {
        merge(config.theme.extend.outlineColor, { [classname]: `var(--${classname}, ${value})` });
      } else if (MARGIN_REGEXP.test(token)) {
        merge(config.theme.extend.margin, { [classname]: `var(--${classname}, ${value}px)` });
      } else if (BORDER_RADIUS_REGEXP.test(token)) {
        merge(config.theme.extend.borderRadius, { [classname]: `var(--${classname}, ${value}px)` });
      } else if (PADDING_REGEXP.test(token)) {
        merge(config.theme.extend.padding, { [classname]: `var(--${classname}, ${value}px)` });
      } else if (HEIGHT_REGEXP.test(token)) {
        merge(config.theme.extend.height, { [classname]: `var(--${classname}, ${value}px)` });
      } else if (BOX_SHADOW_REGEXP.test(token)) {
        merge(config.theme.extend.boxShadow, { [classname]: `var(--${classname}, ${value})` });
      } else if (FONT_SIZE_REGEXP.test(token)) {
        merge(config.theme.extend.fontSize, { [classname]: `var(--${classname}, ${value}px)` });
      } else if (FONT_WEIGHT_REGEXP.test(token)) {
        merge(config.theme.extend.fontWeight, { [classname]: `var(--${classname}, ${value})` });
      } else if (FONT_FAMILY_REGEXP.test(token)) {
        merge(config.theme.extend.fontFamily, { [classname]: `var(--${classname}, ${value})` });
      } else if (LINE_HEIGHT_REGEXP.test(token)) {
        merge(config.theme.extend.lineHeight, { [classname]: `var(--${classname}, ${value})` });
      } else if (LINE_WIDTH_REGEXP.test(token)) {
        merge(config.theme.extend.borderWidth, { [classname]: `var(--${classname}, ${value}px)` });
        merge(config.theme.extend.outlineWidth, { [classname]: `var(--${classname}, ${value}px)` });
      } else if (LINE_TYPE_REGEXP.test(token)) {
        merge(config.theme.extend.borderStyle, { [classname]: `var(--${classname}, ${value})` });
        merge(config.theme.extend.outlineStyle, { [classname]: `var(--${classname}, ${value})` });
      } else if (TEXT_DECORATION_REGEXP.test(token)) {
        merge(config.theme.extend.textDecoration, { [classname]: `var(--${classname}, ${value})` });
      } else if (OPACITY_REGEXP.test(token)) {
        merge(config.theme.extend.opacity, { [classname]: `var(--${classname}, ${value})` });
      } else if (Z_INDEX_REGEXP.test(token)) {
        merge(config.theme.extend.zIndex, { [classname]: `var(--${classname}, ${value})` });
      } else if (TRANSITION_TIME_FUNCTION_REGEXP.test(token)) {
        merge(config.theme.extend.transitionTimeFunction, { [classname]: `var(--${classname}, ${value})` });
      } else if (TRANSITION_DURATION_REGEXP.test(token)) {
        merge(config.theme.extend.transitionDuration, { [classname]: `var(--${classname}, ${value})` });
      } else if (SCREEN_REGEXP.test(token)) {
        merge(config.theme.extend.screens, { [classname]: `${screens?.[token] ?? value}px` });
      }
    }

    return config;
  }
);
