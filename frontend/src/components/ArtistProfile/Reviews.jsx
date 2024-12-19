import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSubmitReview from "../../hooks/useReviewHook/useSubmitReview";
import "./styles/review.css";

const StarRating = ({ rating, onStarClick }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map((starIndex) => (
      <span
        key={starIndex}
        onClick={() => onStarClick(starIndex)}
        className={`star ${starIndex <= rating ? "selected" : ""}`}
      >
        ★
      </span>
    ))}
  </div>
);

const Reviews = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { submitReview, loading, error, success } = useSubmitReview();

  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    console.log("Extracted artistId:", artistId);
  }, [artistId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!artistId || !rating || !comment.trim()) {
      console.error("Artist ID, rating, or comment is missing");
      return;
    }

    try {
      await submitReview(artistId, rating, comment);
      setIsSubmitted(true);
      navigate(`/artist-profile/${artistId}`);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <div className="review-container">
      {!showForm ? (
        <button className="review-button" onClick={() => setShowForm(true)}>
          Leave a Review
        </button>
      ) : (
        <div className="review-form">
          <h2>Submit a Review</h2>
          {isSubmitted && (
            <p className="success-message">Review submitted successfully!</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="rating-section">
              <label htmlFor="rating">Rating (1-5):</label>
              <StarRating rating={rating} onStarClick={setRating} />
            </div>

            <div className="comment-section">
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                required
                className="comment-input"
              />
            </div>

            <button
              type="submit"
              disabled={!rating || !comment.trim() || loading}
              className="submit-button"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};
export default Reviews;
