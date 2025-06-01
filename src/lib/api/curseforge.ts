const baseUrl: string = "https://api.curseforge.com";
const cacheDuration: number = 60 * 60 * 12; // Cache duration of 12 hours
const cfProvider: string = "curseforge"

type FetchedModInfo = {
  updatedAt: Date,
  summary: string,
  providerUrl: string,
  description: string
}

async function fetchCurseforge(route: string) {
  return await fetch(`${baseUrl}/v1${route}`, {
    cache: 'force-cache',
    next: {
      revalidate: cacheDuration
    },
    headers: {
      "x-api-key": process.env.CURSEFORGE_KEY as string
    }
  })
}

export async function getModInfoFromCF(modId: number): Promise<FetchedModInfo> {
  const res = (await (await fetchCurseforge(`/mods/${modId}`)).json()).data;
  const des = await (await fetchCurseforge(`/mods/${modId}/description`)).json();

  return {
    updatedAt: new Date(res.dateModified),
    summary: res.summary,
    providerUrl: res.links.websiteUrl,
    description: des.data
  };
}