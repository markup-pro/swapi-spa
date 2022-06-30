export function arrReduce(arr1, arr2) {
  return arr1.reduce((r, a) => {
    arr2.some((el) => a === el.url && r.push(el));
    return r;
  }, []);
}
