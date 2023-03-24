class App {
  constructor() {
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.tipeDriver = document.getElementById("tipe-driver");
    this.tanggal = document.getElementById("tanggal");
    this.waktuJemput = document.getElementById("waktu-jemput");
    this.jumlahPenumpang = document.getElementById("jumlah-penumpang");
  }

  async init() {
    await this.loadCars()
    this.run()

    // Register click listener
    // this.clearButton.onclick = this.clear;
    // this.loadButton.onclick = this.run;
    //   this.run()
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async loadFilter() {
    // const cars = await Binar.listCars();
    // Car.init(cars);

    const tanggal = app.tanggal.value
    const waktuJemput = app.waktuJemput.value
    const jumlahPenumpang = app.jumlahPenumpang.value

    const inputTime = new Date(`${tanggal} ${waktuJemput}`);
    const miliTimeInput = inputTime.getTime();

    const cars = await Binar.listCars((item) => {
      const dataTime = new Date(item.availableAt);
      const miliDataTime = Number(dataTime.getTime());
      const dateFilter = miliDataTime < miliTimeInput;
      const capacityFilter = item.capacity == jumlahPenumpang;

      return capacityFilter && dateFilter;
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
