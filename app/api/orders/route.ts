import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET /api/orders - Получение всех заказов
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[ORDERS_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}

// ✅ POST /api/orders - Создание нового заказа
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerId, userId, items = [], notes, subtotal, tax, shipping, status = "PENDING" } = body;

    if (!customerId || subtotal == null || tax == null || shipping == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const total = subtotal + tax + shipping;
    const orderNumber = `ORD-${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        customerId,
        userId,
        orderNumber,
        status,
        subtotal,
        tax,
        shipping,
        total,
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDERS_POST_ERROR]", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// ✅ PUT /api/orders - Обновление заказа
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, customerId, subtotal, tax, shipping, notes, status } = body;

    if (!id || !customerId || subtotal == null || tax == null || shipping == null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const total = subtotal + tax + shipping;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        customerId,
        subtotal,
        tax,
        shipping,
        total,
        notes,
        status,
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("[ORDERS_PUT_ERROR]", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// ✅ DELETE /api/orders?id=...
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.orderItem.deleteMany({ where: { orderId: id } }); // удалить связанные товары
    await prisma.order.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ORDERS_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
