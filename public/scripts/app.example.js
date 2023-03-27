class App {
  constructor() {
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.tipeDriver = document.getElementById("tipe-driver");
    this.tanggal = document.getElementById("tanggal");
    this.waktuJemput = document.getElementById("waktu-jemput");
    this.jumlahPenumpang = document.getElementById("jumlah-penumpang");
    this.cari = document.querySelector(".cari")
    this.namaCari = ""
  }

  async init() {
    await this.loadCars()
    this.run()
  }

  run = () => {
    if (Car.list.length === 0) {
      const node = document.createElement("div");
      node.innerHTML = Car.empty();
      this.carContainerElement.appendChild(node);
    } else {
      Car.list.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
      this.cari.innerHTML = `Pencarian: ${this.namaCari} (${Car.list.length})`
      document.getElementById("myForm").reset();
      this.waktuJemput.disabled = true
    }
    // console.log(Car.list);
  };

  async loadFilter(tipeDriver) {
    // const cars = await Binar.listCars();
    // Car.init(cars);

    const tanggal = app.tanggal.value
    const waktuJemput = app.waktuJemput.value
    const jumlahPenumpang = app.jumlahPenumpang.value

    const inputTime = new Date(`${tanggal} ${waktuJemput}`)
    const miliTimeInput = inputTime.getTime()

    const checkWaktu = waktuJemput !== ""
    const checkTanggal = tanggal !== ""
    const checkPenumpang = jumlahPenumpang !== ""
    const checkDriver = tipeDriver != "Default"

    const cars = await Binar.listCars((item) => {
      const dataTime = new Date(item.availableAt)
      const miliDataTime = Number(dataTime.getTime())
      const dateFilter = miliDataTime < miliTimeInput
      const capacityFilter = item.capacity >= jumlahPenumpang
      const tipe = tipeDriver === "true" ? true : false
      const nameDriver = tipe === true ? "Dengan Supir" : "Tanpa Supir"
      const tipeDriverFilter = tipe === item.available

      if (checkWaktu && checkTanggal && checkPenumpang) {
        this.namaCari = `${nameDriver} dan lebih dari ${jumlahPenumpang} orang`
        return tipeDriverFilter && capacityFilter && dateFilter
      } else if (checkWaktu && checkTanggal) {
        this.namaCari = `${nameDriver}`
        return tipeDriverFilter && dateFilter
      } else if (checkDriver && checkPenumpang) {
        this.namaCari = `${nameDriver} dan lebih dari ${jumlahPenumpang} orang`
        return tipeDriverFilter && capacityFilter
      } else {
        this.namaCari = `${nameDriver}`
        return tipeDriverFilter
      }
    });

    Car.init(cars)

  }

  async loadCars() {
    const cars = await Binar.listCars();
    return Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
