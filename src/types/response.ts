export interface PokemonDetail {
  height: number;
  name: string;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}
type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Sprites = {
  front_default: string;
  back_default: string;
};

export const isValidRes = (pokemon: any): pokemon is PokemonDetail => {
  return (
    typeof pokemon.pokeName === "string" &&
    typeof pokemon.sprites.front_default === "string"
  );
};
