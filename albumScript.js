// laver en konstruktion funktion der hedder album og tildeler en paramenter til hver af albums objekter.
function Album(albumName, artistName, artistWebsite, productionYear, trackList) {
  this.albumName = albumName;
  this.artistName = artistName;
  this.artistWebsite = artistWebsite;
  this.productionYear = productionYear;
  this.trackList = trackList;  
}

// Fetcher data fra albums.json
fetchContent("albums.json").then((albums) => {
  // Log data til konsollen for at inspicere og bekræfte indlæsning
  console.log("Original Data: ");
  console.log(albums);
// Laver en tom array til at gemme album objekterne
  let albumObjects = [];

// Et forloop der gentager alle elementerne i albums
  for (let i = 0; i < albums.length; i++) {
    const album = new Album(
      // Laver et nyt album objekt for hvert element i albums.json
      albums[i].albumName,
      albums[i].artistName,
      albums[i].artistWebsite,
      albums[i].productionYear,
      albums[i].trackList
    );
    // tilføjer det nye album objekt til albumobjektets array
    albumObjects.push(album);
  }
  // En funktion der tilføjer en række med dataen til tabllen
  albumObjects.forEach(function (album, index) {
    addRowWithAlbum(album, "content", index);
  });
});

// Funktion til at tilføje albumrækker til tabellen og tilføje en knap til at vise/skjule trackliste
function addRowWithAlbum(album, parentId, index) {
  const table = document.getElementById(parentId);

  // Tilføjer en række med albumdetaljer
  const newRow = table.insertRow();
  ["albumName", "artistName", "artistWebsite", "productionYear"].forEach((prop, i) => {
    newRow.insertCell(i).textContent = album[prop];
  });

  // Tilføj vis/skjul-knap for tracklisten og laver en ny celle til knappen
  const buttonCell = newRow.insertCell(4);
  // laver en button element
  const button = document.createElement("button");
  // Laver teksten i knappen
  button.textContent = "Vis/skjul trackliste";
  // Laver en onlclik så knappen tilknytter toggletracklist funktionen.
  button.onclick = function () { toggleTracklist(index); };
  buttonCell.appendChild(button);

  // Tilføj en skjult række for tracklisten
  const trackRow = table.insertRow();
  // Giver rækken et unik ID til knappen
  trackRow.id = `tracklist-${index}`;
  // Gør rækken skjult som standard
  trackRow.style.display = "none";
  // laver en celle til tracklisten
  const trackCell = trackRow.insertCell(0);
  

  // Tilføj tracklisten som en punktliste
  const trackList = document.createElement("ul");
  album.trackList.forEach(track => {
    const trackItem = document.createElement("li");
    trackItem.textContent = track.trackTitle; 
    trackList.appendChild(trackItem);
  });
  trackCell.appendChild(trackList);
}

// Funktion til at skifte visningen af tracklisterækken
function toggleTracklist(index) {
  // Henter rækken for tracklisten
  const trackRow = document.getElementById(`tracklist-${index}`);
  trackRow.style.display = trackRow.style.display === "none" ? "table-row" : "none";
}

// Funktion til at hente JSON-indhold
async function fetchContent(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
