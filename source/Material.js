/**
 * @class Material
 * @author Matthew Wagerfield
 */
FSS.Material = function(ambient, diffuse) {
  this.ambient = new FSS.Color(ambient || '#444444', 0.0);
  this.diffuse = new FSS.Color(diffuse || '#FFFFFF', 0.0);
  this.slave = new FSS.Color();
};
