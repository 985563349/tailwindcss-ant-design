# tailwindcss-ant-design

Convert [ant design token](https://ant.design/docs/react/customize-theme#design-token) to Tailwind CSS classes.

How to use tailwindcss in ant design? You can refer to this [example](https://github.com/985563349/tailwindcss-ant-design/tree/main/example).

## Installation

Install the plugin from npm:

```shell
npm install -D tailwindcss-ant-design
```

Then add the plugin to your main `style.css` file:

```css
@import 'tailwindcss';
@plugin 'tailwindcss-ant-design';
```

## Basic usage

Now, you can use the `ant` classes to add appropriate styles to your components:

```jsx
<div className="bg-ant-color-primary p-ant-padding rounded-ant-border-radius text-ant-color-white">Custom Component</div>
```

This plugin converts almost all tokens into usable classes.

## Custom Theme

The `ant` classes can adapt to the ant design theme you configure, but it requires you to set cssVar to true and wrap the content in an app component.

```jsx
<ConfigProvider
  theme={{
    token: { colorPrimary: '#00b96b' },
    // cssVar: true, // 🔔 antd v5 enable css variable to follow theme color
  }}
>
  <App>
    <p className="text-ant-font-size-xl text-ant-color-primary">Automatically follows theme color</p>
  </App>
</ConfigProvider>
```
