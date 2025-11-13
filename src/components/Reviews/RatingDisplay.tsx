import React from 'react';

type RatingDisplayProps = {
  rating: number;
  ratings?: Record<string, number | undefined>;
  variant?: 'full' | 'compact';
};

function getRatingLabel(rating: number): { label: string; color: string } {
  if (rating >= 4.5) return { label: 'Excellent', color: 'text-green-600' };
  if (rating >= 4.0) return { label: 'Very Good', color: 'text-green-600' };
  if (rating >= 3.5) return { label: 'Good', color: 'text-green-500' };
  if (rating >= 3.0) return { label: 'Fair', color: 'text-yellow-600' };
  if (rating >= 2.5) return { label: 'Below Average', color: 'text-orange-600' };
  return { label: 'Poor', color: 'text-red-600' };
}

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const starSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const uniqueId = `half-star-${rating}-${fullStars}-${emptyStars}`;

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className={`${starSize} text-yellow-400 fill-current`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          className={`${starSize} fill-current`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            fill={`url(#${uniqueId})`}
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className={`${starSize} text-gray-300 fill-current`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

function formatRatingKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

export default function RatingDisplay({ rating, ratings, variant = 'full' }: RatingDisplayProps) {
  const { label, color } = getRatingLabel(rating);

  if (variant === 'compact') {
    return (
      <div className="space-y-4">
        {/* Overall Rating - Compact */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <StarRating rating={rating} size="md" />
            <div className="flex items-baseline gap-1">
              <span className="text-[#4A236C] font-bold text-xl">{rating.toFixed(1)}</span>
              <span className="text-[#4A236C] text-sm">/ 5.0</span>
            </div>
          </div>
          <span className={`text-sm font-semibold ${color}`}>{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Overall Rating</h3>
          <span className={`text-lg font-bold ${color}`}>{label}</span>
        </div>
        <div className="flex items-center gap-4">
          <StarRating rating={rating} />
          <span className="text-2xl font-bold text-gray-900">{rating.toFixed(1)}</span>
          <span className="text-gray-500">/ 5.0</span>
        </div>
      </div>

      {/* Rating Breakdown */}
      {ratings && Object.keys(ratings).length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Rating Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(ratings).map(([key, value]) => {
              if (value === undefined) return null;
              const { label: itemLabel, color: itemColor } = getRatingLabel(value);
              return (
                <div key={key} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {formatRatingKey(key)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${itemColor}`}>{itemLabel}</span>
                        <span className="text-sm font-bold text-gray-900">{value.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          value >= 4.0
                            ? 'bg-green-500'
                            : value >= 3.0
                            ? 'bg-yellow-500'
                            : 'bg-orange-500'
                        }`}
                        style={{ width: `${(value / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
