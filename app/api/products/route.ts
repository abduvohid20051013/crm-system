// app/api/products/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/products - get all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

// POST /api/products - create new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, stock, category, status, imageUrl, sku } = body;

    if (!name || !price || !category || !sku) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        category,
        status,
        imageUrl,
        sku,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// PUT /api/products - update product
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, price, stock, category, status, imageUrl, sku } = body;

    if (!id || !name || !price || !category || !sku) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        category,
        status,
        imageUrl,
        sku,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/products?id=123 - delete product
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
