type MagicEntry = { signature: (number | null)[]; mime: string };

// null = wildcard byte (skip check for that position)
const SIGNATURES: MagicEntry[] = [
  { signature: [0xff, 0xd8, 0xff], mime: "image/jpeg" },
  { signature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], mime: "image/png" },
  // RIFF????WEBP — bytes 4–7 are file size, hence null wildcards
  { signature: [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50], mime: "image/webp" },
  { signature: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], mime: "image/gif" }, // GIF87a
  { signature: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], mime: "image/gif" }, // GIF89a
];

export async function detectMimeType(file: File): Promise<string | null> {
  const buffer = await file.slice(0, 12).arrayBuffer();
  const bytes = new Uint8Array(buffer);

  for (const { signature, mime } of SIGNATURES) {
    if (signature.every((byte, i) => byte === null || bytes[i] === byte)) {
      return mime;
    }
  }

  return null;
}
