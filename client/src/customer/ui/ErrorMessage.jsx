import { useRouteError, useNavigate } from "react-router-dom";
export default function ErrorMessage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      <h1>Something went wrong 😢</h1>
      <p style={{ color: "#7b3713" }}>{error.data || error.message}</p>
      <button
        onClick={() => navigate(-1)}
        className="btn btn__back"
        style={{ alignSelf: "start" }}
      >
        &larr; Go back
      </button>
    </div>
  );
}
