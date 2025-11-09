import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import { notFound, redirect } from "next/navigation";
import { Header } from "../components/header";

type SearchPageProperties = {
  searchParams: Promise<{
    q: string;
  }>;
};

export const generateMetadata = async ({
  searchParams,
}: SearchPageProperties) => {
  const { q } = await searchParams;

  return {
    title: `${q} - Search results`,
    description: `Search results for ${q}`,
  };
};

const SearchPage = async ({ searchParams }: SearchPageProperties) => {
  const { q } = await searchParams;
  const { userId, orgId } = await auth();

  if (!userId) {
    notFound();
  }

  if (!q) {
    redirect("/");
  }

  const links = await database.link.findMany({
    where: {
      AND: [
        { userId },
        {
          OR: [
            { slug: { contains: q, mode: "insensitive" } },
            { destination: { contains: q, mode: "insensitive" } },
            { title: { contains: q, mode: "insensitive" } },
          ],
        },
      ],
    },
    take: 20,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header page="Search" pages={["Links"]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">
            Search results for "{q}" ({links.length} found)
          </h2>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {links.map((link) => (
            <a
              href={`/links/${link.id}`}
              className="aspect-video rounded-xl bg-muted/50 p-4 hover:bg-muted transition-colors"
              key={link.id}
            >
              <div className="font-mono text-sm text-primary">{link.slug}</div>
              <div className="text-xs text-muted-foreground truncate mt-2">
                {link.destination}
              </div>
              {link.title && (
                <div className="text-sm mt-2 truncate">{link.title}</div>
              )}
            </a>
          ))}
        </div>
        {links.length === 0 && (
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex items-center justify-center">
            <p className="text-muted-foreground">No links found matching "{q}"</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
