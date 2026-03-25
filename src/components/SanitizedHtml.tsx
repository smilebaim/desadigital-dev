'use client';

import React, { useEffect, useState } from 'react';

export default function SanitizedHtml({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const [sanitized, setSanitized] = useState('');

  useEffect(() => {
    let cancelled = false;

    // Import DOMPurify only on the client to avoid SSR window/document issues.
    import('dompurify').then((mod) => {
      const DOMPurify = mod.default;
      if (cancelled) return;
      setSanitized(DOMPurify.sanitize(html));
    });

    return () => {
      cancelled = true;
    };
  }, [html]);

  return (
    <div
      className={className}
      // Content comes from Firestore custom_pages; sanitize to prevent XSS.
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

