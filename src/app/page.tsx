import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/8e60682f-303b-44f6-8bdd-aadc4189247c-xxe3v5.jpeg",
  "https://utfs.io/f/b67245cd-627c-4776-ae1e-a9cc029e4c6d-1xb6v1.jpeg"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}))

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48 p-4">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
