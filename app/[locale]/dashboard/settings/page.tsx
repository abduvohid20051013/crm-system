"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Guli Textile Co.");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState("system");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>

      {/* Company Name */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2">
        <label className="block text-sm text-gray-600 dark:text-gray-300 font-medium">
          Company Name
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        />
      </div>

      {/* Email Notifications */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center justify-between">
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Enable Email Notifications
        </span>
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
          className="h-5 w-5"
        />
      </div>

      {/* Theme Selection */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <label className="block text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">
          Theme
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
}
