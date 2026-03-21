import { prisma } from "@/lib/db";
import FreeTarotGameClient from "./FreeTarotGameClient";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function FreeTarotGame() {
    const cards = await prisma.tarotCard.findMany({
        orderBy: { name: "asc" }
    });

    return <FreeTarotGameClient initialCards={cards} />;
}
