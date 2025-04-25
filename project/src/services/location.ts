interface OverpassResult {
  lat: number;
  lon: number;
  display_name: string;
}

export const searchLocation = async (query: string): Promise<OverpassResult[]> => {
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&limit=5`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }
  
  return response.json();
};

export const getVenuesNearby = async (lat: number, lon: number, radius: number = 1000) => {
  const query = `
    [out:json][timeout:25];
    (
      node["leisure"="venue"](around:${radius},${lat},${lon});
      way["leisure"="venue"](around:${radius},${lat},${lon});
      relation["leisure"="venue"](around:${radius},${lat},${lon});
    );
    out body;
    >;
    out skel qt;
  `;

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query
  });

  if (!response.ok) {
    throw new Error('Failed to fetch venues');
  }

  return response.json();
};