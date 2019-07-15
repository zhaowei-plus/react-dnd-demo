const persons = [
  { name: '000', age: 0 },
  { name: '111', age: 1 },
  { name: '222', age: 2 },
  { name: '333', age: 3 },
  { name: '444', age: 4 },
];

let dragIndexx = 0;
let hoverIndex = 3;

const tem = persons.splice(dragIndexx, 1);
console.log('temp:', tem);

console.log(persons);

persons.splice(hoverIndex, 0, tem);
console.log('persons:', persons);
