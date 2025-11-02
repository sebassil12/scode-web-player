import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
/** Estas son las interfaces, deben ir en /types, pero como
 * es un ejemplo sencillo las dejamos aquí.
 */
interface Pokemon {
  name: string;
  url: string;
}

interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

async function getPokemon(): Promise<Pokemon[]> {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Falló el fetch a la PokeAPI");
    }

    const data: PokeApiResponse = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function PokemonTable({ pokemonList }: { pokemonList: Pokemon[] }) {
  return (
    <Table className="max-w-md mx-auto shadow-lg rounded-lg">
      <TableCaption>Una lista de los primeros 20 Pokémon.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Nombre</TableHead>
          <TableHead>URL de la API</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokemonList.map((pokemon) => (
          <TableRow key={pokemon.name}>
            <TableCell className="font-medium capitalize">
              {pokemon.name}
            </TableCell>
            <TableCell>{pokemon.url}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function PokemonTestPage() {
  const pokemonData = await getPokemon();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Test de PokeAPI</h1>
      <PokemonTable pokemonList={pokemonData} />
    </main>
  );
}
