/**
 * @class Canvas Renderer
 * @author Matthew Wagerfield
 * @modifiedby Binayak Ghosh
 */
FSS.CanvasRenderer = function() {
  FSS.Renderer.call(this);
  this.element = document.createElement('canvas');
  this.element.style.display = 'block';
  this.context = this.element.getContext('2d');
  this.setSize(this.element.width, this.element.height);
};

FSS.CanvasRenderer.prototype = Object.create(FSS.Renderer.prototype);

FSS.CanvasRenderer.prototype.setSize = function(width, height) {
  FSS.Renderer.prototype.setSize.call(this, width, height);
  this.element.width = width;
  this.element.height = height;
  this.context.setTransform(1, 0, 0, -1, this.halfWidth, this.halfHeight);
  return this;
};

FSS.CanvasRenderer.prototype.clear = function() {
  FSS.Renderer.prototype.clear.call(this);
  this.context.clearRect(-this.halfWidth, -this.halfHeight, this.width, this.height);
  return this;
};

FSS.CanvasRenderer.prototype.render = function(scene) {
  FSS.Renderer.prototype.render.call(this, scene);
  var m,mesh, t,rhombus, color;

  // Clear Context
  this.clear();

  // Configure Context
  this.context.lineJoin = 'round';
  this.context.lineWidth = 1;


  // Update Meshes
  for (m = scene.meshes.length - 1; m >= 0; m--) {
    mesh = scene.meshes[m];
    if (mesh.visible) {
      mesh.update(scene.lights, true);

      // Render Rhombuses
      for (t = mesh.geometry.rhombuses.length - 1; t >= 0; t--) {
        rhombus = mesh.geometry.rhombuses[t];
        color = rhombus.color.getRGBA();
        // console.log(color);
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        // this.context.font = "12px Ubuntu";
        // this.context.fillText("" + color, rhombus.centroid[0], rhombus.centroid[1]);
        this.context.beginPath();
        this.context.moveTo(rhombus.a.position[0], rhombus.a.position[1]);
        this.context.lineTo(rhombus.b.position[0], rhombus.b.position[1]);
        this.context.lineTo(rhombus.c.position[0], rhombus.c.position[1]);
        this.context.lineTo(rhombus.d.position[0], rhombus.d.position[1]);
        this.context.closePath();
        // this.context.stroke();
        this.context.fill();
      }
    }
  }
  return this;
};
