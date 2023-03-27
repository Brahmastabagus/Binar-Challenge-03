/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)
// console.log(params);

/*
 * Contoh penggunaan DOM di dalam class
 * */
const app = new App();

// app.init().then(app.run);

// Button cari
app.loadButton.addEventListener('click', () => {
  const tipeDriver = app.tipeDriver.value
  // const jumlahPenumpang = app.jumlahPenumpang.value

  if (tipeDriver === "Default") {
    app.init()
  } else {
    app.clear()
    app.loadFilter(tipeDriver).then(app.run)
  }
})