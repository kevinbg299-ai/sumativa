import React from 'react';
import { DarkTheme, ThemeProvider } from 'expo-router';
import AppTabs from '../components/app-tabs';
import { AidaProvider } from '../components/aida-context';

export default function RootLayout() {
  return (
    <AidaProvider>
      <ThemeProvider value={DarkTheme}>
        <AppTabs />
      </ThemeProvider>
    </AidaProvider>
  );
}