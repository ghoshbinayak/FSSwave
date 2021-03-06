/**
 * @class Plane
 * @author Matthew Wagerfield
 * @modifiedby Binayak Ghosh
 */
FSS.Plane = function(width, height, segments, slices) {
  FSS.Geometry.call(this);
  this.width = width || 100;
  this.height = height || 100;
  this.segments = segments || 4;
  this.slices = slices || 4;
  this.segmentWidth = this.width / this.segments;
  this.sliceHeight = this.height / this.slices;

  // Cache Variables
  var x, y, v0, v1, v2, v3,
      vertex, rhombus, vertices = [],
      offsetX = this.width * -0.5,
      offsetY = this.height * 0.5;

  // Add Vertices
  for (x = 0; x <= this.segments + 1; x++) {
    vertices.push([]);
    for (y = 0; y <= this.slices + 1; y++) {
      vertex = new FSS.Vertex(offsetX + x*this.segmentWidth, offsetY - y*this.sliceHeight);
      vertices[x].push(vertex);
      this.vertices.push(vertex);
    }
  }

  // Add Triangles
  for (x = 0; x < this.segments; x++) {
    for (y = 0; y < this.slices; y++) {
      v0 = vertices[x+1][y+0];
      v1 = vertices[x+2][y+1];
      v2 = vertices[x+1][y+2];
      v3 = vertices[x+0][y+1];
      r0 = new FSS.Rhombus(v0, v1, v2, v3);
      this.rhombuses.push(r0);
      // console.log(r0.vertices);
    }
  }
};

FSS.Plane.prototype = Object.create(FSS.Geometry.prototype);
