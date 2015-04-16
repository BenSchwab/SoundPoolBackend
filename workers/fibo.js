(function() {
        function fibo (n) {
          return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
        }
        this.onmessage = function (event) {
          postMessage(fibo(event.data));
        };
   })();