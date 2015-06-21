(function(){

  var expect = require("expect.js");
  var boot = require("./boot");

  describe("引数を全く取らない関数 n457 を次のように定義せよ", function(){

    it("配列を返す", function(){
      expect(n457()).to.be.an("array");
    });

    it("返り値の長さは457", function(){
      expect(n457().length).to.be(457);
    });

    it("返り値の要素は全てtrueである", function(){
      expect(n457().reduce(function(i, j){
        return i && j;
      })).to.be(true);
    });
    
  });

  boot();

})();
