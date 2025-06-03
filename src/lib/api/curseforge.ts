const baseUrl: string = "https://api.curseforge.com";
const cacheDuration: number = 60 * 60 * 12; // Cache duration of 12 hours
const cfProvider: string = "curseforge"

type ModInfo = {
  updatedAt: Date,
  summary: string,
  providerUrl: string
}

type ModInfoAndDesc = ModInfo & { description: string }

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

export async function getModInfoFromCF(modId: number): Promise<ModInfo> {
  const res = (await (await fetchCurseforge(`/mods/${modId}`)).json()).data;

  return {
    updatedAt: new Date(res.dateModified),
    summary: res.summary,
    providerUrl: res.links.websiteUrl
  }
}

export async function getDescriptionFromCF(modId: number): Promise<string> {
  const des = await (await fetchCurseforge(`/mods/${modId}/description`)).json();

  return des.data;
}

export async function getModInfoAndDescFromCF(modId: number): Promise<ModInfoAndDesc> {
  const info = await getModInfoFromCF(modId);
  const des = await getDescriptionFromCF(modId);

  return {
    ...info,
    description: des
  };
}