export class Line {
  constructor(latitudeFrom, longitudeFrom, latitudeTo, longitudeTo, color) {
    this.latitudeFrom = parseFloat(latitudeFrom);
    this.latitudeTo = parseFloat(latitudeTo);
    this.longitudeFrom = parseFloat(longitudeFrom);
    this.longitudeTo = parseFloat(longitudeTo);
    this.color = color;
  }
}
