type Screen =
  | 'screenXS'
  | 'screenXSMin'
  | 'screenXSMax'
  | 'screenSM'
  | 'screenSMMin'
  | 'screenSMMax'
  | 'screenMD'
  | 'screenMDMin'
  | 'screenMDMax'
  | 'screenLG'
  | 'screenLGMin'
  | 'screenLGMax'
  | 'screenXL'
  | 'screenXLMin'
  | 'screenXLMax'
  | 'screenXXL'
  | 'screenXXLMin';

interface TailwindCSSAntDesignPluginOptions {
  prefixCls?: string;
  screens?: Partial<Record<Screen, number>>;
}

declare function plugin(options?: TailwindCSSAntDesignPluginOptions): {
  handle: () => void;
};

declare namespace plugin {
  const __isOptionsFunction: true;
}

export default plugin;
