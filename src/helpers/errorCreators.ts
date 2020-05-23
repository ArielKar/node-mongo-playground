declare global {
  interface StatusedError {
    error: Error;
    status: number;
  }
}

export function createStatusedError(message: string, status: number): StatusedError {
  return {
    error: new Error(message),
    status,
  };
}
