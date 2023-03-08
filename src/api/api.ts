export interface Circle {
  id: string;
  x: string;
  y: string;
  radius: string;
}


export async function fetchShortestPath(apiUrl: string | null, startId: string | null, endId: string | null, circles: Circle[]): Promise<string[]> {
  if (startId && endId) {
    try {
      const response = await fetch(`${apiUrl}/get_shortest_path_by_id?start_id=${startId}&end_id=${endId}`);
      const shortestPath = await response.json();
      const circleIds = shortestPath['stations'].map((station: any) => {
        const matchingCircle = circles.find((circle) => circle.id === station.id);
        return matchingCircle ? matchingCircle.id : null;
      }) as string[];
      return circleIds.filter((id) => id !== null);
    } catch (error) {
      console.error(error);
      return [];
    }
  } else {
    return [];
  }
}
