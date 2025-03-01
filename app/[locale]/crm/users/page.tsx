import { UsersPageComponent } from "@/components/crm/Users";

const users = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    avatarUrl: `https://i.pravatar.cc/50?img=${index + 1}`,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `+1 555-012${index.toString().padStart(2, "0")}`,
    city: index % 2 === 0 ? "New York" : "Los Angeles",
    role: index % 2 === 0 ? "Admin" : "User",
    status: index % 3 === 0 ? "Active" : "Inactive",
    registrationDate: new Date(
        2024,
        index % 12,
        (index % 28) + 1,
    ).toLocaleDateString(),
    lastLogin: new Date(2024, index % 2, (index % 28) + 1).toLocaleDateString(),
}));

const Users = () => {
    return <UsersPageComponent users={users} />;
};

export default Users;
