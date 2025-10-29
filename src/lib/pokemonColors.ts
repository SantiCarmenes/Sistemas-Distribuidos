// src/lib/pokemonColors.ts

interface TypeStyle {
  backgroundColor: string;
  color: string;
}

export const typeStyles: { [key: string]: TypeStyle } = {
  normal:   { backgroundColor: 'rgba(201, 201, 142, 0.9)', color: '#FFFFFF' },
  fire:     { backgroundColor: 'rgba(235, 109, 20, 0.9)', color: '#FFFFFF' },
  water:    { backgroundColor: 'rgba(51, 101, 218, 0.9)', color: '#FFFFFF' },
  electric: { backgroundColor: 'rgba(247, 204, 32, 0.9)', color: '#000000' },
  grass:    { backgroundColor: 'rgba(102, 221, 42, 0.93)', color: '#FFFFFF' },
  ice:      { backgroundColor: 'rgba(102, 236, 236, 0.9)', color: '#000000' },
  fighting: { backgroundColor: 'rgba(138, 31, 26, 0.9)', color: '#FFFFFF' },
  poison:   { backgroundColor: 'rgba(107, 43, 107, 0.9)', color: '#FFFFFF' },
  ground:   { backgroundColor: 'rgba(151, 135, 89, 1)', color: '#000000' },
  flying:   { backgroundColor: 'rgba(142, 193, 228, 0.9)', color: '#FFFFFF' },
  psychic:  { backgroundColor: 'rgba(248, 78, 129, 0.9)', color: '#FFFFFF' },
  bug:      { backgroundColor: 'rgba(195, 212, 35, 0.9)', color: '#FFFFFF' },
  rock:     { backgroundColor: 'rgba(148, 126, 29, 1)', color: '#FFFFFF' },
  ghost:    { backgroundColor: 'rgba(123, 91, 175, 0.9)', color: '#FFFFFF' },
  dragon:   { backgroundColor: 'rgba(121, 64, 255, 0.9)', color: '#FFFFFF' },
  dark:     { backgroundColor: 'rgba(78, 65, 57, 0.94)', color: '#FFFFFF' },
  steel:    { backgroundColor: 'rgba(148, 148, 150, 0.94)', color: '#000000' },
  fairy:    { backgroundColor: 'rgba(252, 189, 203, 0.9)', color: '#000000' },
};

// default
export const defaultStyle: TypeStyle = {
    backgroundColor: 'rgba(67, 119, 104, 0.9)',
    color: '#FFFFFF',
};