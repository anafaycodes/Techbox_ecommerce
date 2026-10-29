import { Link } from "react-router-dom";
export default function Placeholder({ title, description }) {
  return (
    <div className="tb-placeholder">
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to="/" className="tb-btn tb-btn--outline tb-btn--md">Back to home</Link>
    </div>
  );
}
