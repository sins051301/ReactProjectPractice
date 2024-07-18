const arr = [
  {
    name: "huaksu",
    age: 19,
  },
  {
    name: "shin",
    age: 23,
  },
];

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

//여기서 중괄호 {}는 함수 본문을 정의하는 데 사용됩니다.
//화살표 함수에서 중괄호를 사용하면 함수 본문을 명시적으로 작성하고,
// return 키워드를 사용하여 값을 반환해야 합니다.
function derive() {
  let info = arr.map((item) => {
    if (item.age === 23) {
      return { ...item, age: 26 };
    }
    return item;
  });
  return info;
}

function derive2() {
  let target;
  for (const element of arr) {
    if (element.age === 19) target = element;
  }
  return target;
}

function derive3(target, newAge) {
  return {
    //객체를 복사해옴
    ...arr[0],
    [target]: newAge,
  };
}

function matrixDerive() {
  const matrix2 = [...matrix.map((inner) => [...inner])];
  return matrix2;
}

function Practice() {
  let info = derive();
  let targetinfo = derive2();
  let editinfo = derive3("age", 188);
  let mat = matrixDerive();
  //let mat2 = matrixDerive2();
  return (
    <div>
      {info.map((person, index) => (
        <div key={index}>
          Name: {person.name}, Age: {person.age}
        </div>
      ))}
      <p>
        {targetinfo.name}
        {targetinfo.age}
      </p>
      <p>
        {editinfo.name}
        {editinfo.age}
      </p>
      {/* 여기서 소괄호 ()는 JSX 내에서 반환할 표현식을 감싸는 데 사용됩니다. 
      소괄호를 사용하면 코드가 더 가독성이 좋아지고, JSX가 여러 줄에 걸쳐 있을 때 유용합니다. */}
      <p>{mat.map((row) => row.map((col) => <li>{col}</li>))}</p>
    </div>
  );
}

export default Practice;
