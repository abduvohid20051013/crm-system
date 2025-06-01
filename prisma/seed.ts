import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
        address: "123 Main St, New York, NY 10001",
        status: "ACTIVE",
        totalSpent: 2450.0,
      },
    }),
    prisma.customer.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 234 567 8901",
        address: "456 Oak Ave, Los Angeles, CA 90210",
        status: "ACTIVE",
        totalSpent: 1230.0,
      },
    }),
    // Add more customers...
  ])

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        stock: 45,
        category: "Electronics",
        status: "ACTIVE",
        sku: "WH-001",
        imageUrl: "/placeholder.svg?height=200&width=200",
      },
    }),
    prisma.product.create({
      data: {
        name: "Smart Watch",
        description: "Feature-rich smartwatch with health monitoring",
        price: 299.99,
        stock: 23,
        category: "Electronics",
        status: "ACTIVE",
        sku: "SW-001",
        imageUrl: "/placeholder.svg?height=200&width=200",
      },
    }),
    // Add more products...
  ])

  // Create orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: "ORD-001",
        status: "DELIVERED",
        subtotal: 199.99,
        tax: 20.0,
        shipping: 10.0,
        total: 229.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              price: 199.99,
              total: 199.99,
              productId: products[0].id,
            },
          ],
        },
      },
    }),
    // Add more orders...
  ])

  console.log("✅ Database seeded successfully!")
  console.log(`Created ${customers.length} customers`)
  console.log(`Created ${products.length} products`)
  console.log(`Created ${orders.length} orders`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
