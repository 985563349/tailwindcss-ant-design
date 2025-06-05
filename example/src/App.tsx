import { useState } from 'react';
import { ConfigProvider, App, ColorPicker, Button, Space, Input, Divider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

export default function () {
  const [colorPrimary, setColorPrimary] = useState('#1677ff');

  return (
    <main className="p-ant-padding">
      <section>
        <h3 className="mb-ant-margin-sm text-ant-font-size-heading-3">Customize Theme</h3>
        <StyleProvider layer>
          <ConfigProvider
            theme={{
              token: { colorPrimary },
              cssVar: true,
            }}
          >
            <App>
              <ColorPicker showText value={colorPrimary} onChange={(color) => setColorPrimary(color.toHexString())} />
              <Divider />
              <Space>
                <Input placeholder="Please Input" />
                <Button type="primary">Submit</Button>
              </Space>
              <Divider />
              <p className="text-ant-font-size-xl text-ant-color-primary">Automatically follows theme color</p>
            </App>
            <Divider />
            <p className="text-ant-font-size-xl text-ant-color-primary">Does not automatically follow theme color</p>
          </ConfigProvider>
        </StyleProvider>
      </section>
    </main>
  );
}
