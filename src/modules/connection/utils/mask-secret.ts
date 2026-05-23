export function maskSecret(uri: string): string {
  try {
    const url = new URL(uri);

    if (url.password) {
      url.password = "*".repeat(8);
    };

    return url.toString();
  } catch (err) {
    return "******";
  }
}