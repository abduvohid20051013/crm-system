"use client";

import { useEffect, useState } from "react";
import OrderDetailsModal from "@/components/OrderDetailsModal";

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  total?: number;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  notes?: string;
  customerId: string;
  createdAt: string;
  customer?: {
    name: string;
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

type Customer = {
  id: string;
  name: string;
};

const defaultForm = {
  customerId: "",
  subtotal: 0,
  tax: 0,
  shipping: 0,
  status: "PENDING",
  notes: "",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
    loadCustomers();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  const loadCustomers = async () => {
    const res = await fetch("/api/customers");
    const data = await res.json();
    setCustomers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = {
      ...form,
      total: Number(form.subtotal) + Number(form.tax) + Number(form.shipping),
      items: [],
      ...(editId && { id: editId }),
    };
    const res = await fetch("/api/orders", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      loadOrders();
      setForm(defaultForm);
      setEditId(null);
    }
  };

  const handleEdit = (order: Order) => {
    setForm({
      customerId: order.customerId ?? "",
      subtotal: typeof order.subtotal === "number" ? order.subtotal : 0,
      tax: typeof order.tax === "number" ? order.tax : 0,
      shipping: typeof order.shipping === "number" ? order.shipping : 0,
      status: order.status ?? "PENDING",
      notes: order.notes ?? "",
    });
    setEditId(order.id);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/orders?id=${id}`, { method: "DELETE" });
    loadOrders();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Orders</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3 max-w-xl">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer</label>
        <select
          value={form.customerId}
          onChange={(e) => setForm({ ...form, customerId: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-100"
        >
          <option value="">👤 Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subtotal (💵 без налогов)</label>
        <input
          type="number"
          placeholder="Enter subtotal amount"
          value={form.subtotal}
          onChange={(e) => setForm({ ...form, subtotal: Number(e.target.value) })}
          required
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-100"
        />

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tax (📊 налог)</label>
        <input
          type="number"
          placeholder="Enter tax amount"
          value={form.tax}
          onChange={(e) => setForm({ ...form, tax: Number(e.target.value) })}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-100"
        />

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Shipping (🚚 доставка)</label>
        <input
          type="number"
          placeholder="Enter shipping cost"
          value={form.shipping}
          onChange={(e) => setForm({ ...form, shipping: Number(e.target.value) })}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-100"
        />

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-100"
        >
          <option value="PENDING">🕒 Pending</option>
          <option value="PROCESSING">⚙️ Processing</option>
          <option value="SHIPPED">🚚 Shipped</option>
          <option value="DELIVERED">✅ Delivered</option>
          <option value="CANCELLED">❌ Cancelled</option>
          <option value="REFUNDED">💸 Refunded</option>
        </select>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
        <textarea
          placeholder="📝 Optional notes"
          value={form.notes || ""}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-100"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {editId ? "Update Order" : "Add Order"}
        </button>
      </form>

      <div className="overflow-auto rounded-lg shadow border dark:border-gray-700">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-200">
              <th className="p-3">Order #</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-3 text-center">Loading...</td></tr>
            ) : orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3">{o.orderNumber}</td>
                  <td className="p-3">{o.customer?.name || "—"}</td>
                  <td className="p-3">{typeof o.total === "number" ? `$${o.total.toFixed(2)}` : "—"}</td>
                  <td className="p-3">{o.status}</td>
                  <td className="p-3">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => handleEdit(o)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                    <button onClick={() => handleDelete(o.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                    <button onClick={() => setSelectedOrder(o)} className="px-2 py-1 bg-indigo-600 text-white rounded">Подробнее</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6} className="p-3 text-center">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
