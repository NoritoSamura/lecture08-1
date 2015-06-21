(function(){

  var expect = require("expect.js");
  var boot = require("./boot");

  describe("引数を2つとる関数 subtract を次のように定義せよ", function(){

    it("引数に指定された2つの数値の差を返す", function(){
      expect(add(0, 0)).to.be(0);
      expect(add(1, -1)).to.be(2);
      expect(add(1, 0)).to.be(0);
      expect(add(3.14, 2)).to.be(3.14 - 2);
    });
    
  });

  boot();

})();
