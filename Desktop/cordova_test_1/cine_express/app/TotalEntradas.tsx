
import React from "react";
import { StyleSheet, Text, TextInput, View, Picker, Pressable, Switch } from "react-native";

type TicketType = "General" | "Estudiante" | "VIP";

const PRICES: Record<TicketType, number> = {
  General: 5,
  Estudiante: 3.5,
  VIP: 8,
};

export default function MathTotalScreen() {
  const [ticketType, setTicketType] = React.useState<TicketType>("General");
  const [qty, setQty] = React.useState("1");
  const [isWednesday, setIsWednesday] = React.useState(false);
  const [result, setResult] = React.useState({ subtotal: 0, discount: 0, total: 0 });

  const money = (n: number) => n.toFixed(2);

  const handleCalculate = () => {
    const quantity = Math.max(0, Number(qty || 0));
    const price = PRICES[ticketType];
    const subtotal = price * quantity;
    const discount = isWednesday ? subtotal * 0.15 : 0;
    const total = subtotal - discount;
    setResult({ subtotal, discount, total });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total de entradas</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Tipo de entrada</Text>
        <View style={styles.pickerBox}>
          <Picker selectedValue={ticketType} onValueChange={(v) => setTicketType(v as TicketType)}>
            <Picker.Item label="General" value="General" />
            <Picker.Item label="Estudiante" value="Estudiante" />
            <Picker.Item label="VIP" value="VIP" />
          </Picker>
        </View>

        <Text style={styles.label}>Cantidad de entradas</Text>
        <TextInput value={qty} onChangeText={setQty} keyboardType="numeric" style={styles.input} />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Día miércoles (-15%)</Text>
          <Switch value={isWednesday} onValueChange={setIsWednesday} />
        </View>

        <Pressable style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calcular</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.rline}>Subtotal:   ${money(result.subtotal)}</Text>
        <Text style={styles.rline}>Descuento:  -${money(result.discount)}</Text>
        <Text style={styles.total}>TOTAL:      ${money(result.total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  title: { fontSize: 22, fontWeight: "900" },
  subtitle: { marginTop: 4, color: "#555", fontWeight: "700" },
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
    marginTop: 12,
  },
  label: { marginTop: 8, color: "#666", fontWeight: "800" },
  pickerBox: {
    marginTop: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
    overflow: "hidden",
  },
  input: {
    marginTop: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
  },
  switchRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 14,
    backgroundColor: "#222",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "800" },
  rline: { fontWeight: "800", marginTop: 6 },
  total: { fontWeight: "900", marginTop: 10, fontSize: 18 },
});