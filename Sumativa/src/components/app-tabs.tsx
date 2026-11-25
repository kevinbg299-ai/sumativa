import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '../constants/theme';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.muted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: () => null,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Control',
          tabBarIcon: () => null,
        }}
      />

      <Tabs.Screen
        name="alertas"
        options={{
          title: 'Alertas',
          tabBarIcon: () => null,
        }}
      />

      <Tabs.Screen
        name="configuracion"
        options={{
          title: 'Ajustes',
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}