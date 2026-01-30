import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menú" }} />
      <Stack.Screen name="Cartelera" options={{ title: "Cartelera" }} />
      <Stack.Screen name="ComboSnacks" options={{ title: "Combo Snacks" }} />
      <Stack.Screen name="TotalEntradas" options={{ title: "Total Entradas" }} />
    </Stack>
  );
}