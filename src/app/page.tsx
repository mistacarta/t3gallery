import { SignedIn, SignedOut } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import Link from "next/link";
import { extractRouterConfig } from "uploadthing/server";
import { db } from "~/server/db";
import { ourFileRouter } from "./api/uploadthing/core";

export const dynamic = "force-dynamic"
const mockUrls = [
  "https://utfs.io/f/8e60682f-303b-44f6-8bdd-aadc4189247c-xxe3v5.jpeg",
  "https://utfs.io/f/b67245cd-627c-4776-ae1e-a9cc029e4c6d-1xb6v1.jpeg"
]

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id)
  })
  return (
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={image.id + '-' + index} className="w-48 p-4">
            <img src={image.url} alt={image.name} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
  )
}

export default async function HomePage() {
  
  return (
    <main className="">
      <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
      <SignedOut>
        <div className="h-full w-full text-2xl">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
