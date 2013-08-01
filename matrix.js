/**
 * Helper class for Matrix manipulations. Based on Actionscript3 Matrix class.
 * 
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 *
 * @see  http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html
 */
  function Matrix(a, b, c, d, tx, ty) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }

  Matrix.prototype.a = 1;
  Matrix.prototype.b = 0;
  Matrix.prototype.c = 0;
  Matrix.prototype.d = 1;
  Matrix.prototype.tx = 0;
  Matrix.prototype.ty = 0;


  /**
   * Clone.
   * @return {Matrix}
   */
  Matrix.prototype.clone = function() {
    return new Matrix(a, b, c, d, tx, ty);
  }


  /**
   * Concat.
   * @param {Matrix} m
   */
  Matrix.prototype.concat = function(m) {
    var a = this.a;
    var b = this.b;
    var c = this.c;
    var d = this.d;
    var tx = this.tx;
    var ty = this.ty;

    this.a = m.a * a + m.c * b;
    this.b = m.b * a + m.d * b;
    this.c = m.a * c + m.c * d;
    this.d = m.b * c + m.d * d;
    this.tx = m.a * tx + m.c * ty + m.tx;
    this.ty = m.b * tx + m.d * ty + m.ty;
  }

  /**
   * @param {Point} point
   *
   * @return {Point}
   * @see https://github.com/tszarzynski/point.js
   */
  Matrix.prototype.deltaTransformPoint = function(point) {
    return new Point(a * point.x + c * point.y, b * point.x + d * point.y);
  }


  /**
   * Identity.
   */
  Matrix.prototype.identity = function() {
    a = d = 1;
    b = c = tx = ty = 0;
  }


  Matrix.prototype.invert = function() {
    var a = this.a;
    var b = this.b;
    var c = this.c;
    var d = this.d;
    var tx = this.tx;
    var ty = this.ty;

    var det = a * d - c * b;

    this.a = d / det;
    this.b = -b / det;
    this.c = -c / det;
    this.d = a / det;

    this.tx = -(this.a * tx + this.c * ty);
    this.ty = -(this.b * tx + this.d * ty);
  }

  /**
   * @param angle The rotation angle in radians.
   */
  Matrix.prototype.rotate = function(angle) {

    if (angle != 0) {
      var cos = Math.cos(angle);
      var sin = Math.sin(angle);
      var a = this.a;
      var b = this.b;
      var c = this.c;
      var d = this.d;
      var tx = this.tx;
      var ty = this.ty;
      this.a = a * cos - b * sin;
      this.b = a * sin + b * cos;
      this.c = c * cos - d * sin;
      this.d = c * sin + d * cos;
      this.tx = tx * cos - ty * sin;
      this.ty = tx * sin + ty * cos;
    }
  }

  /**
   * @param sx A multiplier used to scale the object along the <i>x</i> axis.
   * @param sy A multiplier used to scale the object along the <i>y</i> axis.
   */
  Matrix.prototype.scale = function(sx, sy) {
    if (sx !== 1) {
      a *= sx;
      c *= sx;
      tx *= sx;
    }
    if (sy !== 1) {
      b *= sy;
      d *= sy;
      ty *= sy;
    }
  }

  /**
   * toString.
   */
  Matrix.prototype.toString = function() {
    return "(" + ["a=" + a, "b=" + b, "c=" + c, "d=" + d, "tx=" + tx, "ty=" + ty].join(", ") + ")";
  }

  /**
   * @param {Point} point
   *
   * @return {Point} point
   *
   * @see https://github.com/tszarzynski/point.js
   */
  Matrix.prototype.transformPoint = function(point) {
    return new Point(a * point.x + c * point.y + tx, b * point.x + d * point.y + ty);
  }

  /**
   * @param dx The amount of movement along the <i>x</i> axis to the right, in pixels.
   * @param dy The amount of movement down along the <i>y</i> axis, in pixels.
   */
  Matrix.prototype.translate = function(dx, dy) {

    tx += dx;
    ty += dy;
  }
