/**
 * @class Geometry
 * @author Matthew Wagerfield
 * @modifiedby Binayak Ghosh
 */
FSS.Geometry = function() {
  this.vertices = [];
  this.rhombuses = [];
  this.dirty = false;
};

FSS.Geometry.prototype = {
  update: function() {
    if (this.dirty) {
      var t,rhombus;
      for (t = this.rhombuses.length - 1; t >= 0; t--) {
        rhombus = this.rhombuses[t];
        rhombus.computeCentroid();
        rhombus.computeNormal();
      }
      this.dirty = false;
    }
    return this;
  }
};
