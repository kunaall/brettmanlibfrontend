const UserApi = {
  borrowBook: async (isbn, userId) => {
    const res = await fetch("https://brettmanlibraryserver.vercel.app/v1/user/borrow", {
      method: "POST",
      body: JSON.stringify({ isbn, userId }),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  returnBook: async (isbn, userId) => {
    const res = await fetch("https://brettmanlibraryserver.vercel.app/v1/user/return", {
      method: "POST",
      body: JSON.stringify({ isbn, userId }),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  getBorrowBook: async (username) => {
    const res = await fetch("https://brettmanlibraryserver.vercel.app/v1/user/borrowed-books", {
      method: "POST",
      body: JSON.stringify({
     username }),
     headers: { "Content-Type": "application/json" }
     })
    return res.json()
  },

  register: async (username, password,checked) => {
    const res = await fetch("https://brettmanlibraryserver.vercel.app/v1/user/register", {
      method: "POST",
      body: JSON.stringify({ username, password,checked }),
      headers: { "Content-Type": "application/json" }
    })
    return res.json()
  },
  login: async (username, password) => {
    const res = await fetch("https://brettmanlibraryserver.vercel.app/v1/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" }
    })
    return res.json()
  },
  getProfile: async (username) => {
    const res = await fetch("https://brettmanlibraryserver.vercel.app/v1/user/profile",{
       method: "POST",
       body: JSON.stringify({
      username }),
      headers: { "Content-Type": "application/json" }
      })
    return res.json()
  },
 
}
export default UserApi;