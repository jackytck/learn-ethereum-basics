pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    /* // total 14 gas
    function doMath(int a, int b) {
      a + b; // 3 gas
      b - a; // 3 gas
      a * b; // 5 gas
      a == 0; // 3 gas
    } */
}
