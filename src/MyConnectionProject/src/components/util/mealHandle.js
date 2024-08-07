
export function addMeal(meal, myMeal, setMyMeal) {
    const target = myMeal.array.find((element) => meal.name === element.name);

    if (target) {
      setMyMeal((prevMeal) => {
        return {
          array: [
            ...prevMeal.array.map((item) =>
              item === target
                ? {
                    ...item,
                    mine: item.mine + 1,
                  }
                : item
            ),
          ],
          sum: (Number(prevMeal.sum) + Number(meal.price)).toFixed(2),
          num: prevMeal.num + 1,
        };
      });
    } else {
      setMyMeal((prevMeal) => {
        return {
          array: [
            ...prevMeal.array,
            { name: meal.name, price: meal.price, mine: 1 },
          ],

          sum: (Number(prevMeal.sum) + Number(meal.price)).toFixed(2),
          num: prevMeal.num + 1,
        };
      });
    }

    console.log(myMeal);
  }

  export function caculMeal(meal, identifier, myMeal, setMyMeal) {
    const target = myMeal.array.find((element) => meal.name === element.name);
    if (identifier === "+") {
      setMyMeal((prevMeal) => {
        return {
          array: [
            ...prevMeal.array.map((item) =>
              item === target
                ? {
                    ...item,
                    mine: item.mine + 1,
                  }
                : item
            ),
          ],
          sum: (Number(prevMeal.sum) + Number(meal.price)).toFixed(2),
          num: prevMeal.num + 1,
        };
      });
    } else {
      setMyMeal((prevMeal) => {
        return {
          array: [
            ...prevMeal.array.map((item) =>
              item === target
                ? {
                    ...item,
                    mine: item.mine - 1,
                  }
                : item
            ),
          ],
          sum: (Number(prevMeal.sum) - Number(meal.price)).toFixed(2),
          num: prevMeal.num - 1,
        };
      });
      setMyMeal((prevMeal) => {
        return {
          ...prevMeal,
          array: prevMeal.array.filter((item) => item.mine !== 0),
        };
      });
    }
  }