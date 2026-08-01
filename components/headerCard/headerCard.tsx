export function HeaderCard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex font-Libertinus w-full my-3 rounded-md item-center justify-between bg-app-card">{children}</div>;
}
