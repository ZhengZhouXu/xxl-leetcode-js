/**
 * 链表的使用，注意指针指向
 * 可以先生成一个 root节点，最后返回 root.next
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let carry = 0;
  let root = new ListNode(0);
  let cursor = root;

  while (l1 || l2 || carry) {
    let l1Val = l1 ? l1.val : 0;
    let l2Val = l2 ? l2.val : 0;

    let sumVal = l1Val + l2Val + carry;
    carry = Math.floor(sumVal / 10);
    sumVal = sumVal % 10;

    cursor.next = new ListNode(sumVal);
    cursor = cursor.next;

    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
  }

  return root.next;
};
