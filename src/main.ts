import "./style.css";
import { fetchTop100 } from "./aniListApi";

const cover = document.getElementById("cover");

fetchTop100().then((animeList) => {
  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.className = "border-2 border-black p-2";

    const img = document.createElement("img");
    img.src = anime.coverImage.large;
    img.alt = anime.title.romaji;
    img.className = "w-full aspect-[2/3] object-cover";
    card.append(img);

    const title = document.createElement("p");
    title.textContent = anime.title.english ?? anime.title.romaji;
    card.append(title);

    if (cover) {
      cover.append(card);
    }
  });
});
