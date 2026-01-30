import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "@/components/MenuButton";

export default function MenuScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cine Express</Text>

      <View style={{ gap: 12, marginTop: 14 }}>
        <MenuButton
          title="Cartelera (API + fotos)"

          onPress={() => router.push("/Cartelera")}
        />

        <MenuButton
          title="Combo Snacks"
          onPress={() => router.push("/ComboSnacks")}
        />

        <MenuButton
          title="Total Entradas"
          onPress={() => router.push("/TotalEntradas")}
        />
      </View>

      <Text style={styles.note}>
        Tip: Cada pantalla practica estado, inputs y cálculos simples.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  title: { fontSize: 24, fontWeight: "900" },
  subtitle: { marginTop: 4, color: "#555", fontWeight: "700" },
  note: { marginTop: 18, color: "#1976d2", fontWeight: "800" },
});