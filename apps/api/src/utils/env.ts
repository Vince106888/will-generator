export function validateEnv(): void {
  const required = ["DATABASE_URL"] as const;

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required env variable: ${key}`);
    }
  }
}
