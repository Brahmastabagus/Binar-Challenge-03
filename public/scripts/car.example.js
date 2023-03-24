class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="col">
        <div class="card shadow">
          <img src="${this.image}" class="card-img-top" alt="${this.manufacture}">
          <div class="card-body">
            <h1 class="text-desc__2">${this.manufacture} ${this.model} / ${this.type}</h1>
            <h1 class="text-title__3 my-2">Rp ${this.rentPerDay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} / hari</h1>
            <p class="text-desc mb-3">${this.description}
            </p>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex gap-2">
                <img src="./svg/fi_users.svg" alt="" title="">
                <p class="text-desc">${this.capacity} Orang</p>
              </div>
              <div class="d-flex gap-2">
                <img src="./svg/fi_settings.svg" alt="" title="">
                <p class="text-desc">${this.transmission}</p>
              </div>
              <div class="d-flex gap-2">
                <img src="./svg/fi_calendar.svg" alt="" title="">
                <p class="text-desc">Tahun ${this.year}</p>
              </div>
            </div>
            <button class="button btn-lime-green mt-4">Pilih Mobil</button>
          </div>
        </div>
      </div>
    `;
  }
}
