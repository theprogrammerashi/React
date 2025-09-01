// tiny demo store using localStorage
const KEY = "demo_users_v1";

export function saveUser(user) {
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  if (list.some(u => u.username.toLowerCase() === user.username.toLowerCase())) {
    throw new Error("Username is already taken.");
  }
  list.push(user);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function findUser(username, password) {
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  return list.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
}
