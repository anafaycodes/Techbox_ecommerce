import { Link } from "react-router-dom";

export default function Button({
  children, to, href, onClick,
  variant = "primary", size = "md", type = "button",
  disabled = false, full = false, ...rest
}) {
  const cls = `tb-btn tb-btn--${variant} tb-btn--${size} ${full ? "tb-btn--full" : ""}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
