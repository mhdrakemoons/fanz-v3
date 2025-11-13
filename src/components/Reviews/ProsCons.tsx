type ProsConsProps = {
  pros?: Array<{ title: string; description: string }>;
  cons?: Array<{ title: string; description: string }>;
};

export default function ProsCons({ pros, cons }: ProsConsProps) {
  if ((!pros || pros.length === 0) && (!cons || cons.length === 0)) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {/* Pros Section */}
      {pros && pros.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-[#4A236C] mb-4">What I Liked About It:</h3>
          <ul className="space-y-4">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <div>
                  <strong className="text-[#4A236C] font-semibold">{pro.title}:</strong>{' '}
                  <span className="text-[#4A236C]">{pro.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cons Section */}
      {cons && cons.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-[#4A236C] mb-4">What I Didn't Like:</h3>
          <ul className="space-y-4">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <div>
                  <strong className="text-[#4A236C] font-semibold">{con.title}:</strong>{' '}
                  <span className="text-[#4A236C]">{con.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

