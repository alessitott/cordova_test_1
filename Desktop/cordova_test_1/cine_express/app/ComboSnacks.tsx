
    // Título: “Combo snacks”.
    // Inputs:
    //     Popcorn ($2.50) cantidad
    //     Bebida ($1.75) cantidad
    //     Nachos ($3.00) cantidad
    // Switch: “Cliente frecuente (-10% snacks)”.
    // Botón “Calcular total”.
    // Zona de resultado: subtotal, descuento, total.

	

    // Subtotal = (pop*2.50) + (beb*1.75) + (nach*3.00)
    // Si cliente frecuente: descuento = subtotal * 0.10
    // Total = subtotal - descuento
    // Validar que las cantidades no sean negativas.
import React from "react";         
import { StyleSheet, Text, TextInput, View, Switch, Pressable } from "react-native";
export default function ComboSnacksScreen() {
  const [popcornQty, setPopcornQty] = React.useState("0");
  const [drinkQty, setDrinkQty] = React.useState("0");
  const [nachosQty, setNachosQty] = React.useState("0");
  const [isFrequentCustomer, setIsFrequentCustomer] = React.useState(false);
  const [result, setResult] = React.useState({ subtotal: 0, discount: 0, total: 0 });   
    const money = (n: number) => n.toFixed(2);
    const handleCalculate = () => {
    const popcorn = Math.max(0, Number(popcornQty || 0));
    const drink = Math.max(0, Number(drinkQty || 0));
    const nachos = Math.max(0, Number(nachosQty || 0));
    const subtotal = popcorn * 2.5 + drink * 1.75 + nachos * 3.0;
    const discount = isFrequentCustomer ? subtotal * 0.1 : 0;
    const total = subtotal - discount;
    setResult({ subtotal, discount, total });
  };
    return (    
    <View style={styles.container}>
      <Text style={styles.title}>Combo Snacks</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Palomitas ($2.50) cantidad</Text>
        <TextInput
            value={popcornQty}  
            onChangeText={setPopcornQty}
            keyboardType="numeric"
            style={styles.input}
        />
        <Text style={styles.label}>Bebida ($1.75) cantidad</Text>
        <TextInput
            value={drinkQty}
            onChangeText={setDrinkQty}
            keyboardType="numeric"
            style={styles.input}
        />
        <Text style={styles.label}>Nachos ($3.00) cantidad</Text>   
        <TextInput
            value={nachosQty}
            onChangeText={setNachosQty}
            keyboardType="numeric"
            style={styles.input}
        />
        <View style={styles.switchRow}>
          <Text style={styles.label}>Cliente frecuente (-10% snacks)</Text>
          <Switch
            value={isFrequentCustomer}
            onValueChange={setIsFrequentCustomer}
          />
        </View>
        <Pressable style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Calcular total</Text>   
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
  title: { fontSize: 24, fontWeight: "900" },   
    card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginTop: 16,  
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
  },            
    label: { marginTop: 8, color: "#666", fontWeight: "800" },
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
    rline: { marginTop: 6, fontWeight: "600" },
    total: { marginTop: 12, fontWeight: "900", fontSize: 16 },
}); 