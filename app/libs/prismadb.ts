import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
  })
}

const client = globalThis.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client
}

client.$connect()
  .then(() => {
    console.log('Database connection established')
  })
  .catch((error) => {
    console.error('Database connection failed:', error)
  })

export default client