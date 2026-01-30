import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { SearchResult } from "../src/api/carteleraApi";
import { searchShows } from "../src/api/carteleraApi";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/210x295?text=No+Image";

export default function CarteleraScreen() {
  const [query, setQuery] = React.useState("batman");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  const fetchShows = React.useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setHasSearched(true);
      return;
    }

    setLoading(true);
    try {
      const data = await searchShows(trimmed);
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  }, [query]);

  React.useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  const renderItem = ({ item }: { item: SearchResult }) => {
    const imageUrl = item.show.image?.medium || PLACEHOLDER_IMAGE;
    const rating = item.show.rating?.average;
    const genres = item.show.genres?.filter(Boolean) ?? [];

    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.poster} />
        <View style={styles.cardBody}>
          <Text style={styles.name}>{item.show.name}</Text>
          {rating != null && <Text style={styles.meta}>Rating: {rating}</Text>}
          {genres.length > 0 && <Text style={styles.meta}>Género: {genres.join(", ")}</Text>}
          {rating == null && genres.length === 0 && <Text style={styles.meta}>Sin rating ni género</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cartelera</Text>

      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar (batman, avengers, harry)"
          style={styles.input}
          autoCapitalize="none"
        />
        <Pressable style={styles.button} onPress={fetchShows}>
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.show.id)}
          renderItem={renderItem}
          contentContainerStyle={results.length === 0 ? styles.emptyContainer : styles.listContainer}
          ListEmptyComponent={
            hasSearched ? <Text style={styles.emptyText}>No hay resultados</Text> : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  title: { fontSize: 22, fontWeight: "900" },
  searchRow: { marginTop: 12, gap: 10 },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "800" },
  listContainer: { paddingVertical: 12, gap: 12 },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
    padding: 12,
    flexDirection: "row",
    gap: 12,
  },
  poster: { width: 90, height: 130, borderRadius: 10, backgroundColor: "#e9e9e9" },
  cardBody: { flex: 1, gap: 6 },
  name: { fontWeight: "900", fontSize: 16 },
  meta: { color: "#555", fontWeight: "700" },
  centerBox: { marginTop: 24, alignItems: "center", gap: 8 },
  loadingText: { color: "#555", fontWeight: "700" },
  emptyContainer: { flexGrow: 1, justifyContent: "center" },
  emptyText: { textAlign: "center", color: "#666", fontWeight: "700" },
});
