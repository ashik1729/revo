const urls = [
  "https://realpackpackaging.com/product/eco-bagasse-plates/",
  "https://realpackpackaging.com/product/eco-bagasse-bowls/",
  "https://realpackpackaging.com/product-category/eco-range-products/",
  "https://realpackpackaging.com/product-category/bagasse-products/",
  "https://realpackpackaging.com/product-category/paper-kraft-products/",
  "https://realpackpackaging.com/product-category/wooden-products/",
  "https://realpackpackaging.com/product-category/styro-foam-products/",
  "https://realpackpackaging.com/product-category/aluminium-products/",
  "https://realpackpackaging.com/product-category/hygiene-products/",
  "https://realpackpackaging.com/product-category/cleaning-products/",
  "https://realpackpackaging.com/product-category/plastic-bags-films/",
  "https://realpackpackaging.com/product-category/plastic-products/",
  "https://realpackpackaging.com/",
];

async function run() {
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const matches = [...text.matchAll(/https:\/\/realpackpackaging\.com\/wp-content\/uploads\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp)/gi)]
        .map((m) => m[0].replace(/-\d+x\d+(?=\.)/g, ""))
        .filter((u) => !/logo|favicon|icon|avatar|sprite/i.test(u));
      const unique = [...new Set(matches)].slice(0, 5);
      console.log("\n## " + url);
      unique.forEach((u) => console.log(u));
    } catch (e) {
      console.log("ERR", url, e.message);
    }
  }
}

run();
