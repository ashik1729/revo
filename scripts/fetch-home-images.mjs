const text = await (await fetch("https://realpackpackaging.com/")).text();
const matches = [...new Set(
  [...text.matchAll(/https:\/\/realpackpackaging\.com\/wp-content\/uploads\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp)/gi)]
    .map((m) => m[0].replace(/-\d+x\d+(?=\.)/g, ""))
)];
matches.forEach((u) => console.log(u));
