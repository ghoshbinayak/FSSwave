/**
 * @class Rhombus
 * @author Matthew Wagerfield
 * @modifiedby Binayak Ghosh
 */
FSS.Rhombus = function(a, b, c, d) {
  this.a = a || new FSS.Vertex();
  this.b = b || new FSS.Vertex();
  this.c = c || new FSS.Vertex();
  this.d = d || new FSS.Vertex();
  this.vertices = [this.a, this.b, this.c, this.d];
  this.u = FSS.Vector3.create();
  this.v = FSS.Vector3.create();
  this.centroid = FSS.Vector3.create();
  this.normal = FSS.Vector3.create();
  this.color = new FSS.Color();
  this.polygon = document.createElementNS(FSS.SVGNS, 'polygon');
  this.polygon.setAttributeNS(null, 'stroke-linejoin', 'round');
  this.polygon.setAttributeNS(null, 'stroke-miterlimit', '1');
  this.polygon.setAttributeNS(null, 'stroke-width', '1');
  this.computeCentroid();
  this.computeNormal();
};

FSS.Rhombus.prototype = {
  computeCentroid: function() {
    this.centroid[0] = this.a.position[0] + this.b.position[0] + this.c.position[0] + this.d.position[0];
    this.centroid[1] = this.a.position[1] + this.b.position[1] + this.c.position[1] + this.d.position[1];
    this.centroid[2] = this.a.position[2] + this.b.position[2] + this.c.position[2] + this.d.position[2];
    FSS.Vector3.divideScalar(this.centroid, 4);
    return this;
  },
  computeNormal: function() {
    FSS.Vector3.subtractVectors(this.u, this.b.position, this.a.position);
    FSS.Vector3.subtractVectors(this.v, this.d.position, this.a.position);
    FSS.Vector3.crossVectors(this.normal, this.u, this.v);
    FSS.Vector3.normalise(this.normal);
    return this;
  }
};
