export interface Anime {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  coverImage: {
    large: string;
  };
  averageScore: number | null;
}

const query = `
  query ($page: Int) {
    Page(page: $page, perPage: 50) {
      media(type: ANIME, sort: SCORE_DESC, isAdult: false) {
        id
        title { romaji english }
        coverImage { large }
        averageScore
      }
    }
  }
`;

async function fetchTopAnime(page: number): Promise<Anime[]> {
  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: { page: page },
    }),
  });

  if (!response.ok) {
    throw new Error(`error ${response.status}`);
  }

  const json = await response.json();
  return json.data.Page.media;
}

export async function fetchTop100(): Promise<Anime[]> {
  const page1 = await fetchTopAnime(1);
  const page2 = await fetchTopAnime(2);
  return [...page1, ...page2];
}
