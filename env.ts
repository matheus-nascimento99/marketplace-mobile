import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_NODE_ENV: z
    .enum(['development', 'production', 'test'], {
      message:
        'Por favor, forneça um valor entre os aceitos: "development", "production", ou "test"',
    })
    .default('production'),
  EXPO_PUBLIC_API_URL: z
    .string()
    .min(1, 'Por favor, forneça a url da api')
    .url('Por favor, forneça a url da api no formato correto'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(_env.error.flatten().fieldErrors)

  throw new Error('Invalid environment variables')
}

export const env = _env.data
