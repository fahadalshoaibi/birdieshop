function getImgUrl(img) {
  return new URL(`../assets/products/${img}`, import.meta.url)

}
export { getImgUrl }