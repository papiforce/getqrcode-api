function mangaFormat(name) {
  var slot = name
    .toLowerCase()
    .replaceAll("'", "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
  var formatName = name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  return { mangaSlot: slot, mangaName: formatName };
}

module.exports = mangaFormat;
