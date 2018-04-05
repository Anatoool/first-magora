function deleteCookie(name) {
  const date = new Date(new Date().getTime() - 60 * 10);
  document.cookie = name +  "=123" + "; path=/; expires=" + date.toUTCString();
}

export default deleteCookie;
