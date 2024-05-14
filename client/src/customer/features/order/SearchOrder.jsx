import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchOrder.module.css";
function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit} className={styles.search__form}>
      <input
        placeholder="Search Order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.search}
      />
    </form>
  );
}

export default SearchOrder;
