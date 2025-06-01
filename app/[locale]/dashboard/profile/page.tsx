// app/dashboard/profile/page.tsx

export default function ProfilePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2 max-w-md">
        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
        <p className="text-lg font-medium text-gray-900 dark:text-white">John Doe</p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Email</p>
        <p className="text-lg font-medium text-gray-900 dark:text-white">john@example.com</p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Role</p>
        <p className="text-lg font-medium text-gray-900 dark:text-white">Administrator</p>
      </div>
    </div>
  );
}
