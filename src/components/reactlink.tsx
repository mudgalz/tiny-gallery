import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
}

export default function ReactLink({
  to,
  href,
  className,
  ...rest
}: LinkProps & { className?: string }) {
  const classNames = cn(
    "text-gray-600 text-base px-2 py-1 rounded hover:bg-gray-100 transition-all",
    className
  );
  if (to) {
    return <Link to={to} className={classNames} {...rest} />;
  }
  return <a href={href} className={classNames} {...rest} />;
}
