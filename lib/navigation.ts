export function normalizePath(pathname: string) {
  if (!pathname) return "/";
  const stripped = pathname.replace(/\/$/, "");
  return stripped === "" ? "/" : stripped;
}

export function backHrefFor(pathname: string) {
  const parts = normalizePath(pathname).split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  return `/${parts.slice(0, -1).join("/")}`;
}
