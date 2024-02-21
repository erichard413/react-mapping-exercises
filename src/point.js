export class Point {
  constructor(latitude, longitude, display_name, color) {
    this.latitude = parseFloat(latitude);
    this.longitude = parseFloat(longitude);
    this.name = display_name.split(",")[0];
    this.color = color;
  }
}
