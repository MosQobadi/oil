import "server-only";

export async function replaceCarRecommendations(_carId?: number, _input?: unknown) {
  throw new Error(
    "Car recommendations need to be reconnected to the new separate product tables.",
  );
}
