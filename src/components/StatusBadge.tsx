export const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    Pending: "secondary",
    Signed: "warning",
    Active: "success",
    Revoked: "danger",
  };

  return <span className={`badge bg-${colors[status]}`}>{status}</span>;
};
