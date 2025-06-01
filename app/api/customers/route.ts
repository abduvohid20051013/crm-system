// app/api/customers/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/customers - get all customers
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load customers" }, { status: 500 });
  }
}

// POST /api/customers - create new customer
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, address, status } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
        status,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}

// PUT /api/customers - update customer
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, phone, address, status } = body;

    if (!id || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: { name, email, phone, address, status },
    });

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

// DELETE /api/customers?id=123 - delete customer
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing customer ID" }, { status: 400 });
    }

    await prisma.customer.delete({ where: { id } });
    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
