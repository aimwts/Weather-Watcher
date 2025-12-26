import { z } from 'zod';
import { weatherSchema } from './schema';

export const api = {
  weather: {
    get: {
      method: 'GET' as const,
      path: '/api/weather/:city',
      responses: {
        200: weatherSchema,
        404: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
