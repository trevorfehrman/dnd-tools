import React from 'react';
import { CSSReset, ThemeProvider, theme } from '@chakra-ui/core';

import { Initiative } from './components/initiative/Initiative';

// Use at the root of your app

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App({ children }: any) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        {children}
        <CSSReset />
        <Initiative />
      </ThemeProvider>
    </div>
  );
}

export default App;
