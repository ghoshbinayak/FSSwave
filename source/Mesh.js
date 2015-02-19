/**
 * @class Mesh
 * @author Matthew Wagerfield
 * @modifiedby Binayak Ghosh
 */
FSS.Mesh = function(geometry, material) {
  FSS.Object.call(this);
  this.geometry = geometry || new FSS.Geometry();
  this.material = material || new FSS.Material();
  this.side = FSS.BACK;
  this.visible = true;
};

FSS.Mesh.prototype = Object.create(FSS.Object.prototype);

FSS.Mesh.prototype.update = function(lights, calculate) {
  var t,rhombus, l,light, illuminance;

  // Update Geometry
  this.geometry.update();

  // Calculate the rhombus colors
  if (calculate) {

    // Iterate through rhombuses
    for (t = this.geometry.rhombuses.length - 1; t >= 0; t--) {
      rhombus = this.geometry.rhombuses[t];

      // Reset rhombus Color
      FSS.Vector4.set(rhombus.color.rgba);

      // Iterate through Lights
      for (l = lights.length - 1; l >= 0; l--) {
        light = lights[l];

        // Calculate Illuminance
        FSS.Vector3.subtractVectors(light.ray, light.position, rhombus.centroid);
        FSS.Vector3.normalise(light.ray);
        illuminance = FSS.Vector3.dot(rhombus.normal, light.ray);
        if (this.side === FSS.FRONT) {
          illuminance = Math.max(illuminance, 0);
        } else if (this.side === FSS.BACK) {
          illuminance = Math.abs(Math.min(illuminance, 0));
        } else if (this.side === FSS.DOUBLE) {
          illuminance = Math.max(Math.abs(illuminance), 0);
        }

        // Calculate Ambient Light
        FSS.Vector4.multiplyVectors(this.material.slave.rgba, this.material.ambient.rgba, light.ambient.rgba);
        FSS.Vector4.add(rhombus.color.rgba, this.material.slave.rgba);

        // Calculate Diffuse Light
        FSS.Vector4.multiplyVectors(this.material.slave.rgba, this.material.diffuse.rgba, light.diffuse.rgba);
        FSS.Vector4.multiplyScalar(this.material.slave.rgba, illuminance);
        FSS.Vector4.add(rhombus.color.rgba, this.material.slave.rgba);
        rhombus.color.setAlpha(illuminance*0.5);
      }

      // Clamp & Format Color
      FSS.Vector4.clamp(rhombus.color.rgba, 0, 1);
    }
  }
  return this;
};
