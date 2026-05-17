interface JsonLdProps {
  data: Record<string, unknown>;
}

// dangerouslySetInnerHTML is intentional here: JSON-LD requires inline script injection.
// Data is always internal (translations + product definitions), never user input.
// </script> is escaped via < to prevent tag breakout.
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
