export const isLoggedIn = () => {
  const auth = localStorage.getItem("moneymate_auth");
  return !!auth;
};

export const login = () => {
  localStorage.setItem(
    "moneymate_auth",
    JSON.stringify({ loggedIn: true })
  );
};

export const logout = () => {
  localStorage.removeItem("moneymate_auth");
};
