import { useEffect } from "react";

export function useKey(keyFunction, keyName) {
  useEffect(
    function () {
      function callBack() {
        document.addEventListener("keydown", function (e) {
          if (e.code === keyName) {
            keyFunction();
          }
        });
      }
      document.addEventListener("keydown", callBack);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [keyFunction, keyName]
  );
}
