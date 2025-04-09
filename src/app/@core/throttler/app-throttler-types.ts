import { ThrottlerOptions } from "@nestjs/throttler/dist/throttler-module-options.interface";

export const appThrottlerTypes: Array<ThrottlerOptions> = [
  {
    name: 'short',
    ttl: 1000,
    limit: 3,
  },
  {
    name: 'medium',
    ttl: 10000,
    limit: 20
  },
  {
    name: 'long',
    ttl: 60000,
    limit: 100
  }
];