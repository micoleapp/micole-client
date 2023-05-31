 export default  function sliceIntoChunks(arr, chunkSize) {
    // console.log(arr.CitasActivas.length)
    const res = [];
    for (let i = 0; i < arr?.length; i += chunkSize) {
      const chunk =arr.slice(i, i + chunkSize);
      res.push(chunk);
    }

    return res;
  }
  