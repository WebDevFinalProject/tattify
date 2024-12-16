import React, { useState } from "react";
import { H2 } from "./styles/StyledComponents";
import useSubmitReview from "../../hooks/useReviewHook/useSubmitReview";

function Reviews({ artistId }) {
  const { submitReview, loading, error, success } = useSubmitReview();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      alert("Please provide both rating and comment.");
      return;
    }

    await submitReview(artistId, rating, comment);
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (1-5)"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Review submitted successfully!</p>
      )}
    </div>
  );
}

export default Reviews;
