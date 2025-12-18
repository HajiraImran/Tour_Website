// src/api/admin.js
export async function registerAdmin(data) {
  const res = await fetch("http://localhost:5000/api/admin/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Registration failed");
  return result; // { token, name, email }
}

export async function loginAdmin(data) {
  const res = await fetch("http://localhost:5000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Login failed");
  return result;
}
