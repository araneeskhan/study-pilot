import crypto from "crypto";

// Generate a random token and its hashed version for email verification/password reset
export function generateTokenWithExpiry(hours: number = 24): {
  token: string;
  hashedToken: string;
  expiresAt: Date;
} {
  // Generate random token
  const token = crypto.randomBytes(32).toString("hex");
  
  // Hash the token for storage
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
  // Calculate expiry time
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);
  
  return {
    token,
    hashedToken,
    expiresAt,
  };
}

// Verify a token against its hashed version
export function verifyTokenAgainstHash(token: string, hashedToken: string): boolean {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return tokenHash === hashedToken;
}

// Check if a token has expired
export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}