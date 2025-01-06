import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSubmitReview from "../../hooks/useReviewHook/useSubmitReview";
import "./styles/review.css";
import { H2 } from "./styles/StyledComponents";
import { ImCross } from "react-icons/im";

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

const Reviews = ({ artist }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { submitReview, loading, error, success } = useSubmitReview();

  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pagination state
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitReview(id, rating, comment);
      setIsSubmitted(true);
      setRating(0);
      setComment("");
      navigate(`/artist-profile/${id}`);
    } catch (err) {
      setIsSubmitted(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3); // Load 4 more reviews
  };

  return (
    <>
      <div className="review-box">
        <div className="review-container">
          <H2>REVIEWS</H2>
          {!showForm ? (
            <button className="review-button" onClick={() => setShowForm(true)}>
              Leave a Review
            </button>
          ) : (
            <div className="review-form">
              <h2>Submit a Review</h2>
              <div
                onClick={() => {
                  setShowForm(!showForm);
                }}
                className="review-cancel"
              >
                <ImCross size={15} />
              </div>
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
                {success && (
                  <p className="success-message">
                    Review submitted successfully!
                  </p>
                )}
                {error && <p className="error-message">{error}</p>}

                <button
                  type="submit"
                  disabled={!rating || !comment.trim() || loading}
                  className="submit-button"
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          )}
        </div>
        {artist.reviews && artist.reviews.length > 0 ? (
          artist.reviews.slice(0, visibleReviews).map((rev, index) => (
            <div key={index} className="review-item">
              <div className="review-content">
                <div className="prof-info">
                  <img
                    src={rev.customer.profileImage}
                    alt="customer-profileImage"
                    className="customer-profileImage"
                  />
                  <div className="rev-content">
                    <h4>{rev.customer.firstName}</h4>
                    <div className="rating">
                      <StarRating rating={rev.rating} onStarClick={() => {}} />
                      <span>
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="rev-comment">{rev.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Load More Button */}
      {visibleReviews < artist.reviews.length && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More..
        </button>
      )}
    </>
  );
};
export default Reviews;
