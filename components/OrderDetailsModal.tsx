import React from "react";

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  total?: number;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  notes?: string;
  createdAt: string;
  customer?: {
    name: string;
    email?: string;
  };
  items?: {
    product: {
      name: string;
      price: number;
    };
    quantity: number;
    total: number;
  }[];
};

type Props = {
  order: Order | null;
  onClose: () => void;
};

export default function OrderDetailsModal({ order, onClose }: Props) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-2xl w-full shadow-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Order #{order.orderNumber}</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Customer:</strong> {order.customer?.name || "—"}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Subtotal:</strong> {typeof order.subtotal === "number" ? `$${order.subtotal.toFixed(2)}` : "—"}</p>
          <p><strong>Tax:</strong> {typeof order.tax === "number" ? `$${order.tax.toFixed(2)}` : "—"}</p>
          <p><strong>Shipping:</strong> {typeof order.shipping === "number" ? `$${order.shipping.toFixed(2)}` : "—"}</p>
          <p><strong>Total:</strong> <span className="font-semibold">{typeof order.total === "number" ? `$${order.total.toFixed(2)}` : "—"}</span></p>
          {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>

        {order.items && order.items.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Items</h3>
            <ul className="space-y-2 text-sm">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b pb-1">
                  <span>{item.quantity}× {item.product.name}</span>
                  <span>{typeof item.total === "number" ? `$${item.total.toFixed(2)}` : "—"}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
