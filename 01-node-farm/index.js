const fs = require('fs');

//read file synchronous
// const text = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(text);

//read file asynchronous
fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
    console.log(data);
})


const textOut = `hello world\nCreated on ${Date.now()}`;
//write file synchronous
// fs.writeFileSync("./txt/output.txt",textOut);
// console.log('File Written!!!')

//write file asynchronous
fs.writeFile("./txt/output.txt",textOut, (err) => {
    console.log('File Written!!!')
});

console.log('aaaaaaa');

