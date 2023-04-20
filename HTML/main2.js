const {PythonShell} = require('python-shell');
 
let pyshell = new PythonShell('stepper.py');
 
pyshell.send("hello\n");

pyshell.on('message', function(message) {
  console.log(message);
})
 
pyshell.end(function (err) {
  if (err){
    throw err;
  };
  console.log('finished');
});